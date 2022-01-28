import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const response = await tradly.app.getPaymentMethods({
    authKey: auth_key,
  });
  res.send(response.data);
}
