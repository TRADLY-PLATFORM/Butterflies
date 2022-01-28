import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.likeListing({
      id: req.body.id,
      authKey: auth_key ? auth_key : '',
      isLiked: req.body.isLiked,
    });
    res.send(response.data);
  }
}
