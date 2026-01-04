const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const AspScriptDiagnostics = require('./diagnostics');

/**
 * Активация расширения
 */
function activate(context) {
  console.log('AspScript extension is now active!');

  // Инициализация диагностики
  const diagnostics = new AspScriptDiagnostics();

  // Запуск диагностики для активного документа
  if (vscode.window.activeTextEditor) {
    diagnostics.analyzDocument(vscode.window.activeTextEditor.document);
  }

  // Диагностика при изменении документа
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document.languageId === 'aspscript') {
        const config = vscode.workspace.getConfiguration('aspscript');
        const lintEnabled = config.get('lint.enable', true);
        if (lintEnabled) {
          diagnostics.analyzDocument(event.document);
        }
      }
    })
  );

  // Диагностика при открытии документа
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      if (document.languageId === 'aspscript') {
        const config = vscode.workspace.getConfiguration('aspscript');
        const lintEnabled = config.get('lint.enable', true);
        if (lintEnabled) {
          diagnostics.analyzDocument(document);
        }
      }
    })
  );

  // Команда: Создать компонент
  const createComponent = vscode.commands.registerCommand(
    'aspscript.createComponent',
    async (uri) => {
      const componentName = await vscode.window.showInputBox({
        prompt: 'Enter component name',
        placeHolder: 'MyComponent',
        validateInput: (value) => {
          if (!value) {
            return 'Component name is required';
          }
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return 'Component name must start with uppercase letter';
          }
          return null;
        }
      });

      if (!componentName) return;

      const folderPath = uri ? uri.fsPath : vscode.workspace.workspaceFolders[0].uri.fsPath;
      const componentPath = path.join(folderPath, `${componentName}.aspc`);

      const template = `---
// ${componentName} component
let value = $state(0)

function handleClick() {
  value++
}
---

<div class="${componentName.toLowerCase()}">
  <h2>${componentName}</h2>
  <p>Value: {value}</p>
  <button @click="handleClick">Increment</button>
</div>

<style>
.${componentName.toLowerCase()} {
  padding: 2rem;
  text-align: center;
}
</style>
`;

      fs.writeFileSync(componentPath, template);

      const document = await vscode.workspace.openTextDocument(componentPath);
      await vscode.window.showTextDocument(document);

      vscode.window.showInformationMessage(`Created ${componentName}.aspc`);
    }
  );

  // Команда: Скомпилировать файл
  const compileFile = vscode.commands.registerCommand(
    'aspscript.compile',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
      }

      const document = editor.document;
      if (document.languageId !== 'aspscript') {
        vscode.window.showErrorMessage('Not an AspScript file');
        return;
      }

      await document.save();

      const config = vscode.workspace.getConfiguration('aspscript');
      const compilerPath = config.get('compilerPath', 'aspc');
      const filePath = document.uri.fsPath;

      vscode.window.showInformationMessage('Compiling AspScript file...');

      exec(`${compilerPath} build "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(`Compilation failed: ${error.message}`);
          console.error(stderr);
          return;
        }

        vscode.window.showInformationMessage('✅ Compilation successful!');
        console.log(stdout);
      });
    }
  );

  // Команда: Preview компонента
  const previewComponent = vscode.commands.registerCommand(
    'aspscript.preview',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
      }

      const document = editor.document;
      if (document.languageId !== 'aspscript') {
        vscode.window.showErrorMessage('Not an AspScript file');
        return;
      }

      const panel = vscode.window.createWebviewPanel(
        'aspscriptPreview',
        `Preview: ${path.basename(document.uri.fsPath)}`,
        vscode.ViewColumn.Beside,
        {
          enableScripts: true
        }
      );

      const htmlContent = generatePreviewHTML(document.getText());
      panel.webview.html = htmlContent;

      // Обновление preview при изменении
      const changeSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.document === document) {
          const config = vscode.workspace.getConfiguration('aspscript');
          const autoRefresh = config.get('preview.autoRefresh', true);
          
          if (autoRefresh) {
            panel.webview.html = generatePreviewHTML(e.document.getText());
          }
        }
      });

      panel.onDidDispose(() => {
        changeSubscription.dispose();
      });
    }
  );

  // Команда: Форматирование
  const formatDocument = vscode.commands.registerCommand(
    'aspscript.format',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const document = editor.document;
      if (document.languageId !== 'aspscript') return;

      const config = vscode.workspace.getConfiguration('aspscript');
      const indentSize = config.get('format.indentSize', 2);

      const text = document.getText();
      const formatted = formatAspScriptCode(text, indentSize);

      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );
      edit.replace(document.uri, fullRange, formatted);

      await vscode.workspace.applyEdit(edit);
      vscode.window.showInformationMessage('Document formatted');
    }
  );

  // Auto-compile on save
  const onSaveHandler = vscode.workspace.onDidSaveTextDocument((document) => {
    if (document.languageId === 'aspscript') {
      const config = vscode.workspace.getConfiguration('aspscript');
      const autoCompile = config.get('autoCompile', false);

      if (autoCompile) {
        vscode.commands.executeCommand('aspscript.compile');
      }
    }
  });

  // Hover provider
  const hoverProvider = vscode.languages.registerHoverProvider('aspscript', {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      const hoverInfo = getHoverInfo(word);
      if (hoverInfo) {
        return new vscode.Hover(hoverInfo);
      }
    }
  });

  // Definition provider
  const definitionProvider = vscode.languages.registerDefinitionProvider('aspscript', {
    provideDefinition(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      // Поиск определения в том же файле
      const text = document.getText();
      const lines = text.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Поиск переменных $state
        const stateMatch = line.match(new RegExp(`let\\s+${word}\\s*=\\s*\\$state`));
        if (stateMatch) {
          return new vscode.Location(document.uri, new vscode.Position(i, stateMatch.index));
        }

        // Поиск computed переменных
        const computedMatch = line.match(new RegExp(`\\$:\\s*${word}\\s*=`));
        if (computedMatch) {
          return new vscode.Location(document.uri, new vscode.Position(i, computedMatch.index));
        }

        // Поиск функций
        const functionMatch = line.match(new RegExp(`function\\s+${word}\\s*\\(`));
        if (functionMatch) {
          return new vscode.Location(document.uri, new vscode.Position(i, functionMatch.index));
        }
      }

      return null;
    }
  });

  // Document Symbol Provider (для Outline)
  const documentSymbolProvider = vscode.languages.registerDocumentSymbolProvider('aspscript', {
    provideDocumentSymbols(document, token) {
      const symbols = [];
      const text = document.getText();
      const lines = text.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // State переменные
        const stateMatch = line.match(/let\s+(\w+)\s*=\s*\$state/);
        if (stateMatch) {
          const symbol = new vscode.DocumentSymbol(
            stateMatch[1],
            '$state',
            vscode.SymbolKind.Variable,
            new vscode.Range(i, 0, i, line.length),
            new vscode.Range(i, stateMatch.index, i, stateMatch.index + stateMatch[0].length)
          );
          symbols.push(symbol);
        }

        // Computed переменные
        const computedMatch = line.match(/\$:\s*(\w+)\s*=/);
        if (computedMatch) {
          const symbol = new vscode.DocumentSymbol(
            computedMatch[1],
            '$computed',
            vscode.SymbolKind.Property,
            new vscode.Range(i, 0, i, line.length),
            new vscode.Range(i, computedMatch.index, i, computedMatch.index + computedMatch[0].length)
          );
          symbols.push(symbol);
        }

        // Функции
        const functionMatch = line.match(/function\s+(\w+)\s*\(/);
        if (functionMatch) {
          const symbol = new vscode.DocumentSymbol(
            functionMatch[1],
            'function',
            vscode.SymbolKind.Function,
            new vscode.Range(i, 0, i, line.length),
            new vscode.Range(i, functionMatch.index, i, functionMatch.index + functionMatch[0].length)
          );
          symbols.push(symbol);
        }
      }

      return symbols;
    }
  });

  // Completion provider
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    'aspscript',
    {
      provideCompletionItems(document, position, token, context) {
        const completions = [];

        // Reactive keywords
        ['$state', '$computed', '$effect', '$global'].forEach((keyword) => {
          const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
          item.detail = 'AspScript reactive keyword';
          completions.push(item);
        });

        // Lifecycle hooks
        ['onMount', 'onDestroy', 'onUpdate'].forEach((hook) => {
          const item = new vscode.CompletionItem(hook, vscode.CompletionItemKind.Function);
          item.detail = 'AspScript lifecycle hook';
          completions.push(item);
        });

        // Directives
        ['@click', '@input', '@change', '#bind', '#if', '#for', ':class'].forEach((directive) => {
          const item = new vscode.CompletionItem(directive, vscode.CompletionItemKind.Property);
          item.detail = 'AspScript directive';
          completions.push(item);
        });

        return completions;
      }
    },
    '$', '@', '#', ':'
  );

  // Code Actions Provider
  const codeActionsProvider = vscode.languages.registerCodeActionsProvider('aspscript', {
    provideCodeActions(document, range, context, token) {
      const actions = [];

      for (const diagnostic of context.diagnostics) {
        if (diagnostic.code === 'aspscript-state-without-let') {
          const fix = new vscode.CodeAction('Add "let" keyword', vscode.CodeActionKind.QuickFix);
          fix.edit = new vscode.WorkspaceEdit();
          const line = document.lineAt(range.start.line);
          const text = line.text;
          const stateIndex = text.indexOf('$state');
          if (stateIndex > 0) {
            fix.edit.insert(document.uri, new vscode.Position(range.start.line, 0), 'let ');
          }
          fix.diagnostics = [diagnostic];
          actions.push(fix);
        }

        if (diagnostic.code === 'aspscript-empty-style') {
          const remove = new vscode.CodeAction('Remove empty <style> block', vscode.CodeActionKind.QuickFix);
          remove.edit = new vscode.WorkspaceEdit();
          remove.edit.delete(document.uri, diagnostic.range);
          remove.diagnostics = [diagnostic];
          actions.push(remove);
        }
      }

      return actions;
    }
  });

  // Register all disposables
  context.subscriptions.push(
    diagnostics,
    createComponent,
    compileFile,
    previewComponent,
    formatDocument,
    onSaveHandler,
    hoverProvider,
    completionProvider,
    definitionProvider,
    documentSymbolProvider,
    codeActionsProvider
  );
}

/**
 * Генерация HTML для preview
 */
function generatePreviewHTML(aspscriptCode) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AspScript Preview</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      margin: 0;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .preview-container {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    .preview-info {
      background: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 1rem;
      margin-bottom: 2rem;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="preview-container">
    <div class="preview-info">
      <h3>🚀 AspScript Preview</h3>
      <p>This is a preview of your AspScript component.</p>
      <p><strong>Note:</strong> Full compilation required for interactive preview.</p>
    </div>
    <pre><code>${escapeHtml(aspscriptCode)}</code></pre>
  </div>
</body>
</html>
  `;
}

/**
 * Форматирование AspScript кода
 */
function formatAspScriptCode(code, indentSize) {
  // Простое форматирование (в будущем можно улучшить)
  const lines = code.split('\n');
  let formatted = [];
  let indent = 0;
  const indentString = ' '.repeat(indentSize);

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '---' || trimmed.startsWith('<style') || trimmed.startsWith('</style>')) {
      formatted.push(trimmed);
    } else if (trimmed.endsWith('{')) {
      formatted.push(indentString.repeat(indent) + trimmed);
      indent++;
    } else if (trimmed.startsWith('}')) {
      indent = Math.max(0, indent - 1);
      formatted.push(indentString.repeat(indent) + trimmed);
    } else if (trimmed) {
      formatted.push(indentString.repeat(indent) + trimmed);
    } else {
      formatted.push('');
    }
  }

  return formatted.join('\n');
}

