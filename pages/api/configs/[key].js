import tradly from 'tradly';

export default async function handler(req, res) {
  const { key } = req.query;

  const response = await tradly.app.getConfigList({
    paramBody: key,
  });
  res.send(response.data);
}
