/**
 * IndexNow Fast Indexing API Utility
 * 
 * Allows instant 1-click notification to Bing, Yandex, and partner search engines
 * when new gold prices, gaming deals, or sarkari results are published.
 */

const HOST = 'uniquedigit.in';

export async function submitToIndexNow(urlList = ['https://uniquedigit.in/']) {
  const apiKey = import.meta.env?.VITE_INDEXNOW_KEY || 'uniquedigit-indexnow-key-2026';
  
  const payload = {
    host: HOST,
    key: apiKey,
    keyLocation: `https://${HOST}/${apiKey}.txt`,
    urlList: Array.isArray(urlList) ? urlList : [urlList],
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      console.log('[IndexNow] URLs submitted successfully:', urlList.length);
      return { success: true, count: urlList.length };
    } else {
      console.warn('[IndexNow] Submission returned status:', res.status);
      return { success: false, status: res.status };
    }
  } catch (err) {
    console.warn('[IndexNow] Submission error:', err?.message);
    return { success: false, error: err?.message };
  }
}
