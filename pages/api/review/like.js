import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.likeReview({
      authKey: auth_key ? auth_key : '',
      data: req.body.data,
      id: req.body.id,
    });
    if (!response.error) {
      res.status(200).send(response.data);
    } else {
      res.status(500).send(response.error);
    }
  }
}
