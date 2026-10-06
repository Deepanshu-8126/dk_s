// Cloudflare Pages Function: /api/articles
// Returns list of published articles for the frontend

export async function onRequestGet(context) {
  try {
    const { request } = context;
    const origin = new URL(request.url).origin;
    const res = await fetch(`${origin}/data/articles/published.json`);
    
    if (!res.ok) {
      return new Response(JSON.stringify([]), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const articles = await res.json();
    
    return new Response(JSON.stringify(articles), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}