import tradly from 'tradly';

export default async function handler(req, res) {
    if (req.method === "GET") {
      const { auth_key } = req.cookies;
      const response = await tradly.app.getAccounts({
        bodyParam: req.query,
        authKey: auth_key,
      });
      res.send(response.data);
    }
    else if (req.method === "POST") {
         const { auth_key } = req.cookies;
         const response = await tradly.app.postAccounts({
           id: req.body.id,
           authKey: auth_key,
           data: req.body.prams,
         });
         res.send(response.data);
    }
}
