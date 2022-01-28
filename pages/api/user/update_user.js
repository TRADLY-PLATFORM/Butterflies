import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.updateUserInfo({
      id: req.body.userId,
      data: req.body.userData,
      authKey: auth_key ? auth_key : '',
    });
    res.send(response.data);
  }
}
