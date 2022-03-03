import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.user.setPassword({ data: req.body.users });
    if (!response.error) {
      res.send(response.data);
    } else {
      res.send(response);
    }
  }
}