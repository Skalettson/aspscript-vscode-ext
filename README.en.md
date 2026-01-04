# AspScript for VS Code

🚀 Official Visual Studio Code extension for **AspScript v1.3.0** - the revolutionary compile-time framework with zero runtime.

[![npm core](https://img.shields.io/npm/v/@aspscript/core?label=%40aspscript%2Fcore&color=blue)](https://www.npmjs.com/package/@aspscript/core)
[![npm compiler](https://img.shields.io/npm/v/@aspscript/compiler?label=%40aspscript%2Fcompiler&color=green)](https://www.npmjs.com/package/@aspscript/compiler)
[![downloads](https://img.shields.io/npm/dm/@aspscript/core?color=orange)](https://www.npmjs.com/package/@aspscript/core)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](https://opensource.org/licenses/MIT)

[Русская версия](./README.md) | **English**

---

## 🎉 AspScript v1.3.0 "Advanced Compiler"

### New Features:
- 🔀 **Conditional directives**: `{#if}`, `{:else if}`, `{:else}`, `{/if}`
- 🔄 **Optimized loops**: `{#for}`, `{#each}` with `:key` support
- 🧩 **Advanced components**: Props with validation, events, slots
- ⚠️ **Better error handling**: Detailed compiler messages
- 📦 **npm packages**: 17 packages published to npm registry

---

## ✨ Extension Features

### 🎨 Syntax Highlighting
- ✅ Full syntax highlighting for `.aspc` files
- ✅ Script section with `---` or `<script>` delimiters
- ✅ HTML templates with `{variable}` interpolation
- ✅ Reactive keywords: `$state`, `$computed`, `$effect`, `$global`
- ✅ Event directives: `@click`, `@input`, `@submit.prevent`
- ✅ Binding directives: `#bind`, `:class`, `:style`
- ✅ **New in v1.3.0**: `{#if}`, `{:else if}`, `{:else}`, `{/if}`
- ✅ **New in v1.3.0**: `{#for item in items}`, `{#each array as (item, i)}`
- ✅ CSS/SCSS style sections with nesting

### 📝 20+ Snippets
Quick snippets to speed up development:

| Prefix | Description | New |
|--------|-------------|-----|
| `aspc` | Full component template | |
| `state` | `let x = $state(0)` | |
| `computed` | `$: computed = expression` | |
| `effect` | `$: effect(() => {...})` | |
| `global` | `export const x = $global(0)` | |
| `if` | Conditional block `{#if}` | ✨ v1.3.0 |
| `for` | Loop `{#for}` | ✨ v1.3.0 |
| `each` | Loop with index `{#each}` | ✨ v1.3.0 |
| `props` | Props definition | ✨ v1.3.0 |
| `emits` | Events definition | ✨ v1.3.0 |
| `slot` | Content slot | ✨ v1.3.0 |
| `counter` | Complete counter component | |
| `form` | Complete form component | |

### 💡 IntelliSense
- ✅ Auto-completion for reactive APIs
- ✅ Auto-completion for lifecycle hooks (`onMount`, `onDestroy`)
- ✅ Auto-completion for directives (`@click`, `#bind`, `:class`)
- ✅ **New v1.3.0**: Auto-completion for conditional directives
- ✅ **New v1.3.0**: Auto-completion for loop directives
- ✅ Hover documentation with examples and syntax
- ✅ Go to Definition for variables and functions
- ✅ Document Symbols (Outline panel)

### ✅ Linting & Diagnostics
- ⚠️ Real-time error detection
- ⚠️ Duplicate variable warnings
- ⚠️ Invalid directive detection
- ⚠️ Unclosed bracket checking
- ⚠️ Component structure validation
- ⚠️ **New v1.3.0**: Conditional block syntax checking
- ⚠️ **New v1.3.0**: Props and emits validation

### 🔧 Commands
- `AspScript: Create Component` - Create new `.aspc` component
- `AspScript: Compile Current File` - Compile active file
- `AspScript: Preview Component` - Preview component
- `AspScript: Format Document` - Format code

### 🎯 Code Actions
- 💡 Quick fixes for common errors
- 💡 Auto-add missing keywords
- 💡 Remove empty blocks
- 💡 Format on save

---

## 📦 Installing AspScript

### 1. Install VS Code Extension

**From VS Code Marketplace** (coming soon):
1. Open VS Code
2. `Ctrl+Shift+X` → Search for "AspScript"
3. Click "Install"

**From VSIX file**:
1. Download `aspscript-1.3.0.vsix`
2. `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
3. Select file and install

### 2. Install npm Packages

```bash
# Core packages
npm install @aspscript/core @aspscript/compiler @aspscript/cli

# Or for Vite project
npm install -D @aspscript/vite-plugin
```

**📦 Available packages:**
- [@aspscript/core](https://www.npmjs.com/package/@aspscript/core) - Core & reactivity
- [@aspscript/compiler](https://www.npmjs.com/package/@aspscript/compiler) - .aspc → .js compiler
- [@aspscript/cli](https://www.npmjs.com/package/@aspscript/cli) - CLI utilities
- [@aspscript/vite-plugin](https://www.npmjs.com/package/@aspscript/vite-plugin) - Vite plugin
- [And 13+ more packages](https://www.npmjs.com/org/aspscript)

---

## 🚀 Quick Start

### 1. Create a Component

Create `Counter.aspc` file:

```aspc
---
// Counter component
let count = $state(0)
$: doubled = count * 2

function increment() {
  count++
}
---

<div class="counter">
  <h1>AspScript Counter</h1>
  <p>Count: {count}</p>
  <p>Doubled: {doubled}</p>
  <button @click="increment">+1</button>
</div>

<style>
.counter {
  padding: 2rem;
  text-align: center;
}

button {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}
</style>
```

### 2. Use Snippets

Type `aspc` and press **Tab** to insert full template!

### 3. Compile

- **Command**: `Ctrl+Shift+P` → "AspScript: Compile Current File"
- **Context Menu**: Right-click → "AspScript: Compile"
- **Terminal**: `npx aspc compile Counter.aspc`

---

## 🆕 New in v1.3.0

### Conditional Directives

```aspc
{#if user.isLoggedIn}
  <div class="welcome">
    <h1>Welcome, {user.name}!</h1>
    <button @click="logout">Logout</button>
  </div>
{:else if user.isPending}
  <div class="loading">
    <p>Loading...</p>
  </div>
{:else}
  <LoginForm @submit="handleLogin" />
{/if}
```

### Loops

```aspc
<!-- Simple loop -->
{#for item in items}
  <div>{item.name}</div>
{/for}

<!-- With key for optimization -->
{#for user in users :key="id"}
  <UserCard :data="user" @click="selectUser(user)" />
{/for}

<!-- With index -->
{#each todos as (todo, index)}
  <div class="todo">
    <span>{index + 1}. {todo.text}</span>
    <button @click="remove(index)">×</button>
  </div>
{/each}
```

### Components with Props

```aspc
---
// Props definition with validation
export const props = {
  title: { type: String, required: true },
  count: { type: Number, default: 0 },
  theme: { type: String, default: 'light' }
}

// Events definition
export const emits = ['click', 'update', 'delete']

function handleClick() {
  emit('click', { count })
}
---

<div :class="`card card--${theme}`">
  <h2>{title}</h2>
  <p>Count: {count}</p>
  <button @click="handleClick">Click me</button>
</div>
```

### Slots

```aspc
<div class="modal">
  <div class="modal__header">
    <slot name="header">
      <h2>Default Header</h2>
    </slot>
  </div>
  
  <div class="modal__body">
    <slot>
      Default content
    </slot>
  </div>
  
  <div class="modal__footer">
    <slot name="footer">
      <button>Close</button>
    </slot>
  </div>
</div>
```

**Usage:**
```aspc
<Modal>
  <template #header>
    <h1>Custom Header</h1>
  </template>
  
  <p>Custom body content</p>
  
  <template #footer>
    <button @click="save">Save</button>
    <button @click="cancel">Cancel</button>
  </template>
</Modal>
```

---

## ⚙️ Settings

Open Settings (`Ctrl+,`) and search for "AspScript":

```json
{
  // Compiler path
  "aspscript.compilerPath": "aspc",
  
  // Auto-compile on save
  "aspscript.autoCompile": false,
  
  // Formatting
  "aspscript.format.enable": true,
  "aspscript.format.indentSize": 2,
  
  // Linting
  "aspscript.lint.enable": true,
  
  // Preview
  "aspscript.preview.autoRefresh": true
}
```

---

## 🎯 Keyboard Shortcuts

| Keys | Action |
|------|--------|
| `Ctrl+Shift+C` | Compile current file |
| `Ctrl+Shift+P` | Preview component |
| `Alt+Shift+F` | Format document |
| `F12` | Go to Definition |
| `Shift+F12` | Find All References |

---

## 📚 Resources

- **📖 Documentation**: https://aspscript.dev
- **💻 GitHub**: https://github.com/Skalettson/aspscript
- **📦 npm**: https://www.npmjs.com/org/aspscript
- **💬 Discord**: https://discord.gg/aspscript
- **📝 Examples**: https://github.com/Skalettson/aspscript/tree/main/examples
- **🐛 Issues**: https://github.com/Skalettson/aspscript/issues

---

## 🤝 Contributing

Contributions are welcome! See [DEVELOPMENT.md](./DEVELOPMENT.md) for details.

---

## 📝 Changelog

### [1.3.0] - 2026-01-04
- 🔀 Added conditional directives support
- 🔄 Added loop directives support
- 🧩 Components with props, events, slots support
- ⚠️ Improved error messages
- 🔗 Links to npm packages

[Full changelog](./CHANGELOG.md)

---

## 📄 License

MIT © AspScript Team

---

## 🙏 Acknowledgments

Inspired by Vue, Svelte, and Solid.js  
Built with ❤️ for the developer community

---

**Enjoy coding with AspScript! 🚀**

*AspScript v1.3.0 - Write Less, Do Faster*
