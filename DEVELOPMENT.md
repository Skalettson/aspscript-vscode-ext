# 🛠️ AspScript VS Code Extension - Development Guide

Это руководство для разработки расширения VS Code для AspScript.

## 📋 Предварительные требования

- Node.js 16+
- Visual Studio Code
- `vsce` (VS Code Extension Manager)

## 🚀 Установка для разработки

### 1. Установка зависимостей

```bash
cd vscode-extension
npm install
```

### 2. Установка VSCE

```bash
npm install -g vsce
```

## 💻 Разработка

### Запуск в режиме разработки

1. Откройте папку `vscode-extension` в VS Code
2. Нажмите `F5` для запуска Extension Development Host
3. Откройте файл `.aspc` для тестирования

### Структура проекта

```
vscode-extension/
├── package.json              # Манифест расширения
├── extension.js              # Основной код расширения
├── language-configuration.json   # Настройки языка
├── syntaxes/
│   └── aspc.tmLanguage.json  # TextMate grammar
├── snippets/
│   └── aspc.json             # Сниппеты
├── icons/
│   └── file-icon.svg         # Иконка .aspc файлов
├── fileicons/
│   └── aspscript-icon-theme.json   # Тема иконок
├── README.md                 # Документация
├── CHANGELOG.md              # История изменений
└── .vscodeignore             # Исключения при публикации
```

## 🎨 Разработка функций

### Добавление новой команды

1. Добавьте команду в `package.json`:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "aspscript.newCommand",
        "title": "AspScript: New Command"
      }
    ]
  }
}
```

2. Зарегистрируйте команду в `extension.js`:

```javascript
const newCommand = vscode.commands.registerCommand(
  'aspscript.newCommand',
  async () => {
    // Код команды
    vscode.window.showInformationMessage('New command executed!');
  }
);

context.subscriptions.push(newCommand);
```

### Добавление нового сниппета

Отредактируйте `snippets/aspc.json`:

```json
{
  "My Snippet": {
    "prefix": "mysnippet",
    "body": [
      "// Snippet code",
      "$1"
    ],
    "description": "My custom snippet"
  }
}
```

### Улучшение syntax highlighting

Отредактируйте `syntaxes/aspc.tmLanguage.json` для добавления новых правил подсветки.

## 🧪 Тестирование

### Тестирование расширения

1. Нажмите `F5` в VS Code
2. Откройте тестовый `.aspc` файл
3. Проверьте:
   - Подсветку синтаксиса
   - Автодополнение
   - Сниппеты
   - Команды

### Тестирование команд

```javascript
// В Extension Development Host:
// 1. Откройте Command Palette (Ctrl+Shift+P)
// 2. Введите "AspScript:"
// 3. Выберите команду для тестирования
```

## 📦 Сборка расширения

### Создание .vsix пакета

```bash
vsce package
```

Это создаст файл `aspscript-1.0.0.vsix`.

### Установка локально

```bash
code --install-extension aspscript-1.0.0.vsix
```

## 🚀 Публикация

### Подготовка к публикации

1. Обновите версию в `package.json`
2. Обновите `CHANGELOG.md`
3. Создайте иконку `icon.png` (128x128 px)
4. Проверьте `README.md`

### Публикация в VS Code Marketplace

```bash
# Логин
vsce login <publisher-name>

# Публикация
vsce publish
```

### Публикация конкретной версии

```bash
vsce publish patch  # 1.0.0 -> 1.0.1
vsce publish minor  # 1.0.0 -> 1.1.0
vsce publish major  # 1.0.0 -> 2.0.0
```

## 🎯 Roadmap разработки расширения

### v1.0.0 ✅ (Текущая)
- [x] Syntax highlighting
- [x] Snippets
- [x] Basic commands
- [x] IntelliSense
- [x] Preview

### v1.1.0 (Планируется)
- [ ] Linting
- [ ] Error checking
- [ ] Quick fixes
- [ ] Code actions

### v1.2.0 (Планируется)
- [ ] Go to definition
- [ ] Find references
- [ ] Rename symbol
- [ ] Format selection

### v2.0.0 (Планируется)
- [ ] Language Server Protocol (LSP)
- [ ] Advanced type checking
- [ ] Debugging support
- [ ] Performance profiling

## 🐛 Отладка

### Debug Extension

1. Установите точки останова в `extension.js`
2. Нажмите `F5`
3. Отладочная консоль покажет вывод

### Debug Syntax Highlighting

1. Откройте `.aspc` файл
2. Ctrl+Shift+P → "Developer: Inspect Editor Tokens and Scopes"
3. Кликните на токен для просмотра scope

## 📝 Best Practices

### Код

- Используйте async/await для асинхронных операций
- Обрабатывайте ошибки правильно
- Добавляйте комментарии к сложным участкам
- Следуйте code style проекта

### UI/UX

- Используйте информативные сообщения
- Показывайте прогресс для долгих операций
- Предоставляйте полезные error messages
- Добавляйте keyboard shortcuts

### Производительность

- Избегайте блокирующих операций
- Используйте debounce для частых событий
- Кешируйте результаты когда возможно
- Очищайте ресурсы в `deactivate()`

## 🔗 Полезные ресурсы

### VS Code Extension API
- [Extension API](https://code.visualstudio.com/api)
- [Extension Guides](https://code.visualstudio.com/api/extension-guides/overview)
- [Language Extensions](https://code.visualstudio.com/api/language-extensions/overview)

### TextMate Grammars
- [TextMate Manual](https://macromates.com/manual/en/language_grammars)
- [VS Code Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)

### Publishing
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VSCE](https://github.com/microsoft/vscode-vsce)

## 🤝 Contributing

Хотите помочь? Отлично!

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'feat: add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 License

MIT © AspScript Team

---

**Happy Extension Development!** 🚀

