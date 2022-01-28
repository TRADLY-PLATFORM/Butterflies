import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.getPaymentIntentKey({
      authKey:auth_key,
      data: req.body.sendData,
    });
    res.send(response.data);
  }
}
