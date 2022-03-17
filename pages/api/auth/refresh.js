import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;

  tradly.init
    .config({
      token: process.env.API_KEY,
      environment: process.env.ENVIRONMENT,
    })
    .then(async () => {
      if (req.method === 'POST') {
        const key = req.body.key;
        if (key) {
          const response = await tradly.init.refreshAPI(key);

          if (!response.error) {
            res.status(200).send(response.data);
          } else {
            res.status(500).send(response.error);
          }
        } else {
          res.status(500).send({ error: 'unauthorized' });
        }
      }
    });
}
