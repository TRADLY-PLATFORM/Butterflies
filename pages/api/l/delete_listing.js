import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.deleteListing({ id:req.body.id, authKey: auth_key });
    res.send(response.data);
  }
}
 