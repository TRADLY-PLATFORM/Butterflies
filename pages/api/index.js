import tradly from 'tradly';

export default async function handler(req, res) {
  tradly.init.config({
    token: process.env.API_KEY,
    environment: process.env.ENVIRONMENT,
  });
  res.status(200).json({ status_text: 'connected' });
}
