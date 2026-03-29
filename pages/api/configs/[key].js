import tradly from 'tradly';

const DEFAULT_CONFIGS = {
  general: {
    app_name: 'Butterflies Marketplace',
    web_font_title: 'Montserrat',
    theme: 1,
    type: 1,
    sub_type: 1,
    auth_type: 1,
    registration_title: 'Welcome Back!',
    web_logo: '/placeholders/logo.svg',
    web_icon: '/placeholders/logo.svg',
    terms_url: '/terms',
    privacy_policy_url: '/privacy',
    support_url: '/support',
  },
  listings: {
    page_size: 20,
  },
  payments: {
    available_methods: ['stripe', 'paypal'],
  },
  accounts: {
    verification_required: true,
  },
  onboarding: {
    show_onboarding: true,
  },
  extensions: {},
  seo: {},
  social: {},
};

export default async function handler(req, res) {
  const { key } = req.query;
  try {
    const response = await tradly.app.getConfigList({
      paramBody: key,
    });
    
    if (!response.error && response.data) {
      res.status(200).send(response.data);
    } else {
      // Fallback to default configs when Tradly API fails
      const defaultConfig = DEFAULT_CONFIGS[key] || {};
      res.status(200).send({ configs: defaultConfig, fallback: true });
    }
  } catch (error) {
    // Fallback to default configs on network error
    const defaultConfig = DEFAULT_CONFIGS[key] || {};
    res.status(200).send({ configs: defaultConfig, fallback: true });
  }
}
