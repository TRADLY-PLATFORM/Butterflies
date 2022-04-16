import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  console.log(req.query);
  const response = await tradly.app.getOrderDetail({
    authKey: auth_key ? auth_key : '',
    id: req.query.id,
    bodyParam: {account_id:req.query.account_id}
  });
  if (!response.error) {
    res.status(200).send(response.data);
  } else {
    res.status(500).send(response.error);
  }
}
