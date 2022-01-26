import tradly from 'tradly';

export default async function handler(req, res) {
    const response = await tradly.app.getConfigList({
    paramBody: "general",
  });
  res.send(response.data);
}
