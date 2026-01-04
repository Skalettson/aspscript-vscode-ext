const vscode = require('vscode');

/**
 * Диагностика AspScript кода
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

    // Проверка структуры компонента
    this.checkComponentStructure(lines, diagnostics, document);

    // Проверка reactive переменных
    this.checkReactiveVariables(lines, diagnostics, document);

    // Проверка директив
    this.checkDirectives(lines, diagnostics, document);

    // Проверка стилей
    this.checkStyles(lines, diagnostics, document);

    this.diagnosticCollection.set(document.uri, diagnostics);
  }

  /**
   * Проверка структуры компонента
   */
  checkComponentStructure(lines, diagnostics, document) {
    let scriptSectionCount = 0;
    let styleSectionCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Подсчет --- разделителей
      if (line === '---') {
        scriptSectionCount++;
      }

      // Подсчет <style> тегов
      if (line.startsWith('<style')) {
        styleSectionCount++;
      }
    }

    // Должно быть ровно 2 разделителя --- (начало и конец script)
    if (scriptSectionCount !== 0 && scriptSectionCount !== 2) {
      const diagnostic = new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 100),
        'Invalid component structure. Expected exactly 2 "---" delimiters for script section.',
        vscode.DiagnosticSeverity.Error
      );
      diagnostic.code = 'aspscript-structure';
      diagnostics.push(diagnostic);
    }

    // Не более одного <style> тега
    if (styleSectionCount > 1) {
      const diagnostic = new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 100),
        'Multiple <style> tags found. Only one <style> section is allowed per component.',
        vscode.DiagnosticSeverity.Warning
      );
      diagnostic.code = 'aspscript-multiple-styles';
      diagnostics.push(diagnostic);
    }
  }

  /**
   * Проверка reactive переменных
   */
  checkReactiveVariables(lines, diagnostics, document) {
    const stateVariables = new Set();
    const computedVariables = new Set();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Поиск $state переменных
      const stateMatch = line.match(/let\s+(\w+)\s*=\s*\$state\s*\(/);
      if (stateMatch) {
        const varName = stateMatch[1];
        if (stateVariables.has(varName)) {
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(i, 0, i, line.length),
            `Duplicate state variable '${varName}'. Each state variable must have a unique name.`,
            vscode.DiagnosticSeverity.Error
          );
          diagnostic.code = 'aspscript-duplicate-state';
          diagnostics.push(diagnostic);
        }
        stateVariables.add(varName);
      }

      // Поиск $: computed переменных
      const computedMatch = line.match(/^\s*\$:\s*(\w+)\s*=/);
      if (computedMatch) {
        const varName = computedMatch[1];
        if (computedVariables.has(varName)) {
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(i, 0, i, line.length),
            `Duplicate computed variable '${varName}'.`,
            vscode.DiagnosticSeverity.Error
          );
          diagnostic.code = 'aspscript-duplicate-computed';
          diagnostics.push(diagnostic);
        }
        computedVariables.add(varName);
      }

      // Проверка использования $state без let
      if (line.includes('$state(') && !line.includes('let ')) {
        const diagnostic = new vscode.Diagnostic(
          new vscode.Range(i, 0, i, line.length),
          '$state must be used with "let" keyword: let variable = $state(value)',
          vscode.DiagnosticSeverity.Warning
        );
        diagnostic.code = 'aspscript-state-without-let';
        diagnostics.push(diagnostic);
      }
    }
  }

  /**
   * Проверка директив
   */
  checkDirectives(lines, diagnostics, document) {
    const validDirectives = ['@click', '@input', '@change', '@submit', '@focus', '@blur', 
                             '#bind', '#if', '#for', '#each', ':class', ':style'];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Поиск директив
      const directiveMatches = line.matchAll(/([#@:])([a-zA-Z]+)/g);

      for (const match of directiveMatches) {
        const fullDirective = match[0];
        const prefix = match[1];
        const name = match[2];

        // Проверка валидности директивы
        if (!validDirectives.includes(fullDirective)) {
          const startIndex = match.index;
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(i, startIndex, i, startIndex + fullDirective.length),
            `Unknown directive '${fullDirective}'. Did you mean one of: ${validDirectives.filter(d => d.startsWith(prefix)).join(', ')}?`,
            vscode.DiagnosticSeverity.Warning
          );
          diagnostic.code = 'aspscript-unknown-directive';
          diagnostics.push(diagnostic);
        }

        // Проверка #bind на input элементах
        if (fullDirective === '#bind') {
          const isInput = line.includes('<input') || line.includes('<textarea') || line.includes('<select');
          if (!isInput) {
            const diagnostic = new vscode.Diagnostic(
              new vscode.Range(i, match.index, i, match.index + fullDirective.length),
              '#bind directive should only be used on input, textarea, or select elements.',
              vscode.DiagnosticSeverity.Information
            );
            diagnostic.code = 'aspscript-bind-usage';
            diagnostics.push(diagnostic);
          }
        }
      }

      // Проверка незакрытых интерполяций
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;

      if (openBraces !== closeBraces) {
        const diagnostic = new vscode.Diagnostic(
          new vscode.Range(i, 0, i, line.length),
          'Unclosed interpolation braces { }',
          vscode.DiagnosticSeverity.Error
        );
        diagnostic.code = 'aspscript-unclosed-braces';
        diagnostics.push(diagnostic);
      }
    }
  }

  /**
   * Проверка стилей
   */
  checkStyles(lines, diagnostics, document) {
    let inStyleSection = false;
    let styleStartLine = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('<style')) {
        inStyleSection = true;
        styleStartLine = i;

        // Проверка атрибута lang
        if (line.includes('lang=')) {
          const langMatch = line.match(/lang=["'](\w+)["']/);
          if (langMatch) {
            const lang = langMatch[1];
            if (!['css', 'scss', 'sass', 'less'].includes(lang)) {
              const diagnostic = new vscode.Diagnostic(
                new vscode.Range(i, 0, i, line.length),
                `Unknown style language '${lang}'. Supported: css, scss, sass, less.`,
                vscode.DiagnosticSeverity.Warning
              );
              diagnostic.code = 'aspscript-unknown-style-lang';
              diagnostics.push(diagnostic);
            }
          }
        }
      }

      if (line.trim() === '</style>') {
        inStyleSection = false;
      }

      // Проверка пустого style блока
      if (inStyleSection && i > styleStartLine) {
        const content = lines.slice(styleStartLine + 1, i).join('').trim();
        if (!content && line.trim() === '</style>') {
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(styleStartLine, 0, i, line.length),
            'Empty <style> block. Consider removing it.',
            vscode.DiagnosticSeverity.Information
          );
          diagnostic.code = 'aspscript-empty-style';
          diagnostics.push(diagnostic);
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

