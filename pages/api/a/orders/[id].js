import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const response = await tradly.app.getOrderDetail({
    authKey:auth_key,
    id:req.query.id,
    bodyParam:req.query.body_params,
  });
  res.send(response.data);
}
