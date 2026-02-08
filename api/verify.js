/**
 * License verification for Text Rescuer Pro.
 * Deploy to Vercel: add LEMON_SQUEEZY_API_KEY in env (from LemonSqueezy Dashboard → Settings → API).
 * GET /api/verify?key=LICENSE_KEY&instance_id=INSTANCE_ID
 * Returns: { "valid": true, "expires_at": "..." or null } or { "valid": false }
 */

const LEMON_VALIDATE = 'https://api.lemonsqueezy.com/v1/licenses/validate';

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' } });
    }
    if (request.method !== 'GET') {
      return jsonResponse({ valid: false }, 405);
    }
    const url = new URL(request.url);
    const licenseKey = (url.searchParams.get('key') || '').trim();
    const instanceId = (url.searchParams.get('instance_id') || '').trim();
    if (!licenseKey) {
      return jsonResponse({ valid: false }, 400);
    }
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    if (!apiKey) {
      console.error('LEMON_SQUEEZY_API_KEY not set');
      return jsonResponse({ valid: false }, 500);
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
      return jsonResponse({ valid, expires_at: expiresAt });
    } catch (e) {
      console.error(e);
      return jsonResponse({ valid: false }, 500);
    }
  }
};
