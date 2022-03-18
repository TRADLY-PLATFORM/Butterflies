import axios from 'axios';
import tradly from 'tradly';
import { base_url } from '../../constant/url';

export default async function handler(req, res) {
  tradly.init
    .config({
      token: process.env.API_KEY,
      environment: process.env.ENVIRONMENT,
    })
    .then((response) => {
      res
        .status(200)
        .send({ status: 'connected', host_name: req.headers.host });
    });
}
