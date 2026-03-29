import tradly from 'tradly';

const MOCK_LISTINGS = {
  listings: [
    { id: 1, title: 'Multi Millet Hakka Noodles', slug: 'multi-millet-hakka-noodles', list_price: { currency: 'USD', amount: 150 }, images: ['/placeholders/product1.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false, category_id: [1] },
    { id: 2, title: 'Organic Brown Rice', slug: 'organic-brown-rice', list_price: { currency: 'USD', amount: 80 }, images: ['/placeholders/product2.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false, category_id: [1] },
    { id: 3, title: 'Quinoa Salad Mix', slug: 'quinoa-salad-mix', list_price: { currency: 'USD', amount: 120 }, images: ['/placeholders/product3.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false, category_id: [2] },
    { id: 4, title: 'Chia Seeds Pack', slug: 'chia-seeds-pack', list_price: { currency: 'USD', amount: 200 }, images: ['/placeholders/product4.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false, category_id: [3] },
    { id: 5, title: 'Amaranth Flour', slug: 'amaranth-flour', list_price: { currency: 'USD', amount: 95 }, images: ['/placeholders/product5.svg'], account: { id: 3, name: "Nature's Best", images: [] }, liked: false, category_id: [1] },
    { id: 6, title: 'Flaxseed Oil', slug: 'flaxseed-oil', list_price: { currency: 'USD', amount: 180 }, images: ['/placeholders/product6.svg'], account: { id: 3, name: "Nature's Best", images: [] }, liked: false, category_id: [3] },
    { id: 7, title: 'Buckwheat Groats', slug: 'buckwheat-groats', list_price: { currency: 'USD', amount: 110 }, images: ['/placeholders/product7.svg'], account: { id: 1, name: 'Demo Store', images: [] }, liked: false, category_id: [1] },
    { id: 8, title: 'Sorghum Porridge', slug: 'sorghum-porridge', list_price: { currency: 'USD', amount: 75 }, images: ['/placeholders/product8.svg'], account: { id: 2, name: 'Green Foods', images: [] }, liked: false, category_id: [2] },
  ],
  page: 1,
  total_records: 8,
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
      res.status(200).send(MOCK_LISTINGS);
    }
  } catch (error) {
    res.status(200).send(MOCK_LISTINGS);
  }
}
