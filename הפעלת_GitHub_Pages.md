# הפעלת GitHub Pages — כדי שהקישור לא יהיה 404

הקובץ **privacy.html** כבר בריפו (ברמת main). צריך רק להפעיל Pages נכון.

---

## צעד 1: כניסה להגדרות

1. גלוש ל־ **https://github.com/ZionAmar/chrome-test**
2. לחץ על **Settings** (הלשונית העליונה של הריפו).

---

## צעד 2: פתיחת Pages

3. בתפריט השמאלי גלול ו**לחץ על "Pages"** (תחת "Code and automation" או "Build and deployment").

---

## צעד 3: בחירת מקור

4. תחת **"Build and deployment"** → **"Source"**:
   - בחר **"Deploy from a branch"** (לא "GitHub Actions" כרגע).

5. תחת **"Branch"**:
   - בחר **main** (או **master** אם אין לך main).
   - **Folder** — בחר **/ (root)**.
   - לחץ **Save**.

---

## צעד 4: המתנה

6. חכה **1–2 דקות** (לפעמים עד 5).
7. בראש העמוד אמור להופיע משהו בסגנון:  
   **"Your site is live at https://zionamar.github.io/chrome-test/"**

---

## צעד 5: בדיקה

8. פתח בדפדפן:
   - **https://zionamar.github.io/chrome-test/privacy.html**
   - **https://zionamar.github.io/chrome-test/support.html**

אם עדיין 404 — רענן אחרי דקה נוספת או נסה בחלון פרטי (אינקוגניטו).

---

## אם אין לך "Pages" בהגדרות

- וודא שאתה **בעלים** של הריפו (או עם הרשאות אדמין).
- אם הריפו היה פרטי והפך לפומבי — לעיתים צריך לשמור שוב את ההגדרות ב־Pages (לפתוח Pages, לשנות ל־Deploy from branch, Save).

---

## אם הברנץ' נקרא master ולא main

- ב־**Branch** בחר **master** (לא main).
- שמור.
- הקישורים נשארים:  
  https://zionamar.github.io/chrome-test/privacy.html
