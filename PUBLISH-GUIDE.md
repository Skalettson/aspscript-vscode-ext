# 🚀 Руководство по публикации AspScript VS Code Extension

**Дата:** 4 января 2026  
**Версия:** 1.0.0  
**Статус:** ✅ **ГОТОВО К ПУБЛИКАЦИИ**

---

## ✅ Pre-flight Checklist

- [x] ✅ Код расширения написан и протестирован
- [x] ✅ `package.json` настроен
- [x] ✅ Иконка 128x128 создана (`icon.png`)
- [x] ✅ `README.md` заполнен
- [x] ✅ `CHANGELOG.md` обновлен
- [x] ✅ `.vscodeignore` настроен
- [x] ✅ Все зависимости установлены
- [x] ✅ Syntax highlighting работает
- [x] ✅ Snippets работают
- [x] ✅ IntelliSense работает
- [x] ✅ Linting работает
- [x] ✅ Go to Definition работает
- [x] ✅ Document Symbols работают

---

## 📦 Шаг 1: Установка инструментов

### 1.1. Установите Node.js и npm

Убедитесь, что у вас установлена последняя версия:

```bash
node --version  # v20.0.0 или выше
npm --version   # v10.0.0 или выше
```

### 1.2. Установите vsce (VS Code Extension Manager)

```bash
npm install -g @vscode/vsce
```

### 1.3. Проверьте установку

```bash
vsce --version
```

---

## 🏗️ Шаг 2: Подготовка расширения

### 2.1. Перейдите в директорию расширения

```bash
cd e:\AspScript\vscode-extension
```

### 2.2. Установите зависимости (если еще не установлены)

```bash
npm install
```

### 2.3. Проверьте package.json

Убедитесь, что все поля заполнены:

```json
{
  "name": "aspscript",
  "displayName": "AspScript",
  "description": "AspScript framework support for VS Code",
  "version": "1.0.0",
  "publisher": "YOUR_PUBLISHER_ID",  // ← ВАЖНО!
  "icon": "icon.png",
  "engines": {
    "vscode": "^1.80.0"
  }
}
```

**⚠️ ВАЖНО:** Замените `YOUR_PUBLISHER_ID` на ваш реальный Publisher ID из Visual Studio Marketplace.

---

## 🎫 Шаг 3: Создание Publisher ID

### 3.1. Перейдите на Visual Studio Marketplace

```
https://marketplace.visualstudio.com/manage
```

### 3.2. Войдите с помощью Microsoft Account

Используйте ваш GitHub аккаунт или Microsoft аккаунт.

### 3.3. Создайте Publisher

1. Нажмите **"Create publisher"**
2. Заполните форму:
   - **ID**: `aspscript` (или другой уникальный ID)
   - **Name**: AspScript Team
   - **Email**: ваш email

### 3.4. Обновите package.json

```json
{
  "publisher": "aspscript"  // ← Ваш Publisher ID
}
```

---

## 🔐 Шаг 4: Создание Personal Access Token

### 4.1. Перейдите в Azure DevOps

```
https://dev.azure.com
```

### 4.2. Создайте новую организацию (если нужно)

1. Нажмите **"New organization"**
2. Следуйте инструкциям

### 4.3. Создайте Personal Access Token

1. Нажмите на иконку пользователя → **"Personal access tokens"**
2. Нажмите **"+ New Token"**
3. Настройте:
   - **Name**: VS Code Extensions
   - **Organization**: Выберите вашу организацию
   - **Expiration**: 90 дней (или больше)
   - **Scopes**: Custom defined
     - ✅ **Marketplace**: Manage
4. Нажмите **"Create"**
5. **СОХРАНИТЕ TOKEN!** Он больше не будет показан.

### 4.4. Войдите с помощью vsce

```bash
vsce login YOUR_PUBLISHER_ID
```

Введите Personal Access Token когда будет запрошено.

---

## 📦 Шаг 5: Упаковка расширения

### 5.1. Упакуйте расширение в .vsix

```bash
vsce package
```

Это создаст файл `aspscript-1.0.0.vsix`.

### 5.2. Проверьте содержимое (опционально)

```bash
vsce ls
```

Убедитесь, что в пакет не попали лишние файлы.

### 5.3. Установите локально для тестирования

```bash
code --install-extension aspscript-1.0.0.vsix
```

Перезапустите VS Code и проверьте работу расширения.

---

## 🚀 Шаг 6: Публикация

### 6.1. Опубликуйте расширение

```bash
vsce publish
```

Или с указанием версии:

```bash
vsce publish 1.0.0
```

### 6.2. Проверьте статус публикации

Перейдите на:

```
https://marketplace.visualstudio.com/manage/publishers/YOUR_PUBLISHER_ID
```

### 6.3. Дождитесь проверки

