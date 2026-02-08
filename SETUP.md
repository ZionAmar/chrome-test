# חיבור התוסף: חנות Chrome + תשלום 5$ אליך

כדי שהתוסף יהיה **זמין בחנות Chrome להורדה**, משתמשים **חודש חינם** ואז הוא **נעול**, ו**5$ בלחיצה** פותח לצמיתות — והכסף **אליך** (דרך LemonSqueezy). בצע את הצעדים הבאים.

---

## 1. ערוך את קובץ ההגדרה של התוסף

פתח **`config.js`** (בשורש הפרויקט) ועדכן:

- **LANDING_URL** — הכתובת שבה יפורסם דף הנחיתה (למשל `https://YOUR-USER.github.io/YOUR-REPO/landing/`).
- **CHECKOUT_URL** — קישור רכישה חד־פעמית 5$ מ-LemonSqueezy (Products → One-time $5 → Copy checkout URL).
- **VERIFY_API_URL** — כתובת ה-API לאימות רישיון (תקבל אחרי צעד 3).

שמור את הקובץ.

---

## 2. צור קובץ zip להורדה

הרץ מתיקיית הפרויקט:

```powershell
.\build.ps1
```

זה ייצור **`landing/text-rescuer.zip`**. קובץ זה הוא התוסף הארוז — משתמשים יורידים אותו ומחלצים, ואז טוענים את התיקייה ב-Chrome.

---

## 3. פרוס את אימות הרישיון (תשלום)

- היכנס ל-[Vercel](https://vercel.com) וייבא את הפרויקט (או רק את התיקיות `api/` + `vercel.json`).
- בהגדרות הפרויקט → Environment Variables הוסף:
  - **LEMON_SQUEEZY_API_KEY** = המפתח API מ-LemonSqueezy (Settings → API).
- פרוס. תקבל כתובת כמו `https://YOUR-APP.vercel.app/api/verify`.
- העתק את הכתובת ל-**config.js** בשדה **VERIFY_API_URL** (ואם צריך, הרץ שוב את `build.ps1`).

---

## 4. ערוך את דף הנחיתה

פתח **`landing/index.html`** ומצא בתחילת הסקריפט את **CONFIG**:

- **DOWNLOAD_URL** — אם ה-zip יושב באותו שרת כמו הדף, השאר `./text-rescuer.zip`. אחרת שים כתובת מלאה (למשל קישור מ-GitHub Releases).
- **CHECKOUT_URL** — אותו קישור LemonSqueezy מהצעד 1.

שמור.

---

## 5. פרסם את דף הנחיתה (והקובץ zip)

- העלה את כל הפרויקט ל-GitHub (כולל `landing/` ו-`landing/text-rescuer.zip`).
- הפעל GitHub Pages מהענף הראשי, תיקייה `/landing` (או שורש אם המבנה מתאים).
- או: העלה את `landing/` ל-Netlify/אחר.

עכשיו:

- **"התקן חינם"** מוריד את `text-rescuer.zip` ומחובר.
- **"פתח Pro — 5$"** מוביל ל-LemonSqueezy; תשלום חד־פעמי — הכסף אליך.
- התוסף עצמו (מה-zip) כבר מכיל את הכתובות מ-**config.js**, כך ש"שדרג ל-Pro" והגדרות אימות הרישיון יעבדו אחרי שהמשתמש מתקין.

---

## 6. טעינת התוסף ב-Chrome (בדיקה)

1. Chrome → `chrome://extensions/`
2. הפעל "מצב מפתח"
3. "טען פריסה לא מאושרת" → בחר את **תיקיית הפרויקט** (לא את ה-zip — את התיקייה עם `manifest.json`).

אחרי שכל הצעדים בוצעו: התוסף מחובר, זמין להורדה מהדף, ומחובר לתשלום דרך LemonSqueezy ואימות הרישיון ב-Vercel.
