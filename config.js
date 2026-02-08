/**
 * Text Rescuer — קובץ הגדרה אחד: חנות Chrome + תשלום 5$ בלחיצה
 * ערוך את הכתובות לפני העלאה לחנות Chrome. הכסף מהתשלום יגיע אליך (LemonSqueezy).
 *
 * 1) LANDING_URL = דף הנחיתה (או קישור לתוסף בחנות Chrome)
 * 2) CHECKOUT_URL = קישור LemonSqueezy לרכישה חד־פעמית 5$ (Products → One-time $5 → Copy checkout URL)
 * 3) VERIFY_API_URL = כתובת אימות רישיון (פריסת api/verify ב-Vercel)
 */
var TEXTRESCUER_CONFIG = {
  LANDING_URL: 'https://chrome.google.com/webstore',  // אחרי פרסום: החלף לקישור התוסף שלך
  CHECKOUT_URL: 'https://YOUR-STORE.lemonsqueezy.com/checkout/...',  // 5$ חד־פעמי
  VERIFY_API_URL: 'https://YOUR-APP.vercel.app/api/verify'
};
