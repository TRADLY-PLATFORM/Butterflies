import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.followUnfollowAccounts({
      id: req.body.id,
      authKey: auth_key ? auth_key : '',
      isFollowing: req.body.isFollow,
    });
    if (!response.error) {
      res.send(response.data);
    } else {
      res.send(response);
    }
  }
}
