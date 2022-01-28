import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const response = await tradly.app.getTenantCountries({ authKey: '' });
  res.send(response.data);
}
