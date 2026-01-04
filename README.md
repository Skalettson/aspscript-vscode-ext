# AspScript для VS Code

🚀 Официальное расширение Visual Studio Code для **AspScript v1.3.0** - революционного compile-time фреймворка без рантайма.

[![npm core](https://img.shields.io/npm/v/@aspscript/core?label=%40aspscript%2Fcore&color=blue)](https://www.npmjs.com/package/@aspscript/core)
[![npm compiler](https://img.shields.io/npm/v/@aspscript/compiler?label=%40aspscript%2Fcompiler&color=green)](https://www.npmjs.com/package/@aspscript/compiler)
[![downloads](https://img.shields.io/npm/dm/@aspscript/core?color=orange)](https://www.npmjs.com/package/@aspscript/core)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](https://opensource.org/licenses/MIT)

**Русская версия** | [English](./README.en.md)

---

## 🎉 AspScript v1.3.0 "Advanced Compiler"

### Новые возможности:
- 🔀 **Условные директивы**: `{#if}`, `{:else if}`, `{:else}`, `{/if}`
- 🔄 **Оптимизированные циклы**: `{#for}`, `{#each}` с поддержкой `:key`
- 🧩 **Продвинутые компоненты**: Props с валидацией, события, слоты
- ⚠️ **Улучшенная обработка ошибок**: Детальные сообщения компилятора
- 📦 **npm пакеты**: Опубликовано 17 пакетов в npm registry

---

## ✨ Возможности расширения

### 🎨 Syntax Highlighting
- ✅ Полная подсветка синтаксиса для `.aspc` файлов
- ✅ Секция скриптов с разделителями `---` или `<script>`
- ✅ HTML-шаблоны с интерполяцией `{variable}`
- ✅ Реактивные ключевые слова: `$state`, `$computed`, `$effect`, `$global`
- ✅ Директивы событий: `@click`, `@input`, `@submit.prevent`
- ✅ Директивы привязки: `#bind`, `:class`, `:style`
- ✅ **Новое в v1.3.0**: `{#if}`, `{:else if}`, `{:else}`, `{/if}`
- ✅ **Новое в v1.3.0**: `{#for item in items}`, `{#each array as (item, i)}`
- ✅ CSS/SCSS секции стилей с вложенностью

### 📝 20+ Snippets
Быстрые сниппеты для ускорения разработки:

| Префикс | Описание | Новое |
|---------|----------|-------|
| `aspc` | Полный шаблон компонента | |
| `state` | `let x = $state(0)` | |
| `computed` | `$: computed = expression` | |
| `effect` | `$: effect(() => {...})` | |
| `global` | `export const x = $global(0)` | |
| `if` | Условный блок `{#if}` | ✨ v1.3.0 |
| `for` | Цикл `{#for}` | ✨ v1.3.0 |
| `each` | Цикл с индексом `{#each}` | ✨ v1.3.0 |
| `props` | Определение props | ✨ v1.3.0 |
| `emits` | Определение событий | ✨ v1.3.0 |
| `slot` | Слот для контента | ✨ v1.3.0 |
| `counter` | Полный компонент счетчика | |
| `form` | Полный компонент формы | |

### 💡 IntelliSense
- ✅ Автодополнение реактивных API
- ✅ Автодополнение хуков жизненного цикла (`onMount`, `onDestroy`)
- ✅ Автодополнение директив (`@click`, `#bind`, `:class`)
- ✅ **Новое v1.3.0**: Автодополнение условных директив
- ✅ **Новое v1.3.0**: Автодополнение директив циклов
- ✅ Hover документация с примерами и синтаксисом
- ✅ Go to Definition для переменных и функций
- ✅ Document Symbols (Outline панель)

### ✅ Linting & Diagnostics
- ⚠️ Обнаружение ошибок в реальном времени
- ⚠️ Предупреждения о дублирующихся переменных
- ⚠️ Обнаружение неверных директив
- ⚠️ Проверка незакрытых скобок
- ⚠️ Валидация структуры компонента
- ⚠️ **Новое v1.3.0**: Проверка синтаксиса условных блоков
- ⚠️ **Новое v1.3.0**: Валидация props и emits

### 🔧 Commands
- `AspScript: Create Component` - Создать новый `.aspc` компонент
- `AspScript: Compile Current File` - Скомпилировать активный файл
- `AspScript: Preview Component` - Предпросмотр компонента
- `AspScript: Format Document` - Форматирование кода

### 🎯 Code Actions
- 💡 Быстрые исправления частых ошибок
- 💡 Автоматическое добавление недостающих ключевых слов
- 💡 Удаление пустых блоков
- 💡 Форматирование при сохранении

---

## 📦 Установка AspScript

### 1. Установите расширение VS Code

**Из VS Code Marketplace** (скоро):
1. Откройте VS Code
2. `Ctrl+Shift+X` → Найдите "AspScript"
3. Нажмите "Установить"

**Из VSIX файла**:
1. Скачайте `aspscript-1.3.0.vsix`
2. `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
3. Выберите файл и установите

### 2. Установите npm пакеты

```bash
# Основные пакеты
npm install @aspscript/core @aspscript/compiler @aspscript/cli

# Или для Vite проекта
npm install -D @aspscript/vite-plugin
```

**📦 Доступные пакеты:**
- [@aspscript/core](https://www.npmjs.com/package/@aspscript/core) - Ядро и реактивность
- [@aspscript/compiler](https://www.npmjs.com/package/@aspscript/compiler) - Компилятор .aspc → .js
- [@aspscript/cli](https://www.npmjs.com/package/@aspscript/cli) - CLI утилиты
- [@aspscript/vite-plugin](https://www.npmjs.com/package/@aspscript/vite-plugin) - Vite плагин
- [И 13+ других пакетов](https://www.npmjs.com/org/aspscript)

---

## 🚀 Быстрый старт

### 1. Создайте компонент

Создайте файл `Counter.aspc`:

```aspc
---
// Компонент счетчика
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

### 2. Используйте сниппеты

Наберите `aspc` и нажмите **Tab** для вставки полного шаблона!

### 3. Скомпилируйте

- **Команда**: `Ctrl+Shift+P` → "AspScript: Compile Current File"
- **Контекстное меню**: Правый клик → "AspScript: Compile"
- **Терминал**: `npx aspc compile Counter.aspc`

---

## 🆕 Новые возможности v1.3.0

### Условные директивы

```aspc
{#if user.isLoggedIn}
  <div class="welcome">
    <h1>Добро пожаловать, {user.name}!</h1>
    <button @click="logout">Выйти</button>
  </div>
{:else if user.isPending}
  <div class="loading">
    <p>Загрузка...</p>
  </div>
{:else}
  <LoginForm @submit="handleLogin" />
{/if}
```

### Циклы

```aspc
<!-- Простой цикл -->
{#for item in items}
  <div>{item.name}</div>
{/for}

<!-- С ключом для оптимизации -->
{#for user in users :key="id"}
  <UserCard :data="user" @click="selectUser(user)" />
{/for}

<!-- С индексом -->
{#each todos as (todo, index)}
  <div class="todo">
    <span>{index + 1}. {todo.text}</span>
    <button @click="remove(index)">×</button>
  </div>
{/each}
```

### Компоненты с Props

```aspc
---
// Определение props с валидацией
export const props = {
  title: { type: String, required: true },
  count: { type: Number, default: 0 },
  theme: { type: String, default: 'light' }
}

// Определение событий
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

### Слоты

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

**Использование:**
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

## ⚙️ Настройки

Откройте Settings (`Ctrl+,`) и найдите "AspScript":

```json
{
  // Путь к компилятору
  "aspscript.compilerPath": "aspc",
  
  // Автокомпиляция при сохранении
  "aspscript.autoCompile": false,
  
  // Форматирование
  "aspscript.format.enable": true,
  "aspscript.format.indentSize": 2,
  
  // Линтинг
  "aspscript.lint.enable": true,
  
  // Предпросмотр
  "aspscript.preview.autoRefresh": true
}
```

---

## 🎯 Горячие клавиши

| Клавиши | Действие |
|---------|----------|
| `Ctrl+Shift+C` | Скомпилировать текущий файл |
| `Ctrl+Shift+P` | Предпросмотр компонента |
| `Alt+Shift+F` | Форматировать документ |
| `F12` | Go to Definition |
| `Shift+F12` | Find All References |

---

## 📚 Ресурсы

- **📖 Документация**: https://aspscript.dev
- **💻 GitHub**: https://github.com/Skalettson/aspscript
- **📦 npm**: https://www.npmjs.com/org/aspscript
- **💬 Discord**: https://discord.gg/aspscript
- **📝 Примеры**: https://github.com/Skalettson/aspscript/tree/main/examples
- **🐛 Issues**: https://github.com/Skalettson/aspscript/issues

---

## 🤝 Участие в разработке

Мы приветствуем вклад! Смотрите [DEVELOPMENT.md](./DEVELOPMENT.md) для деталей.

---

## 📝 Changelog

### [1.3.0] - 2026-01-04
- 🔀 Добавлена поддержка условных директив
- 🔄 Добавлена поддержка циклов
- 🧩 Поддержка компонентов с props, events, slots
- ⚠️ Улучшенные сообщения об ошибках
- 🔗 Ссылки на npm пакеты

[Полный changelog](./CHANGELOG.md)

---

## 📄 Лицензия

MIT © AspScript Team

---

## 🙏 Благодарности

Вдохновлено Vue, Svelte и Solid.js  
Создано с ❤️ для сообщества разработчиков

---

**Приятного кодирования с AspScript! 🚀**

*AspScript v1.3.0 - Write Less, Do Faster*
