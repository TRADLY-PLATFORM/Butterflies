import axios from 'axios';
import tradly from 'tradly';

export default async function handler(req, res) {
  const { key } = req.query;
  tradly.init
    .config({
      token: process.env.API_KEY,
      environment: process.env.ENVIRONMENT,
    })
    .then(async () => {
      const response = await tradly.app.getConfigList({
        paramBody: key,
      });
      if (!response.error) {
        res.status(200).send(response.data);
      } else {
        res.status(500).send(response.error);
      }
    });
}
