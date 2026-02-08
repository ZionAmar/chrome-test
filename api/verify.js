/**
 * License verification for Text Rescuer Pro.
 * Deploy to Vercel: add LEMON_SQUEEZY_API_KEY in env (from LemonSqueezy Dashboard → Settings → API).
 * GET /api/verify?key=LICENSE_KEY&instance_id=INSTANCE_ID
 * Returns: { "valid": true, "expires_at": "..." or null for one-time } or { "valid": false }
 */

const LEMON_VALIDATE = 'https://api.lemonsqueezy.com/v1/licenses/validate';

function getQuery(req) {
  const q = req.url && req.url.indexOf('?') !== -1 ? req.url.split('?')[1] : '';
  const out = {};
  q.split('&').forEach(function (part) {
    const [k, v] = part.split('=');
    if (k && v) out[k] = decodeURIComponent(v.replace(/\+/g, ' '));
  });
  return out;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'GET') {
    res.status(405).json({ valid: false });
    return;
  }
  const q = getQuery(req);
  const licenseKey = (q.key || '').trim();
  const instanceId = (q.instance_id || '').trim();
  if (!licenseKey) {
    res.status(400).json({ valid: false });
    return;
  }
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  if (!apiKey) {
    console.error('LEMON_SQUEEZY_API_KEY not set');
    res.status(500).json({ valid: false });
    return;
  }
  const body = new URLSearchParams();
  body.append('license_key', licenseKey);
  if (instanceId) body.append('instance_id', instanceId);
  try {
    const r = await fetch(LEMON_VALIDATE, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + apiKey
      },
      body: body.toString()
    });
    const data = await r.json();
    const valid = !!(data && data.valid);
    const expiresAt = (data && data.license_key && data.license_key.expires_at) ? data.license_key.expires_at : null;
    res.status(200).json({ valid: valid, expires_at: expiresAt });
  } catch (e) {
    console.error(e);
    res.status(500).json({ valid: false });
  }
}
