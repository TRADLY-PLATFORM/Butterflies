import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.addEditAddress({
      id: req.body.id,
      data: req.body.addressData,
      authKey: auth_key,
    });
    res.send(response.data);
  }
}
