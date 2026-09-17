// API contract tests: prove every read-only endpoint calls the correct
// upstream (api.tradly.app) endpoint and returns LIVE tenant data.
//
// Two things each case asserts:
//  1. No server crash — body is JSON (a TypeError crash returns an HTML 500).
//  2. Live passthrough — response echoes the requested resource / has live
//     shape. Many routes fall back to demo mocks on failure, so assertions
//     explicitly reject mock markers (e.g. "Demo Store") to catch
//     wrong-endpoint wiring that would otherwise hide behind a 200 + mock.
//
// Mutating routes (cart checkout, orders, payments, auth, POST-only routes)
// are intentionally NOT called live. Routes needing a logged-in user are
// asserted to return a *structured* error, never a crash.
const { test, expect } = require('@playwright/test');

const MOCK_MARKERS = [
  'Multi Millet Hakka Noodles',
  'Organic Brown Rice',
  'Demo Store',
  'Green Foods',
];

async function getJson(request, url, expectedStatus = 200) {
  const res = await request.get(url);
  expect(res.status(), `${url} status`).toBe(expectedStatus);
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`${url} did not return JSON (server crash?): ${text.slice(0, 200)}`);
  }
  return body;
}

function expectLive(body, url) {
  const text = JSON.stringify(body);
  for (const marker of MOCK_MARKERS) {
    expect(text.includes(marker), `${url} returned demo mock data`).toBeFalsy();
  }
}

test('GET /api reports connected', async ({ request }) => {
  const body = await getJson(request, '/api');
  expect(body.status).toBe('connected');
});

test('GET /api/home returns live collections', async ({ request }) => {
  const body = await getJson(request, '/api/home');
  const collections = body.collections || body.data?.collections;
  expect(Array.isArray(collections)).toBeTruthy();
  expectLive(body, '/api/home');
});

test('GET /api/categories returns live categories', async ({ request }) => {
  const body = await getJson(request, '/api/categories?parent=0&type=listings');
  const cats = body.categories || body.data?.categories;
  expect(Array.isArray(cats) && cats.length > 0).toBeTruthy();
  expectLive(body, '/api/categories');
});

test('GET /api/lc returns live categories', async ({ request }) => {
  const body = await getJson(request, '/api/lc?parent=0&type=listings');
  const cats = body.categories || body.data?.categories;
  expect(Array.isArray(cats) && cats.length > 0).toBeTruthy();
  expectLive(body, '/api/lc');
});

test('GET /api/configs/general returns live tenant branding', async ({
  request,
}) => {
  const body = await getJson(request, '/api/configs/general');
  const logo = body.configs?.web_logo || '';
  expect(logo.startsWith('http'), 'web_logo should be the live tenant logo').toBeTruthy();
});

test('GET /api/l list returns live listings', async ({ request }) => {
  const body = await getJson(request, '/api/l?page=1');
  expect(Array.isArray(body.listings) && body.listings.length > 0).toBeTruthy();
  expect(body.total_records > 0).toBeTruthy();
  expectLive(body, '/api/l');
});

test('GET /api/l/:id returns the requested listing (correct endpoint)', async ({
  request,
}) => {
  const body = await getJson(request, '/api/l/727169');
  expect(body.listing?.id, 'should echo the requested id').toBe(727169);
  expectLive(body, '/api/l/727169');
});

test('GET /api/l/similar returns live similar listings', async ({
  request,
}) => {
  const body = await getJson(request, '/api/l/similar?id=727169&page=1');
  expect(Array.isArray(body.listings)).toBeTruthy();
  expectLive(body, '/api/l/similar');
});

test('GET /api/search returns live results', async ({ request }) => {
  const body = await getJson(request, '/api/search?search=rice&page=1');
  expect(Array.isArray(body.listings)).toBeTruthy();
  expectLive(body, '/api/search');
});

test('GET /api/banners returns live banners', async ({ request }) => {
  const body = await getJson(request, '/api/banners');
  expect(body).toBeDefined();
  expectLive(body, '/api/banners');
});

test('GET /api/countries returns live tenant countries', async ({
  request,
}) => {
  const body = await getJson(request, '/api/countries');
  expect(body).toBeDefined();
  expectLive(body, '/api/countries');
});

test('GET /api/currencies returns live currencies', async ({ request }) => {
  const body = await getJson(request, '/api/currencies');
  expect(body).toBeDefined();
  expectLive(body, '/api/currencies');
});

test('GET /api/attributes returns live attributes', async ({ request }) => {
  const body = await getJson(request, '/api/attributes');
  expect(body).toBeDefined();
  expectLive(body, '/api/attributes');
});

test('GET /api/shipping_method returns live methods', async ({ request }) => {
  const body = await getJson(request, '/api/shipping_method');
  expect(body).toBeDefined();
  expectLive(body, '/api/shipping_method');
});

test('GET /api/payment/payment_method returns live methods', async ({
  request,
}) => {
  const body = await getJson(request, '/api/payment/payment_method');
  expect(body).toBeDefined();
  expectLive(body, '/api/payment/payment_method');
});

test('GET /api/a/:id returns the requested account (correct endpoint)', async ({
  request,
}) => {
  const body = await getJson(request, '/api/a/21504');
  const account = body.account || body.data?.account;
  expect(account?.id, 'should echo the requested account id').toBe(21504);
  expectLive(body, '/api/a/21504');
});

test('GET /api/activities without login returns structured error, no crash', async ({
  request,
}) => {
  const res = await request.get('/api/activities?page=1');
  expect([200, 500, 502].includes(res.status())).toBeTruthy();
  const text = await res.text();
  expect(
    (() => {
      try {
        JSON.parse(text);
        return true;
      } catch {
        return false;
      }
    })(),
    '/api/activities must return JSON, never an HTML crash page'
  ).toBeTruthy();
});

test('GET /api/user/user_info without login returns structured error, no crash', async ({
  request,
}) => {
  const res = await request.get('/api/user/user_info');
  expect([200, 401, 500, 502].includes(res.status())).toBeTruthy();
  const text = await res.text();
  expect(text.startsWith('<'), 'must not be an HTML crash page').toBeFalsy();
});

test('GET /api/orders without login returns structured error, no crash', async ({
  request,
}) => {
  const res = await request.get('/api/orders');
  expect([200, 401, 500, 502].includes(res.status())).toBeTruthy();
  const text = await res.text();
  expect(text.startsWith('<'), 'must not be an HTML crash page').toBeFalsy();
});

test('GET /api/cart is rejected with 405 (POST-only route)', async ({
  request,
}) => {
  const body = await getJson(request, '/api/cart', 405);
  expect(body.error?.message).toMatch(/method not allowed/i);
});
