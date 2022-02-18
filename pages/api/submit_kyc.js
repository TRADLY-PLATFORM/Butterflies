import axios from 'axios';
import { base_url } from '../../constant/url';

export default async function handler(req, res) {
  const url = `${base_url()}//v1/payments/mangopay/bank_account/${
    req.body.account_id
  }`;
  var header = {
    'Content-Type': 'application/json',
    'x-auth-key': req.body.auth_key,
  };
  console.log('====================================');
  console.log(header, req);
  console.log('====================================');

  //   if (req.method == 'POST') {
  //     axios({
  //       url: url,
  //       method: 'POST',
  //       responseType: 'json',
  //       headers: header,
  //       data: {
  //         url: req.body.data,
  //       },
  //     })
  //       .then((response) => {
  //         res.send(response.data);
  //       })
  //       .catch((error) => {
  //         res.send(error);
  //       });
  //   }
}
