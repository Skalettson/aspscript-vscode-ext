# Change Log

All notable changes to the "aspscript" extension will be documented in this file.

## [1.0.1] - 2026-01-04

### Added
- 🎨 Full syntax highlighting for `.aspc` files
- 📝 20+ code snippets for common patterns
- 💡 IntelliSense for reactive keywords and directives
- 🔧 Commands for creating, compiling, and previewing components
- ⚙️ Configuration options for compiler, formatting, and linting
- 🎯 Enhanced hover information with examples
- 🌈 Auto-completion for directives (`@click`, `#bind`, etc.)
- 📦 Language configuration (brackets, comments, indentation)
- 🚀 Auto-compile on save (optional)
- 👁️ Component preview in side panel
- 🎨 Code formatting support
- 📖 Comprehensive documentation
- ✅ **Real-time linting and diagnostics**
- 🔍 **Go to definition support**
- 📋 **Document symbols (Outline)**
- 💡 **Code actions and quick fixes**
- 🧪 **Test samples included**

### Features in Detail

#### Syntax Highlighting
- Script section with `---` delimiters
- Reactive keywords: `$state`, `$computed`, `$effect`, `$global`
- Reactive expressions: `$: computed = expression`
- HTML template with interpolation `{variable}`
- Directives: `@click`, `@input`, `#bind`, `#if`, `#for`, `:class`
- Style section with CSS and SCSS support
- Comments and JSDoc

#### Snippets
- Component templates (basic, counter, form)
- Reactive primitives (state, computed, effect, global)
- Lifecycle hooks (onMount, onDestroy)
- Template elements (button, input, conditional, loop)
- Style blocks (CSS, SCSS)
- Functions and async functions

#### Commands
- `AspScript: Create Component` - Interactive component generator
- `AspScript: Compile Current File` - Compile active `.aspc` file
- `AspScript: Preview Component` - Live preview in webview panel
- `AspScript: Format Document` - Format AspScript code

#### IntelliSense
- Auto-completion for `$state`, `$computed`, `$effect`, `$global`
- Auto-completion for lifecycle hooks
- Auto-completion for directives
- Trigger characters: `$`, `@`, `#`, `:`
- Hover documentation for APIs

#### Configuration
- `aspscript.compilerPath` - Custom compiler path
- `aspscript.autoCompile` - Auto-compile on save
- `aspscript.format.enable` - Enable formatting
- `aspscript.format.indentSize` - Indent size
- `aspscript.lint.enable` - Enable linting
- `aspscript.preview.autoRefresh` - Auto refresh preview

### Technical Details
- Built with TypeScript definitions for VS Code API
- TextMate grammar for syntax highlighting
- Language server protocol ready (future)
- Webview API for component preview
- File system integration for component creation

---

## [Unreleased]

### Planned Features
- 🔍 Linting and error checking
- 🛠️ Code refactoring tools
- 📊 Bundle size analyzer integration
- 🎨 Theme support for syntax highlighting
- 🔗 Go to definition for components
- 🔄 Rename symbol support
- 📝 JSDoc support for components
- 🧪 Test runner integration
- 📦 NPM package integration
- 🚀 Build task integration

### Future Enhancements
- Language Server Protocol (LSP) implementation
- Advanced IntelliSense with type checking
- Real-time compilation and hot reload in preview
- Debugging support
- Component dependency graph
- Performance profiling
- Accessibility checker
- SEO analyzer

---

## Version History

- **1.0.0** (2026-01-04) - Initial release with full syntax support, snippets, and basic IDE features

