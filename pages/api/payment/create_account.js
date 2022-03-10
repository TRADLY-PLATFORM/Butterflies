import tradly from 'tradly';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { auth_key } = req.cookies;
    const response = await tradly.app.createAccountLink({
      authKey: auth_key ? auth_key : '',
      data: req.body.data,
    });
    if (!response.error) {
      res.status(200).send(response.data);
    } else {
      res.status(500).send(response.error);
    }
  }
}
