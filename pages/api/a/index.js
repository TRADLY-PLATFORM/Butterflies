import tradly from 'tradly';

const MOCK_ACCOUNTS = { accounts: [], page: 1, total_records: 0 };

export default async function handler(req, res) {
  const { auth_key } = req.cookies;
  try {
    const response = await tradly.app.getAccounts({ bodyParam: req.query, authKey: auth_key ? auth_key : '' });
    if (!response.error && response.data) { res.status(200).send(response.data); }
    else { res.status(200).send(MOCK_ACCOUNTS); }
  } catch { res.status(200).send(MOCK_ACCOUNTS); }
}
