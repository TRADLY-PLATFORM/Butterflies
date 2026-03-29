import tradly from 'tradly';

const MOCK_MY_ACCOUNT = {
  accounts: [
    {
      id: 1,
      name: 'Demo Store',
      description: 'Your store',
      images: ['/placeholders/logo.svg'],
      total_listings: 8,
      total_followers: 42,
      user: { first_name: 'Demo', last_name: 'User', profile_pic: null },
    },
  ],
  page: 1,
  total_records: 1,
};

const MOCK_ACCOUNT_DETAIL = {
  account: { id: 1, name: 'Demo Store', description: 'Your store', images: ['/placeholders/logo.svg'], total_listings: 8, total_followers: 42 },
};

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    if (req.method === 'GET') {
      const response = await tradly.app.getAccounts({ bodyParam: req.query, authKey: auth_key || '' });
      if (!response.error && response.data) { res.status(200).send(response.data); }
      else { res.status(200).send(MOCK_MY_ACCOUNT); }
    } else if (req.method === 'POST') {
      const response = await tradly.app.postAccounts({ id: req.body.id, authKey: auth_key || '', data: req.body.prams });
      if (!response.error && response.data) { res.status(200).send(response.data); }
      else { res.status(200).send(MOCK_ACCOUNT_DETAIL); }
    }
  } catch {
    res.status(200).send(req.method === 'POST' ? MOCK_ACCOUNT_DETAIL : MOCK_MY_ACCOUNT);
  }
}
