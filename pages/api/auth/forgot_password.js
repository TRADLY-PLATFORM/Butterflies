import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.user.forgotPassword({ data: req.body.prams });
    res.send(response.data);
  }
}
