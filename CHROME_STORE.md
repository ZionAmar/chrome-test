# פרסום בחנות Chrome (Chrome Web Store)

כדי שהתוסף יהיה **זמין להורדה בחנות Chrome**, בצע את הצעדים הבאים. אחרי האישור, משתמשים ימצאו אותו בחיפוש ויוכלו להתקין בלחיצה. חודש ראשון חינם, אחר כך 5$ בלחיצה — והכסף מגיע אליך (דרך LemonSqueezy).

---

## 1. חשבון מפתח

- גלוש ל־[Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
- היכנס עם חשבון Google.
- תשלום חד־פעמי **$5** (דמי רישום למפתח) — פעם אחת לכל החשבון.

---

## 2. הכנת החבילה

- הרץ `build.ps1` (או צור zip ידנית) — רק קבצי התוסף: `manifest.json`, `content.js`, `popup.*`, `options.*`, `config.js`, `_locales/`, `icons/`. בלי `api/`, `landing/`, `vercel.json`.
- **חשוב:** לפני האריזה ערוך **config.js** עם הכתובות האמיתיות שלך (CHECKOUT_URL ל־LemonSqueezy, VERIFY_API_URL ל־Vercel), כדי שלאחר ההתקנה מהחנות "פתח Pro — 5$" יעבוד.
- צור קובץ **zip** אחד עם כל הקבצים בתוך התיקייה (ברמת השורש: `manifest.json` וכו', לא תיקייה עוטפת).

---

## 3. העלאה לחנות

- ב־Developer Dashboard → **New Item** → העלה את קובץ ה‑zip.
- מלא את השדות לפי הרשימה למטה.

---

## 4. טקסטים לפרסום (העתק והדבק)

### שם קצר (עד 45 תווים)
```
Text Rescuer — Never lose what you type
```

### תיאור קצר (עד 132 תווים)
```
Saves what you type. One month free, then $5 one-time to unlock forever. Restore with one click.
```

### תיאור מפורט (למשתמשים)
```
Text Rescuer saves everything you type in forms and text boxes. If the page closes, the browser crashes, or you hit Back by mistake — open the extension and restore your text with one click.

• One month free with full features
• After that: $5 one-time payment to unlock forever (no subscription)
• 24-hour save on free; 30-day save + time machine on Pro
• Works on any website; never saves passwords or card numbers
• All data stays on your device

Install from the store, use it free for a month, then unlock Pro with a single $5 payment — the payment goes to the developer.
```

### קטגוריה
**Productivity** (או **Tools**).

### תמונות
- **מסך בודד:** 1280x800 או 640x400 (מסך בודד של התוסף / דף נחיתה).
- **אייקון:** כבר קיים ב־icons/ (128x128).

---

## 5. אחרי הפרסום

- הקישור לתוסף יהיה בדומה ל־`https://chrome.google.com/webstore/detail/XXXXX`.
- עדכן את **config.js** → LANDING_URL ואת דף הנחיתה כך ש"התקן חינם" יופנה לקישור הזה (או השאר הורדת zip כאופציה נוספת).
- תשלום: מוצר ב־LemonSqueezy במחיר **$5 חד־פעמי**, עם License keys. המשתמש לוחץ "פתח Pro — 5$" → משלם → מקבל מפתח → מדביק בהגדרות → Pro פתוח לצמיתות, והכסף מגיע אליך.

---

## סיכום

| שלב | פעולה |
|-----|--------|
| 1 | חשבון Developer + $5 דמי רישום |
| 2 | עריכת config.js, הרצת build.ps1, יצירת zip |
| 3 | העלאת zip ל־Chrome Web Store |
| 4 | מילוי שם, תיאור, קטגוריה, תמונה |
| 5 | שליחה לאישור — אחרי האישור התוסף זמין להורדה בחנות Chrome |
