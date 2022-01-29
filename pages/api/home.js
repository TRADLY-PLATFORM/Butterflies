import tradly from 'tradly';
import { TYPE_CONSTANT } from '../../constant/Web_constant';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  const response = await tradly.app.home({
    authKey: auth_key ? auth_key : '',
  });
  if (!response.error) {
    res.send(response.data);
  } else {
    res.send(response);
  }
}
