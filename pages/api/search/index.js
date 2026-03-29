import tradly from 'tradly';

const MOCK_SEARCH_RESULTS = {
  listings: [
    { id: 1, title: 'Multi Millet Hakka Noodles', slug: 'multi-millet-hakka-noodles', list_price: { currency: 'USD', amount: 150 }, images: ['/placeholders/product1.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false, category_id: [1] },
    { id: 2, title: 'Organic Brown Rice', slug: 'organic-brown-rice', list_price: { currency: 'USD', amount: 80 }, images: ['/placeholders/product2.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false, category_id: [1] },
    { id: 3, title: 'Quinoa Salad Mix', slug: 'quinoa-salad-mix', list_price: { currency: 'USD', amount: 120 }, images: ['/placeholders/product3.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false, category_id: [2] },
    { id: 4, title: 'Chia Seeds Pack', slug: 'chia-seeds-pack', list_price: { currency: 'USD', amount: 200 }, images: ['/placeholders/product4.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false, category_id: [3] },
  ],
  page: 1,
  total_records: 4,
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.getListings({
      bodyParam: req.query,
      authKey: auth_key ? auth_key : '',
    });
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send(MOCK_SEARCH_RESULTS);
    }
  } catch (error) {
    res.status(200).send(MOCK_SEARCH_RESULTS);
  }
}
