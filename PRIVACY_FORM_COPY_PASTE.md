# Privacy — מה להדביק בכל שדה (העתק-הדבק)

כל הטקסטים מתחת ל־1,000 תווים. העתק כל בלוק לשדה המתאים בכרטיסיית Privacy.

---

## Single purpose description

```
This extension has a single purpose: to automatically save text that the user types in web forms and text areas, and to let the user restore that text with one click if the page was closed, the browser crashed, or the session expired. No data is sent to any server except optional license verification (license key only) for the paid upgrade. All saved text stays on the user's device.
```

---

## storage justification

```
The extension uses chrome.storage.local only to store: (1) the text snippets that the user has typed, so they can be restored later; (2) the user's settings (e.g. license key, checkout URL); and (3) the first-install date for the free trial. All of this data remains on the user's device. Nothing is sent to a server except an optional license verification request (license key and instance ID only) when the user activates the paid version. We do not use storage for tracking or advertising.
```

---

## activeTab justification

```
The extension needs "activeTab" to know which browser tab is currently active when the user clicks the extension icon. This is used only to: (1) display the list of saved text snippets for that tab's URL, and (2) send the restored text to that tab when the user clicks "Restore". We do not access tab content beyond inserting the restored text into the focused input or textarea.
```

---

## Host permission justification

```
The extension needs access to all URLs because it saves text that the user types in input fields and textareas on any website. The content script runs on every page only to: (1) listen for typing in input/textarea elements, (2) store that text locally on the user's device (chrome.storage.local), and (3) respond when the user chooses "Restore" by inserting text into the active field. We never collect or send the user's typed content to any server. Passwords and credit-card fields are explicitly excluded and never saved.
```

---

## Are you using remote code?

בחר: **No, I am not using Remote code**

(אם נשאר שדה Justification — השאר ריק או כתוב: N/A - no remote code used.)

---

## What user data do you plan to collect?

סמן **רק** את זה (אם מופיע):

- **Website content** — כי התוסף שומר טקסט שהמשתמש מקליד (רק מקומית במכשיר).

אל תסמן: Personally identifiable information, Health, Financial, Authentication, Personal communications, Location, Web history, User activity — כי אנחנו לא אוספים אותם.

(אם אין "Website content" או שיש ספק — סמן רק מה שבאמת מתאים; אפשר גם לא לסמן כלום אם כל הנתונים רק מקומיים והטופס מאפשר.)

---

## I certify that the following disclosures are true

סמן את **שלוש** תיבות הסימון:

1. I do not sell or transfer user data to third parties, outside of the approved use cases  
2. I do not use or transfer user data for purposes that are unrelated to my item's single purpose  
3. I do not use or transfer user data to determine creditworthiness or for lending purposes  

---

## Privacy policy URL

חובה אם אוספים נתונים. יש לך שתי אפשרויות:

**אפשרות א' — דף בפרויקט (מוכן):**  
הוספתי קובץ **landing/privacy.html** עם מדיניות פרטיות. אחרי שתעלה את תיקיית **landing** ל־GitHub Pages (או כל שרת), כתובת הדף תהיה למשל:

```
https://YOUR-USERNAME.github.io/YOUR-REPO/landing/privacy.html
```

החלף YOUR-USERNAME ו-YOUR-REPO בנתונים שלך והדבק בשדה **Privacy policy URL**.

**אפשרות ב' — בינתיים אין לך דומיין:**  
אם עדיין אין לך דף באינטרנט:

1. צור ריפו ב-GitHub עם רק הקובץ privacy.html (או העלה את כל תיקיית landing).
2. הפעל GitHub Pages מהריפו.
3. הקישור יהיה כמו: `https://username.github.io/repo-name/landing/privacy.html` — את זה תשים ב־Privacy policy URL.

אם אתה כבר host את הדף במקום אחר — שים את הקישור המלא לדף מדיניות הפרטיות (למשל `https://yoursite.com/privacy`).

---

## סיכום מה לעשות

| שדה | פעולה |
|-----|--------|
| Single purpose description | העתק מהבלוק למעלה |
| storage justification | העתק מהבלוק למעלה |
| activeTab justification | העתק מהבלוק למעלה |
| Host permission justification | העתק מהבלוק למעלה |
| Remote code | בחר **No** |
| What user data... | סמן רק Website content (אם רלוונטי) |
| שלוש ההצהרות | סמן את שלוש התיבות |
| Privacy policy URL | כתובת לדף privacy.html (למשל GitHub Pages) |
