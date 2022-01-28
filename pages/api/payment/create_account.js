import tradly from 'tradly';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { auth_key } = req.cookies;
    const response = await tradly.app.createAccountLink({
      authKey: auth_key,
      data: req.body.data,
    });
    res.send(response.data);
  }
}