/**
 * Информация для hover
 */
function getHoverInfo(word) {
  const info = {
    '$state': new vscode.MarkdownString(`
**$state(initialValue)** - Reactive State

Creates a reactive state variable that automatically triggers updates when changed.

**Example:**
\`\`\`aspscript
let count = $state(0)
count++ // Triggers reactivity
\`\`\`

**See also:** $computed, $effect
    `),
    '$computed': new vscode.MarkdownString(`
**$computed(getter)** - Computed Value

Creates a computed value that automatically recalculates when dependencies change.

**Example:**
\`\`\`aspscript
let count = $state(0)
$: doubled = count * 2 // Recomputes when count changes
\`\`\`

**See also:** $state, $effect
    `),
    '$effect': new vscode.MarkdownString(`
**$effect(callback)** - Side Effect

Creates a side effect that runs when reactive dependencies change.

**Example:**
\`\`\`aspscript
let count = $state(0)
$: effect(() => {
  console.log('Count:', count)
})
\`\`\`

**See also:** $state, $computed, onMount
    `),
    '$global': new vscode.MarkdownString(`
**$global(initialValue, key)** - Global State

Creates a global reactive state shared across components.

**Example:**
\`\`\`aspscript
let theme = $global('dark', 'app-theme')
\`\`\`

**See also:** $state
    `),
    'onMount': new vscode.MarkdownString(`
**onMount(callback)** - Lifecycle Hook

Called when component is mounted to DOM.

**Example:**
\`\`\`aspscript
onMount(() => {
  console.log('Component mounted')
  // Fetch data, setup listeners, etc.
})
\`\`\`

**See also:** onDestroy, onUpdate
    `),
    'onDestroy': new vscode.MarkdownString(`
**onDestroy(callback)** - Lifecycle Hook

Called when component is destroyed/unmounted.

**Example:**
\`\`\`aspscript
onDestroy(() => {
  console.log('Component destroyed')
  // Cleanup listeners, intervals, etc.
})
\`\`\`

**See also:** onMount
    `),
    '@click': new vscode.MarkdownString(`
**@click** - Event Directive

Binds a click event handler to an element.

**Example:**
\`\`\`html
<button @click="handleClick">Click me</button>
\`\`\`

**See also:** @input, @change, @submit
    `),
    '#bind': new vscode.MarkdownString(`
**#bind** - Two-Way Binding Directive

Creates two-way data binding for form inputs.

**Example:**
\`\`\`html
<input type="text" #bind="name" />
\`\`\`

**See also:** @input, :value
    `),
    ':class': new vscode.MarkdownString(`
**:class** - Dynamic Class Directive

Dynamically binds classes based on expressions.

**Example:**
\`\`\`html
<div :class="isActive ? 'active' : 'inactive'">Content</div>
\`\`\`

**See also:** :style
    `)
  };

  const markdown = info[word];
  if (markdown) {
    markdown.isTrusted = true;
    markdown.supportHtml = true;
  }
  return markdown;
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Деактивация расширения
 */
function deactivate() {
  console.log('AspScript extension deactivated');
}

module.exports = {
  activate,
  deactivate
};

