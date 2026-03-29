import tradly from 'tradly';

const MOCK_CATEGORIES = {
  categories: [
    { id: 1, name: 'Grains & Cereals', slug: 'grains-cereals', image: '/placeholders/product1.svg', listing_count: 12 },
    { id: 2, name: 'Superfoods', slug: 'superfoods', image: '/placeholders/product2.svg', listing_count: 8 },
    { id: 3, name: 'Oils & Seeds', slug: 'oils-seeds', image: '/placeholders/product3.svg', listing_count: 15 },
    { id: 4, name: 'Snacks', slug: 'snacks', image: '/placeholders/product4.svg', listing_count: 6 },
    { id: 5, name: 'Beverages', slug: 'beverages', image: '/placeholders/product5.svg', listing_count: 9 },
    { id: 6, name: 'Spices & Herbs', slug: 'spices-herbs', image: '/placeholders/product6.svg', listing_count: 20 },
  ],
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.getCategory({
      bodyParam: req.query,
      authKey: auth_key ? auth_key : '',
    });
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send(MOCK_CATEGORIES);
    }
  } catch {
    res.status(200).send(MOCK_CATEGORIES);
  }
}
