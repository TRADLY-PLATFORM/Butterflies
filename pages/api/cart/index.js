import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await await tradly.app.getCarts({
      authKey: auth_key ? auth_key : '',
      bodyParam: req.body.bodyParam,
      currency: req.body.currency,
    });
    if (!response.error) {
      res.send(response.data);
    } else {
      res.send(response);
    }
  }
}
