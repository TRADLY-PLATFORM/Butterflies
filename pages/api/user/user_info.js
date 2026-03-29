import tradly from 'tradly';

const MOCK_USER = { user: { id: 1, first_name: 'Demo', last_name: 'User', email: 'user@example.com', profile_pic: null } };

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.commonFuntion({ path: `/v1/users/${req.query.userID}`, bodyParam: '', Method: 'GET', authKey: auth_key ? auth_key : '' });
    if (!response.error && response.data) { res.status(200).send(response.data); }
    else { res.status(200).send(MOCK_USER); }
  } catch { res.status(200).send(MOCK_USER); }
}
