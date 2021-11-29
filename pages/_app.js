/* eslint-disable react/prop-types */
import 'tailwindcss/tailwind.css';
import store from '../store/store';
import tradly from 'tradly';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import { useState } from 'react';
import { setGeneralConfig } from '../store/feature/configsSlice';

function MyApp({ Component, pageProps }) {
  const [start, setStart] = useState(false);

  tradly.init.config({
    token: process.env.API_KEY,
    environment: process.env.ENVIRONMENT,
  });

  tradly.app
    .getConfigList({
      paramBody: 'onboarding',
    })
    .then((res) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('logo', res?.data?.configs?.splash_image);
        localStorage.setItem(
          'onboarding_configs',
          JSON.stringify(res.data.configs)
        );
        let root = document.documentElement;
        const color = res.data.configs.app_color_primary;
        root.style.setProperty('--primary_color', color);
        setStart(true);
      }
    });
  tradly.app
    .getConfigList({
      paramBody: 'general',
    })
    .then((res) => {
      if (!res.error) {
        localStorage.setItem('marketplace_type', res.data.configs.type);
        localStorage.setItem('marketplace_module', res.data.configs.sub_type);
        setStart(true);
      } else {
        setStart(false);
      }
    });

  return (
    start && (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  );
}

export default MyApp;

export async function getServerSideProps() {
  const response = tradly.app.getConfigList({
    paramBody: 'onboarding',
  });
  return {
    props: { onboarding: response?.data?.configs },
  };
}
