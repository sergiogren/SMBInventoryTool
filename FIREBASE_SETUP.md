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

## 4. Налаштуйте конфігурацію в проекті

1. Відкрийте файл `src/services/firebase.ts`
2. Замініть `firebaseConfig` на вашу реальну конфігурацію:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

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

⚠️ **Важливо:** Ніколи не комітьте реальні ключі Firebase в Git!

Додайте `src/services/firebase.ts` до `.gitignore` або використовуйте змінні середовища:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ...
};
```

І створіть файл `.env.local`:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```