Обычно расширение проверяется и публикуется в течение **нескольких минут**.

---

## 🎉 Шаг 7: После публикации

### 7.1. Проверьте страницу расширения

```
https://marketplace.visualstudio.com/items?itemName=YOUR_PUBLISHER_ID.aspscript
```

### 7.2. Поделитесь ссылкой

- GitHub README
- Официальный сайт AspScript
- Социальные сети
- Сообщество разработчиков

### 7.3. Установите через VS Code

Теперь пользователи могут установить расширение:

1. Открыть VS Code
2. Extensions (Ctrl+Shift+X)
3. Поиск: "AspScript"
4. Нажать "Install"

---

## 🔄 Обновление расширения

### Для patch версии (1.0.0 → 1.0.1):

```bash
vsce publish patch
```

### Для minor версии (1.0.0 → 1.1.0):

```bash
vsce publish minor
```

### Для major версии (1.0.0 → 2.0.0):

```bash
vsce publish major
```

### Или вручную:

1. Обновите `version` в `package.json`
2. Обновите `CHANGELOG.md`
3. Запустите `vsce publish`

---

## 📊 Метрики и статистика

### Просмотр статистики

```
https://marketplace.visualstudio.com/manage/publishers/YOUR_PUBLISHER_ID/extensions/aspscript/hub
```

Доступно:
- Количество установок
- Количество скачиваний
- Рейтинг
- Отзывы пользователей

---

## 🐛 Troubleshooting

### Ошибка: "Publisher not found"

**Решение:** Убедитесь, что вы создали Publisher в Visual Studio Marketplace и указали правильный ID в `package.json`.

### Ошибка: "Missing publisher name"

**Решение:** Добавьте поле `"publisher"` в `package.json`.

### Ошибка: "Icon must be 128x128"

**Решение:** Убедитесь, что `icon.png` имеет размер 128x128 пикселей.

### Ошибка: "Personal Access Token expired"

**Решение:** Создайте новый токен в Azure DevOps и войдите снова:

```bash
vsce login YOUR_PUBLISHER_ID
```

### Расширение не работает после установки

**Решение:** 
1. Проверьте `activationEvents` в `package.json`
2. Проверьте логи: Help → Toggle Developer Tools → Console
3. Убедитесь, что все зависимости установлены

---

## 📝 Важные файлы

### .vscodeignore

Исключает файлы из пакета:

```
node_modules
.vscode
test-samples
*.md
!README.md
!CHANGELOG.md
*.log
```

### package.json

Ключевые поля:

- `name` - ID расширения (lowercase, no spaces)
- `displayName` - Отображаемое имя
- `description` - Краткое описание
- `version` - Семантическая версия (x.y.z)
- `publisher` - ID издателя
- `icon` - Путь к иконке
- `engines.vscode` - Минимальная версия VS Code
- `categories` - Категории в Marketplace
- `activationEvents` - Когда активировать расширение
- `contributes` - Что добавляет расширение

---

## 🎯 Маркетинг

### README.md должен содержать:

- ✅ GIF/видео демонстрация
- ✅ Список функций
- ✅ Инструкции по установке
- ✅ Примеры использования
- ✅ Настройки
- ✅ Известные проблемы
- ✅ Лицензия

### Создайте GIF демонстрацию:

Используйте инструменты:
- [ScreenToGif](https://www.screentogif.com/) (Windows)
- [LICEcap](https://www.cockos.com/licecap/) (Windows/macOS)
- [Kap](https://getkap.co/) (macOS)

### Добавьте значки (badges):

```markdown
[![Version](https://img.shields.io/vscode-marketplace/v/aspscript.aspscript.svg)](https://marketplace.visualstudio.com/items?itemName=aspscript.aspscript)
[![Installs](https://img.shields.io/vscode-marketplace/i/aspscript.aspscript.svg)](https://marketplace.visualstudio.com/items?itemName=aspscript.aspscript)
[![Rating](https://img.shields.io/vscode-marketplace/r/aspscript.aspscript.svg)](https://marketplace.visualstudio.com/items?itemName=aspscript.aspscript)
```

---

## 🔗 Полезные ссылки

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)
- [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
- [Azure DevOps](https://dev.azure.com/)

---

## 🎉 Готово!

**AspScript VS Code Extension v1.0.0** готово к публикации и использованию миллионами разработчиков! 🚀

### Финальный checklist:

- [x] ✅ Расширение написано
- [x] ✅ Иконка создана
- [x] ✅ Документация готова
- [x] ✅ Publisher создан
- [x] ✅ Token получен
- [ ] 📦 Упаковать с `vsce package`
- [ ] 🚀 Опубликовать с `vsce publish`
- [ ] 🎉 Поделиться с миром!

---

**Удачной публикации!** 🎊

*AspScript Extension Team*

