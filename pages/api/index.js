import tradly from 'tradly';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    tradly.init.config({
      token: req.body.token,
      environment: req.body.environment,
    });
    res.send({status:"connected"})
  }
}
