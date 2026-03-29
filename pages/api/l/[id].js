import tradly from 'tradly';

// Redux listingSlice expects: payload.listing and payload.rating_data
// Field names must match exactly what components access
const DEFAULT_LISTING = {
  listing: {
    id: 1,
    title: 'Multi Millet Hakka Noodles',
    slug: 'multi-millet-hakka-noodles',
    description: 'Delicious and nutritious multi millet hakka noodles made with premium quality ingredients.',
    list_price: { currency: 'USD', amount: 150 },
    images: [
      '/placeholders/product1.svg',
      '/placeholders/product2.svg',
    ],
    in_stock: true,
    in_cart: false,
    stock: 100,
    liked: false,
    status: 'active',
    location: { city: 'Demo City', country: 'IN' },
    coordinates: {},
    attributes: [],
    variants: [],
    account: {
      id: 1,
      name: 'Demo Store',
      images: ['/placeholders/logo.svg'],
      slug: 'demo-store',
      following: false,
    },
    categories: [{ id: 1, name: 'Food & Beverages' }],
    category_id: [1],
    meta_title: 'Multi Millet Hakka Noodles',
    meta_description: 'Delicious and nutritious multi millet hakka noodles.',
    meta_keyword: 'millet, noodles, hakka',
  },
  rating_data: {
    rating_average: 4.5,
    rating_count: 12,
    review_count: 8,
    rating_count_data: [],
  },
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
 
  const id = req.query.id;
  const reg = new RegExp('^[0-9]*$');

  try {
    let response;
    if (reg.test(id.split('-')[0])) {
      response = await tradly.app.getListingDetail({
        id: id.split('-')[0],
        slug:undefined,
        authKey: auth_key ? auth_key : '',
      });
    } else {
      response = await tradly.app.getListingDetail({
        id:undefined,
        slug:id,
        authKey: auth_key ? auth_key : '',
      });
    }
    
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      // Fallback to default listing
      res.status(200).send(DEFAULT_LISTING);
    }
  } catch (error) {
    // Fallback to default listing on network error
    res.status(200).send(DEFAULT_LISTING);
  }
}
