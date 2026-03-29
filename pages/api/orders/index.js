import tradly from 'tradly';

const MOCK_ORDERS = {
  orders: [],
  page: 1,
  total_records: 0,
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.getOrders({
      authKey: auth_key ? auth_key : '',
      bodyParam: req.query,
    });
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send(MOCK_ORDERS);
    }
  } catch (error) {
    res.status(200).send(MOCK_ORDERS);
  }
}
