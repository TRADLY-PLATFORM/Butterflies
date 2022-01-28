import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.getEphemeralKey({
      authKey:auth_key,
      data: req.body.send_data,
    });
    res.send(response.data);
  }
}
