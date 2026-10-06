// Cloudflare Pages Function: /go/:slug Instant Affiliate Cloaking Redirect Engine
// Converts clean URLs (e.g. /go/iphone16pro, /go/rtx4070super) into official Amazon.in associate links.

const SLUG_MAPPINGS = {
  'iphone16pro': 'Apple iPhone 16 Pro 128 GB Desert Titanium',
  'iphone16': 'Apple iPhone 16 Pro',
  's24ultra': 'Samsung Galaxy S24 Ultra 5G Titanium Gray 256GB',
  's24': 'Samsung Galaxy S24 Ultra',
  'oneplus12': 'OnePlus 12 5G Silky Black 16GB RAM 512GB',
  'rtx4070super': 'ZOTAC Gaming GeForce RTX 4070 Super Twin Edge 12GB',
  'rtx4070': 'GeForce RTX 4070 Super 12GB',
  'ryzen7600': 'AMD Ryzen 5 7600 Desktop Processor AM5',
  'ryzen': 'AMD Ryzen 5 7600',
  'sony1000xm5': 'Sony WH 1000XM5 Wireless Noise Cancelling Headphones Black',
  'sonyxm5': 'Sony WH-1000XM5 Headphones',
  'macbookm3': 'Apple 2024 MacBook Air 13 inch M3 chip 16GB 256GB',
  'macbookair': 'Apple MacBook Air M3',
  'pcbuild': 'gaming pc rtx 4070 super build components',
  'gamingpc': 'gaming pc rtx 4070 super build components',
};

export async function onRequestGet(context) {
  const { params, request, env } = context;
  const slug = (params.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  const url = new URL(request.url);

  const defaultTag = env.AMAZON_TAG || 'uniquedigi0c6-21';
  const customTag = url.searchParams.get('tag') || defaultTag;

  const searchQuery = SLUG_MAPPINGS[slug] || slug.replace(/-/g, ' ');
  const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}&tag=${encodeURIComponent(customTag)}&linkCode=ll2&language=en_IN&ref_=as_li_ss_tl`;

  return new Response(null, {
    status: 302,
    headers: {
      'Location': amazonUrl,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
