import tradly from 'tradly';

const MOCK_ATTRIBUTES = { attributes: [] };

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.getAttribute({ bodyParam: req.query, authKey: auth_key ? auth_key : '' });
    if (!response.error && response.data) { res.status(200).send(response.data); }
    else { res.status(200).send(MOCK_ATTRIBUTES); }
  } catch { res.status(200).send(MOCK_ATTRIBUTES); }
}
