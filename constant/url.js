export const base_url = () => {
  switch (process.env.ENVIRONMENT) {
    case 'development':
      return 'https://api.dev.tradly.app';
      break;
    case 'production':
      return 'https://api.tradly.app';
      break;
    case 'sandbox':
      return 'https://api.sandbox.tradly.app';
      break;
    default:
      return 'https://api.tradly.app';
      break;
  }
};
