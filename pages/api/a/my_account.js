import tradly from 'tradly';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { auth_key } = req.cookies;
    const response = await tradly.app.getAccounts({
      bodyParam: req.query,
      authKey: auth_key ? auth_key : '',
    });
    if (!response.error) {
      res.send(response.data);
    } else {
      res.send(response);
    }
  } else if (req.method === 'POST') {
    const { auth_key } = req.cookies;
    const response = await tradly.app.postAccounts({
      id: req.body.id,
      authKey: auth_key ? auth_key : '',
      data: req.body.prams,
    });
    if (!response.error) {
      res.send(response.data);
    } else {
      res.send(response);
    }
  }
}
