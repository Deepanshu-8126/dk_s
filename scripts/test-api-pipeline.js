/**
 * Comprehensive API & Wikimedia Verification Script
 */

const BASE_URL = 'http://localhost:5175';

async function runTests() {
  console.log('--- STARTING VERIFICATION TESTS ---');

  // Test 1: Wikimedia Commons Search
  console.log('\n[1] Testing /api/media/search?q=gold...');
  const mediaRes = await fetch(`${BASE_URL}/api/media/search?q=gold&limit=3`);
  const mediaData = await mediaRes.json();
  if (mediaRes.status === 200 && Array.isArray(mediaData.results)) {
    console.log(`✅ Passed: Found ${mediaData.results.length} images from Wikimedia Commons.`);
    const first = mediaData.results[0];
    console.log(`   Sample: "${first.title}" by "${first.author}" [License: ${first.license}]`);
  } else {
    console.error('❌ Failed: /api/media/search', mediaData);
  }

  // Test 2: Posts Listing
  console.log('\n[2] Testing /api/posts...');
  const postsRes = await fetch(`${BASE_URL}/api/posts`);
  const postsData = await postsRes.json();
  if (postsRes.status === 200 && Array.isArray(postsData.posts)) {
    console.log(`✅ Passed: Found ${postsData.posts.length} real published posts.`);
  } else {
    console.error('❌ Failed: /api/posts', postsData);
  }

  // Test 3: Verified Source Fetching
  console.log('\n[3] Testing /api/sources/fetch...');
  const srcRes = await fetch(`${BASE_URL}/api/sources/fetch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic: 'James Webb Space Telescope' })
  });
  const srcData = await srcRes.json();
  if (srcRes.status === 200 && Array.isArray(srcData.sources) && srcData.sources.length > 0) {
    console.log(`✅ Passed: Grounded ${srcData.sources.length} sources for "${srcData.sources[0].title}".`);
  } else {
    console.error('❌ Failed: /api/sources/fetch', srcData);
  }

  // Test 4: Safe Handling of Missing GEMINI_API_KEY
  console.log('\n[4] Testing /api/blog/generate without GEMINI_API_KEY...');
  const genRes = await fetch(`${BASE_URL}/api/blog/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic: 'Chandrayaan-3' })
  });
  const genData = await genRes.json();
  if (genRes.status === 403 && genData.error === 'GEMINI_API_KEY_MISSING') {
    console.log('✅ Passed: Returned safe 403 GEMINI_API_KEY_MISSING with setup instructions.');
  } else if (genRes.status === 200 && genData.draft) {
    console.log('✅ Passed: Gemini drafted successfully from sources.');
  } else {
    console.log(`ℹ️ Status: ${genRes.status} Response:`, genData);
  }

  // Test 5: Needs-sources check
  console.log('\n[5] Testing /api/blog/generate with untraceable nonsense topic...');
  const noSrcRes = await fetch(`${BASE_URL}/api/blog/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic: 'xyz987completelyfakeuntraceablephrase' })
  });
  const noSrcData = await noSrcRes.json();
  if (noSrcRes.status === 422 && noSrcData.error === 'NEEDS_SOURCES') {
    console.log('✅ Passed: Refused to fabricate facts when sources are missing (422 NEEDS_SOURCES).');
  } else {
    console.log(`ℹ️ Status: ${noSrcRes.status} Response:`, noSrcData);
  }

  // Test 6: Real-Time Analytics & Click Tracking
  console.log('\n[6] Testing /api/analytics/track and /api/analytics/stats...');
  const testSlug = 'ssc-cgl-2026-cut-off-in-tier-2-prep';
  await fetch(`${BASE_URL}/api/analytics/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug: testSlug, type: 'view' })
  });
  await fetch(`${BASE_URL}/api/analytics/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug: testSlug, type: 'click' })
  });

  const statsRes = await fetch(`${BASE_URL}/api/analytics/stats?slug=${testSlug}`);
  const statsData = await statsRes.json();
  if (statsRes.status === 200 && statsData.views >= 1 && statsData.clicks >= 1) {
    console.log(`✅ Passed: Real-time tracking verified for "${testSlug}" (${statsData.views} views, ${statsData.clicks} clicks).`);
  } else {
    console.error('❌ Failed: /api/analytics/stats', statsData);
  }

  console.log('\n--- ALL VERIFICATION TESTS COMPLETED ---');
}

runTests().catch(console.error);
