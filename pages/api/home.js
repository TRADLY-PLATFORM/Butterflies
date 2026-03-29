import tradly from 'tradly';
import { TYPE_CONSTANT } from '../../constant/Web_constant';

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

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.home({ authKey: auth_key ? auth_key : '' });
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send(MOCK_HOME);
    }
  } catch (error) {
    res.status(200).send(MOCK_HOME);
  }
}
