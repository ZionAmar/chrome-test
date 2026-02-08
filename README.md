# Text Rescuer | מציל הטקסטים

Chrome extension that saves what you type. If the page closes, crashes, or session expires — restore with one click. **Works on any website.** Ready to publish to **Chrome Web Store**; available in English, Hebrew, Spanish.

- **One month free** with full Pro features, then the extension locks.
- **$5 one-time** — one click to pay; Pro unlocks forever and the money goes to you (via LemonSqueezy).

**לפרסום בחנות Chrome ולתשלום 5$ אליך:** ערוך `config.js`, פרוס את `api/` ל-Vercel, העלה לחנות — **[CHROME_STORE.md](CHROME_STORE.md)**. לחיבור דף נחיתה: **[SETUP.md](SETUP.md)**.

---

## Install (development / self-use)

1. Chrome → `chrome://extensions/`
2. Turn on **Developer mode**
3. **Load unpacked** → select this folder

---

## Usage

- **Saving:** Typing in any `input` or `textarea` is saved automatically (passwords and card fields are never saved).
- **Restore:** Click the extension icon → pick a saved text → **Restore**. If a field is focused, text is inserted; otherwise it’s copied to clipboard (Ctrl+V).
- **Settings:** Right‑click icon → Options, or from popup → Settings. Set license key (Pro), checkout URL, and license verification API URL.

---

## Project structure

```
├── manifest.json          # Manifest V3, default_locale
├── content.js             # Listens to inputs, Free/Pro limits, 24h vs 30d, trial
├── popup.html/.css/.js    # List + restore + Pro CTA, i18n
├── options.html/.css/.js  # License key, verify API URL, checkout URL, i18n
├── _locales/              # en, he, es (Chrome i18n)
├── api/verify.js          # Serverless: license verification (LemonSqueezy)
├── vercel.json            # Deploy API to Vercel
├── icons/                 # 16, 48, 128
├── landing/               # Landing page (EN/HE), pricing, install + buy links
└── README.md
```

---

## Ready to publish and get paid

### 1. Pricing (built-in)

- **Free:** Always 24h retention, 10 snippets per page.
- **Pro:** 30-day retention, 50 snippets, time machine. **First 30 days after install = free trial (full Pro).** After that, $5 one-time to unlock forever.

### 2. LemonSqueezy (recommended)

1. Sign up at [lemonsqueezy.com](https://lemonsqueezy.com).
2. Create a **Product** → “Text Rescuer Pro” → **One-time** $5.
3. Enable **License keys** for that product (Dashboard → Product → License keys).
4. Copy the **Checkout URL** (e.g. `https://yourstore.lemonsqueezy.com/checkout/...`).
5. In LemonSqueezy → **Settings → API**: create an API key and copy it.

### 3. Deploy license verification API (Vercel)

1. Copy the project (or only `api/` + `vercel.json`) to a new repo.
2. [Vercel](https://vercel.com) → Import project → deploy.
3. In Vercel → **Settings → Environment Variables** add:
   - `LEMON_SQUEEZY_API_KEY` = your LemonSqueezy API key
4. Redeploy. Your API URL will be like `https://your-app.vercel.app/api/verify`.

### 4. Configure the extension (before distributing)

- **Options** in the extension:
  - **License verification API**: `https://your-app.vercel.app/api/verify` (your real URL) → Save API URL.
  - **Checkout page URL**: paste your LemonSqueezy checkout URL → Save URL.
- When you **pack** or **publish** the extension, these URLs are stored in the user’s browser (each user can override in Options if you allow).

For **distribution**, either:
- **A)** Ship the extension with these two URLs pre-filled in the code (in options.js or a config), or  
- **B)** Tell users to open Options once and paste the two URLs (if you use one extension for many “white‑label” stores).

### 5. After a customer pays

- LemonSqueezy sends the customer an email with the **license key** (if you enabled license keys).
- Customer: **Options** → paste license key → **Verify & save**. The extension calls your `/api/verify?key=...&instance_id=...`; your API calls LemonSqueezy and returns `{ valid: true, expires_at: "..." }`. Pro is then active until expiry.

### 6. Landing page

- Upload the `landing/` folder to **GitHub Pages**, **Netlify**, or any static host.
- In `landing/index.html` set:
  - `installFree.href` → your Chrome Web Store link (or direct download).
  - `buyPro.href` → your LemonSqueezy checkout URL.
- The page has EN/HE toggle and explains Free vs Pro and the 1‑month free trial + $5 one-time.

### 7. Chrome Web Store (optional)

- Developer account (one-time fee).
- Zip the extension (no `api/`, `landing/`, `vercel.json`; only extension files + `_locales` + icons).
- Submit; after approval, set the landing “Install free” link to the store listing.

---

## Security and privacy

- **Never saved:** `type="password"`, and any field that looks like card number / CVV (by name, id, or autocomplete).
- **Stored only on device:** `chrome.storage.local`. No text is sent to your server; only license verification calls your API with key + instance_id.
- **Auto cleanup:** Entries older than 24h (Free) or 30 days (Pro) are removed.

---

## Adding more languages

- Duplicate `_locales/en/` to `_locales/xx/` (e.g. `fr`, `ar`).
- Translate `messages.json` in that folder.
- Chrome will use the folder that matches the user’s UI language.

---

## License

Use and adapt as you like. If you sell it, keep attribution and a compatible license if you prefer.
# chrome-test
# chrome-test
