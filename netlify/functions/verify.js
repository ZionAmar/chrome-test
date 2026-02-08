/**
 * License verification for Text Rescuer Pro (Netlify Function).
 * In Netlify: Site settings → Environment variables → LEMON_SQUEEZY_API_KEY
 * URL: https://YOUR-SITE.netlify.app/.netlify/functions/verify?key=...&instance_id=...
 */

const LEMON_VALIDATE = 'https://api.lemonsqueezy.com/v1/licenses/validate';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ valid: false }) };
  }
  const q = event.queryStringParameters || {};
  const licenseKey = (q.key || '').trim();
  const instanceId = (q.instance_id || '').trim();
  if (!licenseKey) {
    return { statusCode: 400, headers, body: JSON.stringify({ valid: false }) };
  }
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  if (!apiKey) {
    console.error('LEMON_SQUEEZY_API_KEY not set');
    return { statusCode: 500, headers, body: JSON.stringify({ valid: false }) };
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
    return { statusCode: 200, headers, body: JSON.stringify({ valid, expires_at: expiresAt }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, headers, body: JSON.stringify({ valid: false }) };
  }
};
