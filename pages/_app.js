/* eslint-disable react/prop-types */
import '../styles/globals.scss';
import store from '../store/store';
import tradly from 'tradly';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { setGeneralConfig } from '../store/feature/configsSlice';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import TagManager from 'react-gtm-module';
import { TYPE_CONSTANT } from '../constant/Web_constant';

function MyApp({ Component, pageProps }) {
  const [is_onboarding, setIs_onboarding] = useState(false);
  const [is_general, setIs_general] = useState(false);
  const [isExtension, setIsExtension] = useState(false);
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
          if (!res.error) {
            let root = document.documentElement;
            const primary_color = res.data.configs.app_color_primary;
            const secondary_color = res.data.configs.app_color_secondary;
            root.style.setProperty('--primary_color', primary_color);
            root.style.setProperty('--secondary_color', secondary_color);
            localStorage.setItem(
              'onboarding_configs',
              JSON.stringify(res.data.configs)
            );

            setIs_onboarding(true);
          } else {
            setIs_onboarding(false);
          }
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
            TYPE_CONSTANT.MARKETPLACE_TYPE = res.data.configs.type;
            TYPE_CONSTANT.MARKETPLACE_MODULE = res.data.configs.sub_type;

            setFavicon(res?.data?.configs?.web_icon);
            localStorage.setItem('logo', res?.data?.configs?.web_logo);

            localStorage.setItem(
              'general_configs',
              JSON.stringify(res.data.configs)
            );
            setIs_general(true);
          } else {
            setIs_general(false);
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
            setIsExtension(true);
          } else {
            setIsExtension(false);
          }
        }
      });
  }, []);

  useEffect(() => {
    if (is_onboarding && is_general && isExtension) {
      console.log('====================================');
      console.log(is_onboarding, is_general, isExtension);
      console.log('====================================');
      setStart(true);
    } else {
      setStart(false);
    }
  }, [is_onboarding, is_general, isExtension]);

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
