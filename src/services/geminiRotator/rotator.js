/**
 * Gemini Free Key Rotation & Auto-Failover Engine
 * 
 * Supports rotating multiple free Gemini API keys (e.g. GEMINI_KEY_1, GEMINI_KEY_2)
 * to bypass the 15 req/min RPM limit while staying 100% on the free tier.
 */

export class GeminiKeyRotator {
  constructor(keys = []) {
    // Collect from parameters or environment
    const envKeys = [
      process?.env?.VITE_GEMINI_API_KEY,
      process?.env?.GEMINI_API_KEY_1,
      process?.env?.GEMINI_API_KEY_2,
      process?.env?.GEMINI_API_KEY_3,
    ].filter(Boolean);

    this.keys = keys.length > 0 ? keys : (envKeys.length > 0 ? envKeys : ['DEMO_FREE_KEY']);
    this.currentIndex = 0;
    this.keyFailures = new Map();
  }

  getActiveKey() {
    return this.keys[this.currentIndex];
  }

  rotateKey(reason = 'Rate limit or quota') {
    const prevKey = this.getActiveKey();
    const failures = (this.keyFailures.get(prevKey) || 0) + 1;
    this.keyFailures.set(prevKey, failures);

    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    const nextKey = this.getActiveKey();
    console.warn(`[Gemini Rotator] Rotated from key ${this.currentIndex === 0 ? this.keys.length : this.currentIndex} to ${(this.currentIndex + 1)} (${reason})`);
    return nextKey;
  }

  async generateContent(prompt, systemInstruction = '', model = 'gemini-2.5-flash') {
    let attempts = 0;
    const maxAttempts = Math.min(this.keys.length * 2, 6);

    while (attempts < maxAttempts) {
      attempts++;
      const apiKey = this.getActiveKey();
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      try {
        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
        };
        if (systemInstruction) {
          payload.systemInstruction = { parts: [{ text: systemInstruction }] };
        }

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.status === 429 || res.status === 403) {
          this.rotateKey(`HTTP ${res.status}`);
          continue;
        }

        if (!res.ok) {
          throw new Error(`Gemini API error: HTTP ${res.status}`);
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return { success: true, text, model, keyIndex: this.currentIndex };
      } catch (err) {
        if (attempts >= maxAttempts) {
          return { success: false, error: err.message };
        }
        this.rotateKey(err.message);
      }
    }

    return { success: false, error: 'All rotated Gemini keys exhausted.' };
  }
}
