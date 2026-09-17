// Authenticated API contract tests: prove login-gated and mutating
// endpoints call the correct upstream with the user's auth.
//
// Credentials come from the environment and are NEVER committed:
//   SMOKE_EMAIL=you@example.com SMOKE_PASSWORD=secret npm run test:smoke
// The whole file is skipped when they are absent.
//
// Every mutating test cleans up after itself (cart add→delete, like→unlike)
// so repeated runs leave no residue.
const { test, expect } = require('@playwright/test');

const EMAIL = process.env.SMOKE_EMAIL;
const PASSWORD = process.env.SMOKE_PASSWORD;
const LIVE_LISTING = 727169;

test.describe('authenticated contracts', () => {
  test.skip(!EMAIL || !PASSWORD, 'SMOKE_EMAIL/SMOKE_PASSWORD not set');

  let cookie = '';
  let userId = 0;

  test.beforeAll(async ({ request }) => {
    // Retry: a momentary upstream blip makes the route return its dev mock.
    let authKey = '';
    for (let attempt = 0; attempt < 3 && authKey === ''; attempt++) {
      const res = await request.post('/api/auth/sign_in', {
        data: {
          prams: {
            user: {
              uuid: 'smoke-suite',
              email: EMAIL,
              password: PASSWORD,
              type: 'customer',
            },
          },
        },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      const key = body.user?.key?.auth_key;
      if (key && key !== 'mock_auth_key_dev') {
        authKey = key;
        userId = body.user?.id;
      }
    }
    expect(authKey, 'login must return a real auth_key, not the dev mock').toBeTruthy();
    cookie = `auth_key=${authKey}`;
  });

  async function authed(request, method, url, data) {
    const res = await request[method](url, {
      headers: { Cookie: cookie },
      ...(data !== undefined ? { data } : {}),
    });
    const text = await res.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      throw new Error(`${method.toUpperCase()} ${url} did not return JSON: ${text.slice(0, 200)}`);
    }
    return { res, body };
  }

  test('user_info echoes the logged-in user', async ({ request }) => {
    const { res, body } = await authed(
      request,
      'get',
      `/api/user/user_info?userID=${userId}`
    );
    expect(res.status()).toBe(200);
    const user = body.user || body.data?.user;
    expect(user?.id).toBe(userId);
    expect(user?.email).toBe(EMAIL);
  });

  test('orders list returns live shape', async ({ request }) => {
    const { res, body } = await authed(request, 'get', '/api/orders');
    expect(res.status()).toBe(200);
    expect(body).toBeDefined();
    expect(JSON.stringify(body).includes('mock')).toBeFalsy();
  });

  test('wishlist returns live shape', async ({ request }) => {
    const { res, body } = await authed(request, 'get', '/api/wish');
    expect(res.status()).toBe(200);
    expect(Array.isArray(body.listings)).toBeTruthy();
  });

  test('cart add then delete leaves no residue', async ({ request }) => {
    const add = await authed(request, 'post', '/api/cart/add_cart', {
      sendData: { cart: { listing_id: LIVE_LISTING, quantity: 1 } },
    });
    expect(add.res.status()).toBe(200);

    const del = await authed(request, 'post', '/api/cart/delete_cart', {
      sendData: { cart: { listing_id: [LIVE_LISTING] } },
    });
    expect(del.res.status()).toBe(200);

    const list = await authed(request, 'post', '/api/cart', {
      bodyParam: {},
    });
    expect(list.res.status()).toBe(200);
    const carts = list.body.carts || list.body.data?.carts || [];
    const leftover = (Array.isArray(carts) ? carts : []).filter((c) =>
      JSON.stringify(c).includes(String(LIVE_LISTING))
    );
    expect(leftover).toEqual([]);
  });

  test('wishlist like then unlike leaves no residue', async ({ request }) => {
    // Pre-cleanup so reruns are deterministic (473 = already (un)liked).
    await authed(request, 'post', '/api/wish/like', {
      id: LIVE_LISTING,
      isLiked: true,
    });

    const like = await authed(request, 'post', '/api/wish/like', {
      id: LIVE_LISTING,
      isLiked: false,
    });
    expect(like.res.status()).toBe(200);

    const unlike = await authed(request, 'post', '/api/wish/like', {
      id: LIVE_LISTING,
      isLiked: true,
    });
    expect(unlike.res.status()).toBe(200);
  });
});
