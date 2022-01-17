/* eslint-disable react/prop-types */
import 'tailwindcss/tailwind.css';
import store from '../store/store';
import tradly from 'tradly';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { setGeneralConfig } from '../store/feature/configsSlice';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import TagManager from 'react-gtm-module';

function MyApp({ Component, pageProps }) {
  const [start, setStart] = useState(false);
  const [favicon, setFavicon] = useState(false);
  const [generalCf, setGeneralCf] = useState(null);

  tradly.init.config({
    token: process.env.API_KEY,
    environment: process.env.ENVIRONMENT,
  });

  useEffect(() => {
    tradly.app
      .getConfigList({
        paramBody: 'onboarding',
      })
      .then((res) => {
        if (typeof window !== 'undefined') {
          let root = document.documentElement;
          const color = res.data.configs.app_color_primary;
          root.style.setProperty('--primary_color', color);
          localStorage.setItem(
            'onboarding_configs',
            JSON.stringify(res.data.configs)
          );

          setStart(true);
        }
      });
    tradly.app
      .getConfigList({
        paramBody: 'general',
      })
      .then((res) => {
        if (typeof window !== 'undefined') {
          if (!res.error) {
            localStorage.setItem('marketplace_type', res.data.configs.type);
            localStorage.setItem(
              'marketplace_module',
              res.data.configs.sub_type
            );

            const favicon = document.getElementById('favicon');

            setFavicon(res?.data?.configs?.web_icon);
            localStorage.setItem('logo', res?.data?.configs?.web_logo);

            localStorage.setItem(
              'general_configs',
              JSON.stringify(res.data.configs)
            );
            setStart(true);
          } else {
            setStart(false);
          }
        }
      });
    tradly.app
      .getConfigList({
        paramBody: 'extensions',
      })
      .then((res) => {
        if (typeof window !== 'undefined') {
          if (!res.error) {
            if (res.data.configs.gtm) {
              TagManager.initialize({ gtmId: `GTM-${res.data.configs.gtm}` });
            }
            setStart(true);
          } else {
            setStart(false);
          }
        }
      });
  }, []);

  return (
    start && (
      <>
        <Head>
          <link rel="icon" href={favicon} />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
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
