# Налаштування Firebase для SMB Tool

## 1. Створіть проект Firebase

1. Перейдіть на [Firebase Console](https://console.firebase.google.com/)
2. Натисніть "Create a project" або "Створити проект"
3. Введіть назву проекту (наприклад, "smb-tool")
4. Виберіть чи хочете включити Google Analytics (рекомендується)
5. Натисніть "Create project"

## 2. Увімкніть Authentication

1. У Firebase Console перейдіть в розділ "Authentication"
2. Перейдіть на вкладку "Sign-in method"
3. Знайдіть "Google" в списку провайдерів
4. Натисніть на нього та увімкніть
5. Введіть назву проекту як "SMB Tool"
6. Введіть email підтримки
7. Натисніть "Save"

## 3. Отримайте конфігурацію Firebase

1. Перейдіть в "Project settings" (шестерінка в меню зліва)
2. Прокрутіть вниз до розділу "Your apps"
3. Натисніть на іконку веб-додатку (</>) або "Add app" якщо немає
4. Зареєструйте веб-додаток з назвою "SMB Tool"
5. Скопіюйте конфігурацію Firebase SDK

## 4. Налаштуйте змінні середовища

1. Скопіюйте `.env.example` у `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Відкрийте `.env.local` і вставте ваші значення з Firebase Console:

```
VITE_FIREBASE_API_KEY=ваш-api-key
VITE_FIREBASE_AUTH_DOMAIN=ваш-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ваш-project-id
VITE_FIREBASE_STORAGE_BUCKET=ваш-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

⚠️ Файл `.env.local` не комітиться в Git (він у `.gitignore`).

## 5. Налаштуйте домени для Google Auth

1. У Firebase Console перейдіть в Authentication → Sign-in method
2. В розділі "Authorized domains" додайте:
   - `localhost` (для розробки)
   - Ваш домен у продакшені

## 6. Тестування

1. Запустіть проект: `npm run dev`
2. Перейдіть на `http://localhost:5173/login`
3. Натисніть "Продовжити з Google"
4. Виберіть обліковий запис Google

## Безпека

✅ Ключі Firebase зберігаються у змінних середовища (`.env.local`) і не комітяться в Git.
