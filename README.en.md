# AspScript for VS Code

🚀 Official Visual Studio Code extension for **AspScript** - the revolutionary zero-runtime reactive framework.

[Русская версия](./README.md) | **English**

## ✨ Features

### 🎨 Syntax Highlighting
- Full syntax highlighting for `.aspc` files
- Support for script section with `---` delimiters
- HTML template highlighting with AspScript directives
- CSS/SCSS style section highlighting
- Reactive keywords: `$state`, `$computed`, `$effect`, `$global`
- Directives: `@click`, `#bind`, `:class`, `#if`, `#for`

### ✅ Linting & Diagnostics
- Real-time error detection
- Duplicate variable warnings
- Invalid directive detection
- Unclosed brace checking
- Empty block warnings
- Code structure validation

### 📝 Snippets
Quick snippets for common patterns:
- `aspc` - Full component template
- `state` - Reactive state variable
- `computed` - Computed value
- `effect` - Side effect
- `onMount` - Lifecycle hook
- `btn` - Button with click handler
- `input` - Input with two-way binding
- `counter` - Complete counter component
- `form` - Complete form component
- And many more!

### 🔧 Commands
- **AspScript: Create Component** - Create a new AspScript component
- **AspScript: Compile Current File** - Compile the active `.aspc` file
- **AspScript: Preview Component** - Preview component in a side panel
- **AspScript: Format Document** - Format AspScript code

### 💡 IntelliSense
- Auto-completion for reactive keywords
- Auto-completion for lifecycle hooks
- Auto-completion for directives
- Enhanced hover information with examples and syntax
- Go to definition for variables and functions
- Document symbols (Outline view)
- Find all references (coming soon)

### 🔧 Code Actions
- Quick fixes for common errors
- Auto-add missing keywords
- Remove empty blocks
- Format on save

### 🎯 Language Features
- Auto-closing brackets and quotes
- Auto-indentation
- Code folding
- Comment toggling
- Smart bracket matching

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS)
3. Search for "AspScript"
4. Click Install

### From VSIX
1. Download the `.vsix` file
2. Open VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
4. Run "Extensions: Install from VSIX..."
5. Select the downloaded `.vsix` file

## 🚀 Quick Start

1. Create a new file with `.aspc` extension
2. Type `aspc` and press Tab to insert a component template
3. Start coding with full syntax highlighting and IntelliSense!

### Example Component

```aspscript
---
// Counter component
let count = $state(0)
$: doubled = count * 2

function increment() {
  count++
}
---

<div class="counter">
  <h2>Count: {count}</h2>
  <p>Doubled: {doubled}</p>
  <button @click="increment">Increment</button>
</div>

<style>
.counter {
  padding: 2rem;
  text-align: center;
}
</style>
```

## ⚙️ Configuration

Configure the extension in VS Code settings:

### AspScript: Compiler Path
Path to the AspScript compiler executable.
```json
{
  "aspscript.compilerPath": "aspc"
}
```

### AspScript: Auto Compile
Automatically compile `.aspc` files on save.
```json
{
  "aspscript.autoCompile": false
}
```

### AspScript: Format Enable
Enable/disable code formatting.
```json
{
  "aspscript.format.enable": true
}
```

### AspScript: Format Indent Size
Number of spaces for indentation.
```json
{
  "aspscript.format.indentSize": 2
}
```

### AspScript: Lint Enable
Enable/disable linting.
```json
{
  "aspscript.lint.enable": true
}
```

### AspScript: Preview Auto Refresh
Auto refresh preview on file save.
```json
{
  "aspscript.preview.autoRefresh": true
}
```

## 🎨 Snippets Reference

| Prefix | Description |
|--------|-------------|
| `aspc` | Full component template |
| `state` | Reactive state variable |
| `computed` | Computed value |
| `effect` | Side effect |
| `global` | Global state |
| `onMount` | OnMount lifecycle hook |
| `onDestroy` | OnDestroy lifecycle hook |
| `func` | Function |
| `afunc` | Async function |
| `template` | Template with interpolation |
| `btn` | Button with click handler |
| `input` | Input with two-way binding |
| `if` | Conditional element |
| `for` | Loop |
| `class` | Dynamic class binding |
| `style` | Style block |
| `scss` | SCSS style block |
| `counter` | Complete counter component |
| `form` | Complete form component |

## 🎯 Keyboard Shortcuts

- `Ctrl+Shift+C` - Compile current file
- `Ctrl+Shift+P` - Preview component
- `Alt+Shift+F` - Format document

## 📚 Resources

- [AspScript Documentation](https://github.com/aspscript/aspscript)
- [Examples](https://github.com/aspscript/aspscript/tree/main/examples)
- [Issue Tracker](https://github.com/aspscript/vscode-extension/issues)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](DEVELOPMENT.md) for details.

## 📝 License

MIT © AspScript Team

## 🙏 Acknowledgments

- Inspired by Vue, Svelte, and Solid.js
- Built with ❤️ for the developer community

---

**Enjoy coding with AspScript!** 🚀

