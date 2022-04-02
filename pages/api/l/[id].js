import tradly from 'tradly';

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
 
  const id = req.query.id;
  const reg = new RegExp('^[0-9]*$');

   if (reg.test(id.split('-')[0])) {
    const response = await tradly.app.getListingDetail({
      id: id.split('-')[0],
      slug:undefined,
      authKey: auth_key ? auth_key : '',
    });
    if (!response.error) {
      res.status(200).send(response.data);
    } else {
      res.status(500).send(response.error);
    }
  } else {
    const response = await tradly.app.getListingDetail({
      id:undefined,
      slug:id,
      authKey: auth_key ? auth_key : '',
    });
    if (!response.error) {
      res.status(200).send(response.data);
    } else {
      res.status(500).send(response.error);
    }
  }
}
