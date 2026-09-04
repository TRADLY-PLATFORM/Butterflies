import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;

  const response =await tradly.app.getReviewList({
    authKey: auth_key ? auth_key : '',
    bodyParam: req.query,
  });
  // The SDK can resolve to `undefined` when the upstream API (api.tradly.app)
  // errors without a response body (e.g. 401 with empty body): its
  // networkCall returns [undefined, undefined] in that case. Guard against
  // it so we return a structured error instead of crashing on
  // `response.error` (TypeError -> 500 with no detail).
  if (response && !response.error) {
    res.status(200).send(response.data);
  } else {
    res
      .status(502)
      .send(
        response?.error ?? { message: 'Upstream review service unavailable' }
      );
  }
}
