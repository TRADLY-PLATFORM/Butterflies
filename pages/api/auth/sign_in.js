import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.user.login({ data: req.body.prams });
    if (!response.error) {
      res.send(response.data);
    } else {
      res.send(response);
    }
  }
}
