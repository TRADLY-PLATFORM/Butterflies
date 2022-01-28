import tradly from 'tradly';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { auth_key } = req.cookies;
    const response = await tradly.app.createExpressLoginLink({
      authKey:auth_key?auth_key:'',
      data: req.body.sendData,
    });
    res.send(response.data);
  }
}
