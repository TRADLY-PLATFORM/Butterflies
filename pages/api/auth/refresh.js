import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const key = req.body.key;
    const response = await tradly.init.refreshAPI(key);
    res.send(response.data);
  }
}
