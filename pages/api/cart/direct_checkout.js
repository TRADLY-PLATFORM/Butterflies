import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  if (req.method === 'POST') {
    const response = await tradly.app.listingDirectCheckout({
      authKey:auth_key,
      data: req.body.checkoutData,
      id:req.body.id,
      currency:req.body.currency,
    });
    res.send(response.data);
  }
}
