import tradly from 'tradly';
import { ensureTradlyServerConfig } from '../../../lib/tradlyServer';

export default async function handler(req, res) {
  ensureTradlyServerConfig();
  const { auth_key } = req.cookies;
  // type: 'tenant' keeps the SDK on the clean tenant path. Without it the
  // SDK appends `account_id=undefined`, which upstream rejects with an
  // HTML 500 that the SDK returns as a raw string.
  const response = await tradly.app.getShippingMethods({
    type: 'tenant',
    authKey: auth_key ? auth_key : '',
  });
  const data =
    typeof response === 'string'
      ? (() => {
          try {
            return JSON.parse(response);
          } catch {
            return undefined;
          }
        })()
      : response;
  if (data && !data.error && data.data) {
    res.status(200).send(data.data);
  } else {
    res
      .status(502)
      .send(
        data?.error ?? { message: 'Upstream shipping service unavailable' }
      );
  }
}
