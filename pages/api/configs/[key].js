import axios from 'axios';
import tradly from 'tradly';

export default async function handler(req, res) {
  const { key } = req.query;

  tradly.init.config({
    token: process.env.API_KEY,
    environment: process.env.ENVIRONMENT,
  });

  const response = await tradly.app.getConfigList({
    paramBody: key,
  });
  if (!response.error) {
    res.send(response.data);
  } else {
    res.send(response);
  }
}


