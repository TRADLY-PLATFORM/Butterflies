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
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const [is_onboarding, setIs_onboarding] = useState(false);
  const [is_general, setIs_general] = useState(false);
  const [isExtension, setIsExtension] = useState(false);
  const [start, setStart] = useState(false);
  const [favicon, setFavicon] = useState(false);
  const [connected, setConnected] = useState(false);
  const [generalCf, setGeneralCf] = useState(null);

  axios.get('/api').then((res) => {
    setConnected(true);
  });

  useEffect(() => {
      axios.get('/api').then((res) => {
        setConnected(true);
      });
    axios.get('/api/configs/onboarding').then((res) => {
      if (typeof window !== 'undefined') {
        if (!res.data.error) {
          let root = document.documentElement;
          const primary_color = res.data.configs?.app_color_primary;
          const secondary_color = res.data.configs?.app_color_secondary;
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

      axios.get('/api').then((res) => {
        setConnected(true);
      });
    axios.get('/api/configs/general').then((res) => {
      if (typeof window !== 'undefined') {
        if (!res.data.error) {
          localStorage.setItem('marketplace_type', res.data.configs?.type);
          localStorage.setItem(
            'marketplace_module',
            res.data.configs?.sub_type
          );
          TYPE_CONSTANT.MARKETPLACE_TYPE = res.data.configs?.type;
          TYPE_CONSTANT.MARKETPLACE_MODULE = res.data.configs?.sub_type;

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

      axios.get('/api').then((res) => {
        setConnected(true);
      });
    axios.get('/api/configs/extensions').then((res) => {
      if (typeof window !== 'undefined') {
        if (!res.data.error) {
          if (res.data.configs?.gtm) {
            TagManager.initialize({ gtmId: `GTM-${res.data.configs?.gtm}` });
          }
          setIsExtension(true);
        } else {
          setIsExtension(false);
        }
      }
    });

      axios.get('/api').then((res) => {
        setConnected(true);
      });
    axios.get('/api/configs/seo').then((res) => {
      console.log(res);
      const { configs } = res?.data;
      TYPE_CONSTANT.META_TITLE = configs?.meta_title || '';
      TYPE_CONSTANT.META_DESCRIPTIONS = configs?.meta_description || '';
      TYPE_CONSTANT.META_ACCOUNT_TITLE = configs?.meta_account_title || '';
      TYPE_CONSTANT.META_LISTING_TITLE = configs?.meta_listing_title || '';
      TYPE_CONSTANT.META_LISTING_DESCRIPTION =
        configs?.meta_listing_description || '';
      TYPE_CONSTANT.META_LISTING_CATEGORY_TITLE =
        configs?.meta_listing_category_title || '';
      TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION =
        configs?.meta_listing_category_description || '';
    });
    axios.get('/api/configs/payment').then((res) => {
      TYPE_CONSTANT.PAYMENT_CONFIGS = res?.configs || '';
    });
  }, [connected]);

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
