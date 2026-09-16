import tradly from 'tradly';
import { ensureTradlyServerConfig } from '../../../lib/tradlyServer';

export default async function handler(req, res) {
  ensureTradlyServerConfig();
  const { auth_key } = req.cookies;

  const id = req.query.id;
  const reg = new RegExp('^[0-9]*$');

  // Resolve order: numeric id prefix first, then slug variants.
  // Returns 404 when nothing matches (no mock fallback).
  const first = id.split('-')[0];
  const attempts = [];
  if (reg.test(first)) {
    attempts.push({ id: first });
    attempts.push({ slug: id });
    const slugPart = id.slice(first.length + 1);
    if (slugPart) attempts.push({ slug: slugPart });
  } else {
    attempts.push({ slug: id });
  }

  for (const attempt of attempts) {
    try {
      const response = await tradly.app.getListingDetail({
        ...attempt,
        authKey: auth_key ? auth_key : '',
      });
      if (response && !response.error && response.data) {
        return res.status(200).send(response.data);
      }
    } catch (error) {
      // try next identifier variant
    }
  }
  return res.status(404).send({ error: { message: 'Listing not found' } });
}
