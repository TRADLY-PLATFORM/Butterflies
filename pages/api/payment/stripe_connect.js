import tradly from 'tradly';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { auth_key } = req.cookies;
    const response = await tradly.app.getStripeConnectAccount({
      authKey: auth_key ? auth_key : '',
      id: req.body.id,
    });
    res.send(response.data);
  }
}
