const vscode = require('vscode');

/**
 * Диагностика AspScript кода v1.3.0
 */
class AspScriptDiagnostics {
  constructor() {
    this.diagnosticCollection = vscode.languages.createDiagnosticCollection('aspscript');
  }

  /**
   * Анализ документа
   */
  async analyzDocument(document) {
    if (document.languageId !== 'aspscript') {
      return;
    }

    const diagnostics = [];
    const text = document.getText();
    const lines = text.split('\n');

    // Разделение на секции
    const sections = this.parseSections(text, lines);

    // Проверка структуры компонента
    this.checkComponentStructure(sections, diagnostics, document);

    // Проверка script секции
    if (sections.script) {
      this.checkScriptSection(sections.script.content, sections.script.start, diagnostics, document);
    }

    // Проверка template секции
    if (sections.template) {
      this.checkTemplateSection(sections.template.content, sections.template.start, diagnostics, document);
    }

    // Проверка style секции
    if (sections.style) {
      this.checkStyleSection(sections.style.content, sections.style.start, diagnostics, document);
    }

    this.diagnosticCollection.set(document.uri, diagnostics);
  }

  /**
   * Разделение на секции
   */
  parseSections(text, lines) {
    const sections = {
      script: null,
      template: null,
      style: null
    };

    // Поиск script секции (между --- ---)
    const scriptMatch = text.match(/^---\s*\n([\s\S]*?)\n---\s*$/m);
    if (scriptMatch) {
      const scriptStart = text.indexOf(scriptMatch[0]);
      const scriptStartLine = text.substring(0, scriptStart).split('\n').length;
      sections.script = {
        content: scriptMatch[1],
        start: scriptStartLine
      };
    }

    // Поиск style секции
    const styleMatch = text.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    if (styleMatch) {
      const styleStart = text.indexOf(styleMatch[0]);
      const styleStartLine = text.substring(0, styleStart).split('\n').length;
      sections.style = {
        content: styleMatch[1],
        start: styleStartLine,
        fullTag: styleMatch[0]
      };
    }

    // Template - всё между script и style (или до конца)
    let templateStart = 0;
    let templateEnd = text.length;

    if (scriptMatch) {
      templateStart = text.indexOf(scriptMatch[0]) + scriptMatch[0].length;
    }
    if (styleMatch) {
      templateEnd = text.indexOf(styleMatch[0]);
    }

    if (templateStart < templateEnd) {
      const templateContent = text.substring(templateStart, templateEnd);
      const templateStartLine = text.substring(0, templateStart).split('\n').length;
      sections.template = {
        content: templateContent,
        start: templateStartLine
      };
    }

    return sections;
  }

