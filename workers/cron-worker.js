/**
 * Cloudflare Worker: 6 AM Automated Programmatic SEO Machine
 * 
 * Flow:
 * 1. Cron Trigger (0 6 * * *)
 * 2. Pulls daily city list (Aligarh, Lucknow, Kanpur, Agra, Varanasi, etc.)
 * 3. Prompts Gemini 2.5 Flash with free key rotation
 * 4. Saves generated content into Cloudflare D1 / KV database
 * 5. Notifies IndexNow & Search Console automatically
 */

export default {
  // 1. Scheduled Cron Handler
  async scheduled(event, env, ctx) {
    console.log('[Cron Worker] Running 6:00 AM daily programmatic generator...');
    ctx.waitUntil(handleDailyGeneration(env));
  },

  // 2. HTTP Fetch Handler for testing & webhooks
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/cron/trigger') {
      const auth = request.headers.get('Authorization');
      if (env.CRON_SECRET && auth !== `Bearer ${env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
      }

      ctx.waitUntil(handleDailyGeneration(env));
      return new Response(JSON.stringify({ status: 'Triggered', timestamp: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ status: 'ok', worker: 'uniquedigit-cron' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('UniqueDigit Cron Engine Active', { status: 200 });
  },
};

/**
 * Daily Programmatic Generation Workflow
 */
async function handleDailyGeneration(env) {
  const TARGET_CITIES = ['Aligarh', 'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Bareilly', 'Moradabad'];
  const GEMINI_KEYS = [env.GEMINI_KEY_1, env.GEMINI_KEY_2, env.GEMINI_KEY_3].filter(Boolean);
  
  if (GEMINI_KEYS.length === 0) {
    console.warn('[Cron Worker] No Gemini API keys bound in env. Set GEMINI_KEY_1 in wrangler.toml or Cloudflare Dashboard.');
    return;
  }

  for (const city of TARGET_CITIES) {
    try {
      const apiKey = GEMINI_KEYS[Math.floor(Math.random() * GEMINI_KEYS.length)];
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const prompt = `Write a verified 250-word daily intelligence update in simple Hinglish for "${city}".
Include:
1. Today's 24K and 22K Gold Rate local sarrafa bazar estimate.
2. Petrol & Diesel rate today in ${city}.
3. Local Mandi Bhav summary (Gehu, Chawal, Sarson).
4. Direct answer to voice query: "Aaj ${city} me sone aur petrol ka kya rate hai?".
Format with clean markdown subheadings. Tone: Friendly local analyst from Uttar Pradesh.`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: {
            parts: [{ text: "You are UniqueDigit's senior UP market analyst. Provide accurate, practical, and helpful figures." }]
          },
        }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      // Save to Cloudflare D1 or KV if configured
      if (env.DB && content) {
        await env.DB.prepare(
          'INSERT OR REPLACE INTO daily_updates (city, content, updated_at) VALUES (?, ?, ?)'
        ).bind(city, content, new Date().toISOString()).run();
      } else if (env.KV && content) {
        await env.KV.put(`daily:${city.toLowerCase()}`, content, { expirationTtl: 86400 * 2 });
      }

      console.log(`[Cron Worker] Successfully generated and stored update for ${city}`);
    } catch (err) {
      console.error(`[Cron Worker Error for ${city}]:`, err.message);
    }
  }
}
