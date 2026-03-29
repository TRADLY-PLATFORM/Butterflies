import tradly from 'tradly';

const MOCK_CURRENCIES = {
  currencies: [{ id: 1, name: 'US Dollar', code: 'USD', symbol: '$', exchange_rate: 1 }],
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.getCurrency({ authKey: auth_key ? auth_key : '' });
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send(MOCK_CURRENCIES);
    }
  } catch (error) {
    res.status(200).send(MOCK_CURRENCIES);
  }
}
