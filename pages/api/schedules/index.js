import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.getSchedule({
      id: req.body.id,
      bodyParam: req.body.bodyParam,
      authKey: auth_key ? auth_key : '',
    });
    if (!response.error) {
      res.send(response.data);
    } else {
      res.send(response);
    }
  }
}
