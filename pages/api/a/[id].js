import tradly from 'tradly';

const MOCK_ACCOUNT = {
  account: {
    id: 1,
    name: 'Demo Store',
    description: 'Your one-stop shop for organic and natural foods.',
    images: ['/placeholders/logo.svg'],
    location: { city: 'Demo City', country: 'IN', formatted_address: 'Demo City, IN' },
    user: { first_name: 'Demo', last_name: 'User' },
    total_followers: 42,
    total_listings: 8,
    categories: [{ id: 1, name: 'Grains & Cereals' }],
    following: false,
    rating_average: 4.5,
    rating_count: 12,
  },
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const id = req.query.id;
  const reg = new RegExp('^[0-9]*$');

  try {
    const isNumeric = reg.test(id.split('-')[0]);
    const response = await tradly.app.getAccountDetail({
      id: isNumeric ? id.split('-')[0] : undefined,
      slug: isNumeric ? undefined : id,
      authKey: auth_key ? auth_key : '',
    });
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send(MOCK_ACCOUNT);
    }
  } catch (error) {
    res.status(200).send(MOCK_ACCOUNT);
  }
}

 