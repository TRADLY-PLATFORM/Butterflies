import tradly from 'tradly';
import { ensureTradlyServerConfig } from '../../../lib/tradlyServer';

export default async function handler(req, res) {
  ensureTradlyServerConfig();
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.deleteFromCart({
      authKey: auth_key ? auth_key : '',
      data: req.body.sendData,
    });
    if (response && !response.error) {
      res.status(200).send(response.data ?? {});
    } else {
      res.status(500).send(response?.error ?? { message: 'Upstream service unavailable' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send({ error: { message: 'Method not allowed' } });
  }
}
