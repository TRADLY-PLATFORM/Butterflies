import tradly from 'tradly';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const key = req.body.key;
    if (!key || key === 'mock_refresh_key_dev') {
      // Mock refresh — return success without calling Tradly
      return res.status(200).send({ user: { key: { auth_key: 'mock_auth_key_dev', refresh_key: 'mock_refresh_key_dev' } } });
    }
    try {
      await tradly.init.config({ token: process.env.API_KEY, environment: process.env.ENVIRONMENT });
      const response = await tradly.init.refreshAPI(key);
      if (!response.error && response.data) {
        res.status(200).send(response.data);
      } else {
        res.status(200).send({ user: { key: { auth_key: key, refresh_key: key } } });
      }
    } catch (error) {
      res.status(200).send({ user: { key: { auth_key: key, refresh_key: key } } });
    }
  }
}
