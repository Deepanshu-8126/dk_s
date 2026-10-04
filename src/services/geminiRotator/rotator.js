/**
 * Client-Side Blog API Client
 * Securely communicates with server-side endpoints without exposing GEMINI_API_KEY to browser code.
 */

export class BlogApiClient {
  static async getPosts() {
    const res = await fetch('/api/posts');
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    return await res.json();
  }

  static async getDrafts() {
    const res = await fetch('/api/drafts');
    if (!res.ok) throw new Error(`Failed to fetch drafts: ${res.status}`);
    return await res.json();
  }

  static async searchMedia(query, limit = 12) {
    const res = await fetch(`/api/media/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    if (!res.ok) throw new Error(`Failed to search media: ${res.status}`);
    return await res.json();
  }

  static async fetchSources(topic, sources = []) {
    const res = await fetch('/api/sources/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, sources })
    });
    if (!res.ok) throw new Error(`Failed to fetch sources: ${res.status}`);
    return await res.json();
  }

  static async generateDraft({ topic, sources, image }) {
    const res = await fetch('/api/blog/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, sources, image })
    });
    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.message || 'Generation failed');
      err.code = data.error;
      err.setupHelp = data.setupHelp;
      throw err;
    }
    return data;
  }

  static async publishDraft(draftId) {
    const res = await fetch('/api/blog/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Publishing failed');
    return data;
  }
}
