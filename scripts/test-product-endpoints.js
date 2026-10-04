import { handleApiRequest } from '../server/apiRouter.js';

async function testProducts() {
  console.log('Testing /api/products/search endpoint...');
  
  let statusCode = 0;
  let headers = {};
  let body = '';
  
  const mockReq = {
    url: '/api/products/search?q=iphone&tag=testtag-21',
    headers: { host: 'localhost:5175' },
    method: 'GET',
    on: (evt, cb) => { if (evt === 'end') cb(); }
  };
  
  const mockRes = {
    setHeader: (k, v) => { headers[k] = v; },
    end: (data) => { body = data; }
  };
  
  Object.defineProperty(mockRes, 'statusCode', {
    set: (v) => { statusCode = v; },
    get: () => statusCode
  });

  await handleApiRequest(mockReq, mockRes);
  
  console.log('Response Status:', statusCode);
  const parsed = JSON.parse(body);
  console.log('Results Count:', parsed.count);
  console.log('First Product:', parsed.products[0]?.title);
  console.log('Affiliate URL:', parsed.products[0]?.affiliateUrl);
  
  if (statusCode === 200 && parsed.products[0]?.affiliateUrl?.includes('tag=testtag-21')) {
    console.log('✅ TEST PASSED: Dynamic tag injection verified!');
  } else {
    console.error('❌ TEST FAILED');
    process.exit(1);
  }
}

testProducts();
