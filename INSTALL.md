# 📦 AspScript VS Code Extension - Installation Guide

## 🎯 Методы установки

### Метод 1: Из VS Code Marketplace (Рекомендуется)

После публикации расширения:

1. Откройте Visual Studio Code
2. Нажмите `Ctrl+Shift+X` (Windows/Linux) или `Cmd+Shift+X` (macOS)
3. Введите "AspScript" в поиске
4. Нажмите **Install**

### Метод 2: Из VSIX файла

#### Шаг 1: Скачайте VSIX

Скачайте последний `aspscript-*.vsix` файл из релизов.

#### Шаг 2: Установите

**Через Command Palette:**
1. Откройте VS Code
2. Нажмите `Ctrl+Shift+P` (Windows/Linux) или `Cmd+Shift+P` (macOS)
3. Введите "Extensions: Install from VSIX..."
4. Выберите скачанный `.vsix` файл

**Через командную строку:**
```bash
code --install-extension aspscript-1.0.0.vsix
```

### Метод 3: Из исходников (для разработчиков)

#### Требования
- Node.js 16+
- npm или yarn
- VSCE tool

#### Установка

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/aspscript/vscode-extension
cd vscode-extension

# 2. Установите зависимости
npm install

# 3. Установите VSCE
npm install -g vsce

# 4. Соберите расширение
vsce package

# 5. Установите
code --install-extension aspscript-1.0.0.vsix
```

## ✅ Проверка установки

### 1. Откройте файл .aspc

Создайте новый файл `test.aspc`:

```aspscript
---
let count = $state(0)
---

<div>{count}</div>
```

### 2. Проверьте функции

- ✅ Syntax highlighting работает (ключевые слова цветные)
- ✅ Snippets доступны (попробуйте ввести `aspc` и нажать Tab)
- ✅ Commands доступны (Ctrl+Shift+P → "AspScript:")
- ✅ IntelliSense работает (попробуйте ввести `$`)

## ⚙️ Начальная настройка

### Укажите путь к компилятору

1. Откройте настройки: `Ctrl+,` (Windows/Linux) или `Cmd+,` (macOS)
2. Найдите "AspScript"
3. Установите **Compiler Path**:

```json
{
  "aspscript.compilerPath": "/path/to/aspc"
}
```

Или в проекте `.vscode/settings.json`:

```json
{
  "aspscript.compilerPath": "./node_modules/.bin/aspc"
}
```

### Включите автокомпиляцию (опционально)

```json
{
  "aspscript.autoCompile": true
}
```

### Настройте форматирование

```json
{
  "aspscript.format.enable": true,
  "aspscript.format.indentSize": 2
}
```

## 🎨 Рекомендуемые настройки

Создайте `.vscode/settings.json` в вашем проекте:

```json
{
  // AspScript
  "aspscript.compilerPath": "aspc",
  "aspscript.autoCompile": false,
  "aspscript.format.enable": true,
  "aspscript.format.indentSize": 2,
  "aspscript.lint.enable": true,
  "aspscript.preview.autoRefresh": true,
  
  // File associations
  "files.associations": {
    "*.aspc": "aspscript"
  },
  
  // Editor
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "aspscript.aspscript",
  
  // Emmet
  "emmet.includeLanguages": {
    "aspscript": "html"
  }
}
```

## 🚀 Первый компонент

### 1. Создайте компонент

**Через команду:**
1. Правый клик в Explorer → "AspScript: Create Component"
2. Введите имя: `HelloWorld`

**Или через snippet:**
1. Создайте файл `HelloWorld.aspc`
2. Введите `aspc` и нажмите Tab

### 2. Напишите код

```aspscript
---
// HelloWorld component
let name = $state('World')
$: greeting = `Hello, ${name}!`

function changeName() {
  name = 'AspScript'
}
---

<div class="hello">
  <h1>{greeting}</h1>
  <button @click="changeName">Change Name</button>
</div>

<style>
.hello {
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

button {
  padding: 0.5rem 1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
</style>
```

### 3. Скомпилируйте

- **Через команду:** `Ctrl+Shift+P` → "AspScript: Compile Current File"
- **Через контекстное меню:** Правый клик → "AspScript: Compile"
- **Автоматически:** Включите `aspscript.autoCompile` и сохраните файл

### 4. Превью (опционально)

`Ctrl+Shift+P` → "AspScript: Preview Component"

## 🔧 Устранение проблем

### Расширение не активируется

**Проблема:** `.aspc` файлы не распознаются

**Решение:**
1. Проверьте, что расширение установлено: `Ctrl+Shift+X` → "AspScript"
2. Перезагрузите VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Проверьте ассоциацию файлов:
   ```json
   {
     "files.associations": {
       "*.aspc": "aspscript"
     }
   }
   ```

### Snippets не работают

**Проблема:** Snippets не появляются при вводе

**Решение:**
1. Убедитесь, что расширение активно
2. Попробуйте `Ctrl+Space` для принудительного вызова
3. Проверьте настройки:
   ```json
   {
     "editor.suggest.snippetsPreventQuickSuggestions": false
   }
   ```

### Команды не найдены

**Проблема:** Команды "AspScript:" не отображаются

**Решение:**
1. Откройте `.aspc` файл (расширение активируется для этого языка)
2. Перезагрузите окно: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Проверьте логи: `Ctrl+Shift+P` → "Developer: Toggle Developer Tools"

### Компилятор не найден

**Проблема:** "aspc: command not found"

**Решение:**
1. Установите AspScript компилятор:
   ```bash
   npm install -g @aspscript/compiler
   ```
2. Или укажите локальный путь:
   ```json
   {
     "aspscript.compilerPath": "./node_modules/.bin/aspc"
   }
   ```

## 🎓 Дальнейшие шаги

1. Изучите [Snippets Reference](README.md#snippets-reference)
2. Настройте [Keyboard Shortcuts](README.md#keyboard-shortcuts)
3. Прочитайте [AspScript Documentation](https://github.com/aspscript/aspscript)
4. Посмотрите [Examples](https://github.com/aspscript/aspscript/tree/main/examples)

## 💬 Поддержка

- 🐛 [Report a Bug](https://github.com/aspscript/vscode-extension/issues)
- 💡 [Request a Feature](https://github.com/aspscript/vscode-extension/issues)
- 💬 [Discussions](https://github.com/aspscript/vscode-extension/discussions)
- 📧 [Email Support](mailto:support@aspscript.dev)

---

**Готово! Начните создавать с AspScript!** 🚀

