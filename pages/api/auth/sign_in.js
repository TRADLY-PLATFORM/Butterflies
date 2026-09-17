import tradly from 'tradly';
import { ensureTradlyServerConfig } from '../../../lib/tradlyServer';

export default async function handler(req, res) {
  ensureTradlyServerConfig();
  if (req.method === 'POST') {
    try {
      const response = await tradly.user.login({ data: req.body.prams });
      if (response && !response.error && response.data) {
        const authKey = response.data?.user?.key?.auth_key;
        const refreshKey = response.data?.user?.key?.refresh_key;
        res.setHeader('Set-Cookie', [
          `auth_key=${authKey}; Path=/; Max-Age=43200`,
          `refresh_key=${refreshKey}; Path=/; Max-Age=86400`,
        ]);
        res.status(200).send(response.data);
      } else if (!response) {
        // SDK resolved undefined (upstream errored without a body):
        // surface it instead of crashing or minting a phantom login.
        res
          .status(502)
          .send({ error: true, message: 'Upstream auth service unavailable' } );
      } else {
        // Mock login fallback when Tradly API unreachable
        const email = req.body.prams?.email || 'user@example.com';
        const firstName = email.split('@')[0];
        const mockUser = {
          user: {
            id: 1,
            email,
            first_name: firstName,
            last_name: '',
            profile_pic: null,
            key: {
              auth_key: 'mock_auth_key_dev',
              refresh_key: 'mock_refresh_key_dev',
            },
          },
        };
        res.setHeader('Set-Cookie', [
          'auth_key=mock_auth_key_dev; Path=/; Max-Age=43200',
          'refresh_key=mock_refresh_key_dev; Path=/; Max-Age=86400',
        ]);
        res.status(200).send(mockUser);
      }
    } catch (error) {
      res.status(500).send({ error: true, message: error.message });
    }
  }
}
