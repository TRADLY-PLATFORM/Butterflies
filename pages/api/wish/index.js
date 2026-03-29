import tradly from 'tradly';

const MOCK_WISHLIST = {
  listings: [],
  page: 1,
  total_records: 0,
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.getMyListingsLikes({
      bodyParam: req.query,
      authKey: auth_key ? auth_key : '',
    });
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send(MOCK_WISHLIST);
    }
  } catch (error) {
    res.status(200).send(MOCK_WISHLIST);
  }
}