  /**
   * Проверка структуры компонента
   */
  checkComponentStructure(sections, diagnostics, document) {
    // Предупреждение если нет template
    if (!sections.template || sections.template.content.trim() === '') {
      const diagnostic = new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 100),
        'Component has no template section. Add HTML markup between script and style sections.',
        vscode.DiagnosticSeverity.Information
      );
      diagnostic.code = 'aspscript-no-template';
      diagnostics.push(diagnostic);
    }
  }

  /**
   * Проверка script секции
   */
  checkScriptSection(content, startLine, diagnostics, document) {
    const lines = content.split('\n');
    const stateVariables = new Set();
    const computedVariables = new Set();
    const functions = new Set();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = startLine + i;

      // Проверка $state переменных
      const stateMatch = line.match(/let\s+(\w+)\s*=\s*\$state\s*\(/);
      if (stateMatch) {
        const varName = stateMatch[1];
        if (stateVariables.has(varName)) {
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(lineNum, 0, lineNum, line.length),
            `Duplicate state variable '${varName}'. Each state variable must have a unique name.`,
            vscode.DiagnosticSeverity.Error
          );
          diagnostic.code = 'aspscript-duplicate-state';
          diagnostics.push(diagnostic);
        }
        stateVariables.add(varName);
      }

      // Проверка $: computed переменных
      const computedMatch = line.match(/^\s*\$:\s*(\w+)\s*=/);
      if (computedMatch) {
        const varName = computedMatch[1];
        if (computedVariables.has(varName)) {
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(lineNum, 0, lineNum, line.length),
            `Duplicate computed variable '${varName}'.`,
            vscode.DiagnosticSeverity.Error
          );
          diagnostic.code = 'aspscript-duplicate-computed';
          diagnostics.push(diagnostic);
        }
        computedVariables.add(varName);
      }

      // Проверка использования $state без let (но не в комментариях)
      if (line.includes('$state(') && !line.includes('let ') && !line.trim().startsWith('//')) {
        // Проверяем, что это не внутри строки или комментария
        const beforeState = line.substring(0, line.indexOf('$state('));
        if (!beforeState.includes('//') && !beforeState.includes('/*')) {
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(lineNum, 0, lineNum, line.length),
            '$state must be used with "let" keyword: let variable = $state(value)',
            vscode.DiagnosticSeverity.Warning
          );
          diagnostic.code = 'aspscript-state-without-let';
          diagnostics.push(diagnostic);
        }
      }

      // Проверка функций
      const functionMatch = line.match(/function\s+(\w+)\s*\(/);
      if (functionMatch) {
        const funcName = functionMatch[1];
        if (functions.has(funcName)) {
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(lineNum, 0, lineNum, line.length),
            `Duplicate function '${funcName}'.`,
            vscode.DiagnosticSeverity.Error
          );
          diagnostic.code = 'aspscript-duplicate-function';
          diagnostics.push(diagnostic);
        }
        functions.add(funcName);
      }

      // Проверка export const props (это нормально)
      if (line.includes('export const props') || line.includes('export const emits')) {
        // Это валидный синтаксис AspScript v1.3.0, не добавляем warnings
        continue;
      }
    }
  }

  /**
   * Проверка template секции
   */
  checkTemplateSection(content, startLine, diagnostics, document) {
    const lines = content.split('\n');

    // Стек для отслеживания блочных директив
    const directiveStack = [];
    
    // Валидные директивы
    const validEventDirectives = ['@click', '@input', '@change', '@submit', '@focus', '@blur', '@keydown', '@keyup', '@mouseenter', '@mouseleave'];
    const validBindDirectives = ['#bind', '#if', '#for', '#each'];
    const validAttrDirectives = [':class', ':style', ':value', ':disabled', ':href', ':src', ':data'];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = startLine + i;

      // Проверка блочных директив {#if}, {:else}, {/if} и т.д.
      const blockDirectiveMatch = line.match(/\{([#/:])(\w+)([^}]*)\}/g);
      if (blockDirectiveMatch) {
        for (const directive of blockDirectiveMatch) {
          const match = directive.match(/\{([#/:])(\w+)([^}]*)\}/);
          if (match) {
            const prefix = match[1];
            const name = match[2];

            if (prefix === '#') {
              // Открывающая директива
              if (['if', 'for', 'each'].includes(name)) {
                directiveStack.push({ name, line: lineNum });
              } else {
                // Неизвестная открывающая директива
                const diagnostic = new vscode.Diagnostic(
                  new vscode.Range(lineNum, line.indexOf(directive), lineNum, line.indexOf(directive) + directive.length),
                  `Unknown block directive '{#${name}}'. Valid directives: {#if}, {#for}, {#each}`,
                  vscode.DiagnosticSeverity.Warning
                );
                diagnostic.code = 'aspscript-unknown-block-directive';
                diagnostics.push(diagnostic);
              }
            } else if (prefix === ':') {
              // Промежуточная директива (:else, :else if)
              if (!['else'].includes(name)) {
                const diagnostic = new vscode.Diagnostic(
                  new vscode.Range(lineNum, line.indexOf(directive), lineNum, line.indexOf(directive) + directive.length),
                  `Unknown intermediate directive '{:${name}}'. Valid: {:else}, {:else if}`,
                  vscode.DiagnosticSeverity.Warning
                );
                diagnostic.code = 'aspscript-unknown-intermediate-directive';
                diagnostics.push(diagnostic);
              }
            } else if (prefix === '/') {
              // Закрывающая директива
              if (directiveStack.length === 0) {
                const diagnostic = new vscode.Diagnostic(
                  new vscode.Range(lineNum, line.indexOf(directive), lineNum, line.indexOf(directive) + directive.length),
                  `Closing directive '{/${name}}' without matching opening directive`,
                  vscode.DiagnosticSeverity.Error
                );
                diagnostic.code = 'aspscript-unmatched-closing-directive';
                diagnostics.push(diagnostic);
              } else {
                const last = directiveStack.pop();
                if (last.name !== name) {
                  const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(lineNum, line.indexOf(directive), lineNum, line.indexOf(directive) + directive.length),
                    `Closing directive '{/${name}}' does not match opening directive '{#${last.name}}' on line ${last.line + 1}`,
                    vscode.DiagnosticSeverity.Error
                  );
                  diagnostic.code = 'aspscript-mismatched-directive';
                  diagnostics.push(diagnostic);
                }
              }
            }
          }
        }
      }

      // Проверка атрибутных директив @click, #bind, :class и т.д.
      const attrDirectiveMatches = line.matchAll(/\s([#@:])(\w+)=/g);
      for (const match of attrDirectiveMatches) {
        const fullDirective = match[1] + match[2];
        const prefix = match[1];

        let isValid = false;
        if (prefix === '@') {
          isValid = validEventDirectives.includes(fullDirective);
        } else if (prefix === '#') {
          isValid = fullDirective === '#bind';
        } else if (prefix === ':') {
          isValid = validAttrDirectives.includes(fullDirective);
        }

        if (!isValid) {
          // Не показываем ошибку для модификаторов событий типа @submit.prevent
          if (line.includes(fullDirective + '.')) {
            continue;
          }

          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(lineNum, match.index, lineNum, match.index + fullDirective.length + 1),
            `Unknown directive '${fullDirective}'. Check documentation for valid directives.`,
            vscode.DiagnosticSeverity.Information
          );
          diagnostic.code = 'aspscript-unknown-directive';
          diagnostics.push(diagnostic);
        }
      }

      // Проверка #bind на правильных элементах
      if (line.includes('#bind=')) {
        const isFormElement = line.includes('<input') || line.includes('<textarea') || line.includes('<select');
        if (!isFormElement) {
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(lineNum, 0, lineNum, line.length),
            '#bind directive should only be used on input, textarea, or select elements.',
            vscode.DiagnosticSeverity.Information
          );
          diagnostic.code = 'aspscript-bind-usage';
          diagnostics.push(diagnostic);
        }
      }
    }

    // Проверка незакрытых блочных директив
    if (directiveStack.length > 0) {
      for (const unclosed of directiveStack) {
        const diagnostic = new vscode.Diagnostic(
          new vscode.Range(unclosed.line, 0, unclosed.line, 100),
          `Block directive '{#${unclosed.name}}' is not closed. Add '{/${unclosed.name}}' closing tag.`,
          vscode.DiagnosticSeverity.Error
        );
        diagnostic.code = 'aspscript-unclosed-directive';
        diagnostics.push(diagnostic);
      }
    }
  }

  /**
   * Проверка style секции
   */
  checkStyleSection(content, startLine, diagnostics, document) {
    // Проверка пустого style блока
    if (content.trim() === '') {
      const diagnostic = new vscode.Diagnostic(
        new vscode.Range(startLine, 0, startLine + 2, 0),
        'Empty <style> block. Consider removing it or adding styles.',
        vscode.DiagnosticSeverity.Information
      );
      diagnostic.code = 'aspscript-empty-style';
      diagnostics.push(diagnostic);
    }

    // Проверка lang атрибута
    const lines = content.split('\n');
    if (lines.length > 0) {
      const firstLine = lines[0];
      if (firstLine.includes('lang=')) {
        const langMatch = firstLine.match(/lang=["'](\w+)["']/);
        if (langMatch) {
          const lang = langMatch[1];
          if (!['css', 'scss', 'sass', 'less', 'stylus'].includes(lang)) {
            const diagnostic = new vscode.Diagnostic(
              new vscode.Range(startLine, 0, startLine, firstLine.length),
              `Unknown style language '${lang}'. Supported: css, scss, sass, less, stylus.`,
              vscode.DiagnosticSeverity.Warning
            );
            diagnostic.code = 'aspscript-unknown-style-lang';
            diagnostics.push(diagnostic);
          }
        }
      }
    }
  }

  /**
   * Очистка диагностики
   */
  clear() {
    this.diagnosticCollection.clear();
  }

  /**
   * Dispose
   */
  dispose() {
    this.diagnosticCollection.dispose();
  }
}

module.exports = AspScriptDiagnostics;
