# Chrome Web Store — נוהלי פרטיות (Privacy practices)

העתק את הטקסטים הבאים לכרטיסייה **"Privacy practices"** / **"נוהלי פרטיות"** בדף עריכת הפריט. מלא כל שדה הצדקה והסמן את האישור על מדיניות השימוש בנתונים.

---

## 1. Single purpose description (תיאור המטרה היחידה)

**שדה: "Single purpose" / "מטרה יחידה"**

```
This extension has a single purpose: to automatically save text that the user types in web forms and text areas, and to let the user restore that text with one click if the page was closed, the browser crashed, or the session expired. No data is sent to any server except optional license verification (license key only) for the paid upgrade. All saved text stays on the user's device.
```

**בעברית (להבנה):**  
מטרה אחת: לשמור אוטומטית טקסט שהמשתמש מקליד בשדות ובטקסטareas, ולאפשר שחזור בלחיצה אם הדף נסגר או הקריס. לא נשלחים נתונים לשרת מלבד אימות רישיון (מפתח בלבד) לשדרוג בתשלום. כל הטקסט נשמר במכשיר המשתמש.

---

## 2. Justification for activeTab

**שדה: הצדקה להרשאת activeTab**

```
The extension needs "activeTab" to know which browser tab is currently active when the user clicks the extension icon. This is used only to: (1) display the list of saved text snippets for that tab's URL, and (2) send the restored text to that tab when the user clicks "Restore". We do not access tab content beyond inserting the restored text into the focused input or textarea.
```

**בעברית (להבנה):**  
נדרש activeTab כדי לדעת איזה טאב פעיל כשהמשתמש לוחץ על האייקון — רק כדי להציג את רשימת הטקסטים השמורים של הדף הזה ולשלוח את הטקסט המשוחזר לטאב בלחיצה על "שחזר". אין גישה לתוכן הטאב מלבד הכנסת הטקסט לשדה הפעיל.

---

## 3. Justification for host permission (<all_urls> / Host permission)

**שדה: הצדקה להרשאת מארח (host permission)**

```
The extension needs access to all URLs because it saves text that the user types in input fields and textareas on any website. The content script runs on every page only to: (1) listen for typing in input/textarea elements, (2) store that text locally on the user's device (chrome.storage.local), and (3) respond when the user chooses "Restore" by inserting text into the active field. We never collect or send the user's typed content to any server. Passwords and credit-card fields are explicitly excluded and never saved.
```

**בעברית (להבנה):**  
נדרש גישה לכל הכתובות כי התוסף שומר טקסט שהמשתמש מקליד בשדות בכל אתר. הסקריפט רץ בכל דף רק כדי להאזין להקלדה, לשמור טקסט מקומית במכשיר, ולהגיב ל"שחזר" בהכנסת טקסט לשדה. לא אוספים ולא שולחים תוכן לשרת. שדות סיסמה וכרטיס אשראי לא נשמרים.

---

## 4. Justification for storage

**שדה: הצדקה להרשאת storage**

```
The extension uses chrome.storage.local only to store: (1) the text snippets that the user has typed, so they can be restored later; (2) the user's settings (e.g. license key, checkout URL); and (3) the first-install date for the free trial. All of this data remains on the user's device. Nothing is sent to a server except an optional license verification request (license key and instance ID only) when the user activates the paid version. We do not use storage for tracking or advertising.
```

**בעברית (להבנה):**  
משתמשים ב-storage רק כדי לשמור: (1) קטעי הטקסט שהמשתמש הקליד לשחזור, (2) ההגדרות (מפתח רישיון, קישור רכישה), (3) תאריך ההתקנה לניסיון החינם. הכל נשאר במכשיר. לשרת נשלח רק בקשת אימות רישיון (מפתח ומזהה מופע) בהפעלת הגרסה בתשלום. לא משתמשים ב-storage למעקב או פרסום.

---

## 5. Justification for "remote code" (אם מופיע)

**שדה: הצדקה לשימוש בקוד מרחוק**

```
This extension does not load or execute any remote code. All extension code is bundled in the extension package. The only network request made by the extension is an HTTPS request to the developer's license verification API when the user enters a Pro license key; the API returns only JSON data (valid/expires_at). No script or code is fetched or executed from the network.
```

**בעברית (להבנה):**  
התוסף לא טוען ולא מריץ קוד מרחוק. כל הקוד בא מהחבילה. הבקשה היחידה לרשת היא בקשת HTTPS ל-API אימות רישיון כשהמשתמש מזין מפתח Pro; התשובה היא JSON בלבד (valid/expires_at). לא נטען ולא מורץ שום סקריפט מהרשת.

---

## 6. אישור מדיניות (Data use compliance)

**בכרטיסיית Privacy practices אמור להיות תיבת סימון:**

- סמן כי **השימוש בנתונים תואם את מדיניות תוכנית המפתחים** (שימוש בנתונים רק למטרת התוסף, ללא מכירה צד שלישי, ללא פרסום ממוקד בלי הסכמה, וכו').

---

## סיכום — מה למלא איפה

| בדף החנות | איפה | מה לעשות |
|-----------|------|----------|
| נוהלי פרטיות | Single purpose | ההעתק את הטקסט מסעיף 1 |
| נוהלי פרטיות | הצדקה ל-activeTab | סעיף 2 |
| נוהלי פרטיות | הצדקה ל-host permission | סעיף 3 |
| נוהלי פרטיות | הצדקה ל-storage | סעיף 4 |
| נוהלי פרטיות | הצדקה ל-remote code (אם קיים) | סעיף 5 |
| נוהלי פרטיות | אישור תאימות מדיניות | סמן את התיבה |
| חשבון | Contact email | הזן אימייל ליצירת קשר |
| חשבון | Verify email | לחץ על "שלח אימות" ופתח את המייל |

אחרי שמירת הטיוטה וסגירת כל הנקודות — Submit for review.
