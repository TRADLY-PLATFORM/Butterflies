/**
 * Server-side data fetching functions for use in getServerSideProps.
 * These call the Tradly API directly (with mock fallbacks) without HTTP.
 */
// @ts-nocheck
import tradly from 'tradly';

// ── Mock data (mirrors pages/api/* fallbacks) ────────────────────────────────

const MOCK_HOME = {
  collections: [
    {
      id: 1,
      title: 'Featured Products',
      scope_type: 2,
      listings: [
        { id: 1, title: 'Multi Millet Hakka Noodles', slug: 'multi-millet-hakka-noodles', list_price: { currency: 'USD', amount: 150 }, images: ['/placeholders/product1.svg'], account: { id: 1, name: 'Demo Store', images: ['/placeholders/product1.svg'] }, liked: false },
        { id: 2, title: 'Organic Brown Rice', slug: 'organic-brown-rice', list_price: { currency: 'USD', amount: 80 }, images: ['/placeholders/product2.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false },
        { id: 3, title: 'Quinoa Salad Mix', slug: 'quinoa-salad-mix', list_price: { currency: 'USD', amount: 120 }, images: ['/placeholders/product3.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false },
        { id: 4, title: 'Chia Seeds Pack', slug: 'chia-seeds-pack', list_price: { currency: 'USD', amount: 200 }, images: ['/placeholders/product4.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false },
      ],
    },
    {
      id: 2,
      title: 'New Arrivals',
      scope_type: 2,
      listings: [
        { id: 5, title: 'Amaranth Flour', slug: 'amaranth-flour', list_price: { currency: 'USD', amount: 95 }, images: ['/placeholders/product5.svg'], account: { id: 3, name: "Nature's Best", images: [] }, liked: false },
        { id: 6, title: 'Flaxseed Oil', slug: 'flaxseed-oil', list_price: { currency: 'USD', amount: 180 }, images: ['/placeholders/product6.svg'], account: { id: 3, name: "Nature's Best", images: [] }, liked: false },
        { id: 7, title: 'Buckwheat Groats', slug: 'buckwheat-groats', list_price: { currency: 'USD', amount: 110 }, images: ['/placeholders/product7.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false },
        { id: 8, title: 'Sorghum Porridge', slug: 'sorghum-porridge', list_price: { currency: 'USD', amount: 75 }, images: ['/placeholders/product8.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false },
      ],
    },
  ],
  categories: [
    { id: 1, name: 'Grains & Cereals', image: '/placeholders/product1.svg' },
    { id: 2, name: 'Superfoods', image: '/placeholders/product2.svg' },
    { id: 3, name: 'Oils & Seeds', image: '/placeholders/product3.svg' },
    { id: 4, name: 'Snacks', image: '/placeholders/product4.svg' },
  ],
  promo_banners: [
    { id: 1, image_path: '/placeholders/banner1.svg', placement: '', button_title: 'Shop Now', button_url: '/l' },
    { id: 2, image_path: '/placeholders/banner2.svg', placement: '', button_title: 'Explore', button_url: '/lc' },
  ],
};

const MOCK_LISTING = {
  listing: {
    id: 1, title: 'Multi Millet Hakka Noodles', slug: 'multi-millet-hakka-noodles',
    description: 'Delicious and nutritious multi millet hakka noodles made with premium quality ingredients.',
    list_price: { currency: 'USD', amount: 150 },
    images: ['/placeholders/product1.svg', '/placeholders/product2.svg'],
    in_stock: true, in_cart: false, stock: 100, liked: false, status: 'active',
    location: { city: 'Demo City', country: 'IN' }, coordinates: {}, attributes: [], variants: [],
    account: { id: 1, name: 'Demo Store', images: ['/placeholders/logo.svg'], slug: 'demo-store', following: false },
    categories: [{ id: 1, name: 'Food & Beverages' }], category_id: [1],
    meta_title: 'Multi Millet Hakka Noodles',
    meta_description: 'Delicious and nutritious multi millet hakka noodles.',
    meta_keyword: 'millet, noodles, hakka',
  },
  rating_data: { rating_average: 4.5, rating_count: 12, review_count: 8, rating_count_data: [] },
};

const MOCK_LISTINGS = {
  listings: [
    { id: 1, title: 'Multi Millet Hakka Noodles', slug: 'multi-millet-hakka-noodles', list_price: { currency: 'USD', amount: 150 }, images: ['/placeholders/product1.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false, category_id: [1] },
    { id: 2, title: 'Organic Brown Rice', slug: 'organic-brown-rice', list_price: { currency: 'USD', amount: 80 }, images: ['/placeholders/product2.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false, category_id: [1] },
    { id: 3, title: 'Quinoa Salad Mix', slug: 'quinoa-salad-mix', list_price: { currency: 'USD', amount: 120 }, images: ['/placeholders/product3.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false, category_id: [2] },
    { id: 4, title: 'Chia Seeds Pack', slug: 'chia-seeds-pack', list_price: { currency: 'USD', amount: 200 }, images: ['/placeholders/product4.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false, category_id: [3] },
  ],
  page: 1, total_records: 4,
};

const MOCK_ACCOUNT = {
  account: {
    id: 1, name: 'Demo Store',
    description: 'Your one-stop shop for organic and natural foods.',
    images: ['/placeholders/logo.svg'],
    location: { city: 'Demo City', country: 'IN', formatted_address: 'Demo City, IN' },
    user: { first_name: 'Demo', last_name: 'User' },
    total_followers: 42, total_listings: 8,
    categories: [{ id: 1, name: 'Grains & Cereals' }],
    following: false, rating_average: 4.5, rating_count: 12,
  },
};

// ── Data functions ───────────────────────────────────────────────────────────

export async function getHomeData() {
  try {
    const response = await tradly.app.home({ authKey: '' });
    if (!response.error && response.data) return response.data;
    return MOCK_HOME;
  } catch {
    return MOCK_HOME;
  }
}

export async function getListingDetail(id: string) {
  const reg = /^[0-9]+/;
  try {
    const isNumeric = reg.test(id.split('-')[0]);
    const response = await tradly.app.getListingDetail({
      id: isNumeric ? id.split('-')[0] : undefined,
      slug: isNumeric ? undefined : id,
      authKey: '',
    });
    if (!response.error && response.data) return response.data;
    return MOCK_LISTING;
  } catch {
    return MOCK_LISTING;
  }
}

export async function getCategoryListings(params: Record<string, string> = {}) {
  try {
    const response = await tradly.app.getListings({ bodyParam: params, authKey: '' });
    if (!response.error && response.data) return response.data;
    return MOCK_LISTINGS;
  } catch {
    return MOCK_LISTINGS;
  }
}

export async function getAccountDetail(id: string) {
  const reg = /^[0-9]+/;
  try {
    const isNumeric = reg.test(id.split('-')[0]);
    const response = await tradly.app.getAccountDetail({
      id: isNumeric ? id.split('-')[0] : undefined,
      slug: isNumeric ? undefined : id,
      authKey: '',
    });
    if (!response.error && response.data) return response.data;
    return MOCK_ACCOUNT;
  } catch {
    return MOCK_ACCOUNT;
  }
}

export async function getSearchListings(params: Record<string, string> = {}) {
  try {
    const response = await tradly.app.getListings({ bodyParam: params, authKey: '' });
    if (!response.error && response.data) return response.data;
    return MOCK_LISTINGS;
  } catch {
    return MOCK_LISTINGS;
  }
}
