import tradly from 'tradly';

const MOCK_BANNERS = {
  promo_banners: [
    { id: 1, image_path: '/placeholders/banner1.svg', placement: '', button_title: 'Shop Now', button_url: '/l' },
    { id: 2, image_path: '/placeholders/banner2.svg', placement: '', button_title: 'Explore', button_url: '/lc' },
  ],
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.getPromoBanner({
      authKey: auth_key ? auth_key : '',
      bodyParam: req.query,
    });
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send(MOCK_BANNERS);
    }
  } catch (error) {
    res.status(200).send(MOCK_BANNERS);
  }
}
