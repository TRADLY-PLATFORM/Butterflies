import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const response = await tradly.app.getOrderDetail({
    authKey: auth_key,
    id: req.query.id,
  });
  res.send(response.data);
}
