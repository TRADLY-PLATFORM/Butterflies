import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const response = await tradly.app.getPromoBanner({
    authKey: auth_key ? auth_key : '',
    bodyParam: req.query,
  });
  if (!response.error) {
    res.send(response.data);
  } else {
    res.send(response);
  }
}
