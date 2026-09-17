// Page crash / console-error smoke tests.
//
// Each test loads a page, waits for network idle, then asserts:
//  - no "Application error" boundary text
//  - no pageerror (uncaught exception)
//  - no console.error
//
// Routes with known environment-dependent issues (/payment needs a live
// Stripe key, /wishlist redirects logged-out users) are covered separately
// with explicit allowlists instead of the strict zero-error rule.
const { test, expect } = require('@playwright/test');

async function collectErrors(page) {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${String(err)}`));
  return errors;
}

async function expectCleanPage(page, url) {
  const errors = await collectErrors(page);
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  expect(response.ok(), `${url} should return 2xx/3xx`).toBeTruthy();
  await page.waitForTimeout(3000);
  const body = await page.locator('body').innerText();
  expect(
    body.includes('Application error'),
    `${url} should not show the error boundary`
  ).toBeFalsy();
  expect(errors, `${url} console/page errors:\n${errors.join('\n')}`).toEqual(
    []
  );
}

test('homepage renders with zero console errors', async ({ page }) => {
  await expectCleanPage(page, '/');
});

test('listing page renders with zero console errors', async ({ page }) => {
  // Real listing id from the live tenant.
  await expectCleanPage(page, '/l/727169');
});

test('sign-in renders with zero console errors', async ({ page }) => {
  await expectCleanPage(page, '/sign-in');
});

test('checkout renders with zero console errors', async ({ page }) => {
  await expectCleanPage(page, '/checkout');
});

test('unknown listing slug returns the 404 page', async ({ page }) => {
  const response = await page.goto('/l/does-not-exist-xyz', {
    waitUntil: 'domcontentloaded',
  });
  expect(response.status()).toBe(404);
});

test('listing API returns 404 JSON for unknown slugs', async ({
  request,
}) => {
  const res = await request.get('/api/l/does-not-exist-xyz');
  expect(res.status()).toBe(404);
  const body = await res.json();
  expect(body.error.message).toMatch(/not found/i);
});

test('reviews API returns real data for a live listing', async ({
  request,
}) => {
  const res = await request.get(
    '/api/review/get_reviews?type=listings&id=727169&page=1'
  );
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toHaveProperty('reviews');
});
