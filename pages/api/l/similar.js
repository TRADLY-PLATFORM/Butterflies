import tradly from 'tradly';

const MOCK_SIMILAR = { listings: [], page: 1, total_records: 0 };

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.commonFuntion({
      path: `/products/v1/listings/${req?.query.id}/similar`,
      bodyParam: req.query, authKey: auth_key, Method: 'GET',
    });
    if (!response.error && response.data) { res.status(200).send(response.data); }
    else { res.status(200).send(MOCK_SIMILAR); }
  } catch { res.status(200).send(MOCK_SIMILAR); }
}
