import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  console.log(req.body);

  const response = await tradly.app.getListingDetail({
    id: req.query.id,
    authKey: auth_key ? auth_key : '',
  });
  res.send(response.data);
}
