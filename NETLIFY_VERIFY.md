# אימות רישיון ב-Netlify (במקום Vercel)

אם ה-API ב-Vercel מחזיר 404, השתמש ב-Netlify.

## 1. הרשם / התחבר ל-Netlify
- [netlify.com](https://netlify.com) → Sign up (או Login) עם GitHub.

## 2. פרויקט חדש מהמאגר
- **Add new site** → **Import an existing project** → **GitHub** → בחר את `chrome-test`.
- **Branch:** `main`.
- **Build settings:** Netlify יזהה אוטומטית מ-`netlify.toml` (פונקציה ב-`netlify/functions`).
- **Deploy site**.

## 3. משתנה סביבה
- **Site configuration** (או **Site settings**) → **Environment variables** → **Add a variable** / **Add environment variable**.
- **Key:** `LEMON_SQUEEZY_API_KEY`
- **Value:** המפתח מ-LemonSqueezy (Settings → API).
- **Save** → **Trigger deploy** (או Deploys → Trigger deploy).

## 4. עדכון config.js
אחרי ה-deploy, העתק את כתובת האתר (למשל `https://something.netlify.app`).
ב-`config.js` עדכן:

```js
VERIFY_API_URL: 'https://YOUR-SITE-NAME.netlify.app/api/verify'
```

(החלף `YOUR-SITE-NAME` בשם האתר שלך. ה-path `/api/verify` עובד בזכות redirect ב-`netlify.toml`.)

## 5. בדיקה
פתח בדפדפן:
`https://YOUR-SITE-NAME.netlify.app/api/verify`
אמור להחזיר JSON (למשל `{"valid":false}`) ולא 404.
