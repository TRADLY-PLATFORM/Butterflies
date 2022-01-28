import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.createSchedule({
      id: req.body.id,
      authKey: auth_key ? auth_key : '',
      data: req.body.data,
    });
    res.send(response.data);
  }
}
