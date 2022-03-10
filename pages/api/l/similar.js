import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const response = await tradly.app.commonFuntion({
    path: `/products/v1/listings/${req?.query.id}/similar`,
    bodyParam: req.query,
    authKey: auth_key,
    Method: 'GET',
  });
  if (!response.error) {
    res.status(200).send(response.data);
  } else {
    res.status(500).send(response.error);
  }
}
