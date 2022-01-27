import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const response = await tradly.app.commonFuntion({
    path: `/v1/accounts/${req.query.id}`,
    bodyParam: '',
    authKey: auth_key,
    Method: 'Get',
  });
  res.send(response.data);
}
