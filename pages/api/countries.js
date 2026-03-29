import tradly from 'tradly';

const MOCK_COUNTRIES = { countries: [{ id: 1, name: 'United States', code: 'US', dial_code: '1' }, { id: 2, name: 'United Kingdom', code: 'GB', dial_code: '44' }, { id: 3, name: 'India', code: 'IN', dial_code: '91' }] };

export default async function handler(req, res) {
  try {
    const response = await tradly.app.getTenantCountries({ authKey: '' });
    if (!response.error && response.data) { res.status(200).send(response.data); }
    else { res.status(200).send(MOCK_COUNTRIES); }
  } catch { res.status(200).send(MOCK_COUNTRIES); }
}
