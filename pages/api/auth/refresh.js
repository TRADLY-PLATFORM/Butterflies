import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const key = req.body.key;
    if (key) {
      const response = await tradly.init.refreshAPI(key);

      if (!response.error) {
        res.send(response.data);
      } else {
        res.send(response);
      }
    } else {
      res.status(500).send({ error: 'unauthorized' });
    }
  }
}
