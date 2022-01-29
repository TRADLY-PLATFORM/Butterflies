import axios from 'axios';
import tradly from 'tradly';

export default async function handler(req, res) {
  const { key } = req.query;

  const response = await tradly.app.getConfigList({
    paramBody: key,
    authKey:''
  });
  if (!response.error) {
    res.send(response.data);
  } else {
    res.send(response);
  }
}
