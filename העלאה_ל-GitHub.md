# העלאה ל-GitHub — https://github.com/ZionAmar/chrome-test

## מה להריץ (בטרמינל / PowerShell בתיקיית הפרויקט)

החלף `c:\Users\amazi\Desktop\New folder` בנתיב התיקייה אצלך אם שונה.

```powershell
cd "c:\Users\amazi\Desktop\New folder"

git init
git add .
git commit -m "Text Rescuer extension + landing + privacy"

git remote remove origin
git remote add origin https://github.com/ZionAmar/chrome-test.git
git branch -M main
git push -u origin main
```

אם הריפו כבר היה מחובר (כבר עשית `git init` או `remote add` בעבר):

```powershell
cd "c:\Users\amazi\Desktop\New folder"
git add .
git commit -m "Text Rescuer extension + landing + privacy"
git push -u origin main
```

אם יבקשו התחברות — התחבר ל-GitHub (משתמש + סיסמה, או Personal Access Token).

---

## הפעלת GitHub Pages (כדי שהקישור למדיניות פרטיות יעבוד)

1. גלוש ל־ https://github.com/ZionAmar/chrome-test
2. **Settings** → בצד שמאל **Pages**
3. תחת **Source** בחר: **Deploy from a branch**
4. **Branch:** main, **Folder:** / (root) → **Save**
5. חכה דקה־שתיים. אחרי שהאתר עלה, הקישורים יעבדו.

---

## קישור למדיניות פרטיות (להדבקה בחנות Chrome)

אחרי שהעלית את הקוד והפעלת GitHub Pages:

```
https://zionamar.github.io/chrome-test/landing/privacy.html
```

בדיוק את **הקישור הזה** תשים בשדה **Privacy policy URL** בכרטיסיית Privacy בחנות Chrome.
