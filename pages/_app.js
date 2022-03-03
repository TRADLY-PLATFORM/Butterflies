/* eslint-disable react/prop-types */
import '../styles/globals.scss';
import store from '../store/store';
import tradly from 'tradly';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { TYPE_CONSTANT } from '../constant/Web_constant';
import Router, { useRouter } from 'next/router';
import Loading from '../components/Shared/Loading/Loading';

import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const [is_onboarding, setIs_onboarding] = useState(false);
  const [is_general, setIs_general] = useState(false);
  const [isExtension, setIsExtension] = useState(false);
  const [start, setStart] = useState(false);
  const [favicon, setFavicon] = useState(false);
  const [hideFooter_note, setHidFooter_note] = useState(false);
  const [generalCf, setGeneralCf] = useState(null);
  const [primary_font_name, set_primary_font_name] = useState('Montserrat');
  const router = useRouter();
  const [searchConsole, setSearchConsole] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  useEffect(() => {
    // set configs
    axios.get('/api/configs/payment').then((res) => {
      TYPE_CONSTANT.PAYMENT_CONFIGS = res?.data.configs || '';
    });
    axios.get('/api/configs/listings').then((res) => {
      TYPE_CONSTANT.LISTINGS_CONFIGS = res?.data.configs || '';
    });
    axios.get('/api/configs/accounts').then((res) => {
      TYPE_CONSTANT.ACCOUNTS_CONFIGS = res?.data.configs || '';
    });

    // onboarding Configs
    axios.get('/api/configs/onboarding').then((res) => {
      if (typeof window !== 'undefined') {
        if (!res.data.error) {
          let root = document.documentElement;
          const primary_color = res.data.configs?.app_color_primary;
          const secondary_color = res.data.configs?.app_color_secondary;
          const footer_color = res.data.configs.bg_footer_color;
          root.style.setProperty('--primary_color', primary_color);
          root.style.setProperty('--secondary_color', secondary_color);
          root.style.setProperty('--footer_color', footer_color);
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

    // General Configs
    axios.get('/api/configs/general').then((res) => {
      if (typeof window !== 'undefined') {
        if (!res.data.error) {
          // font set
          let root = document.documentElement;
          const primary_font =
            res.data.configs.web_font_title || primary_font_name;
          root.style.setProperty('--primary_font', primary_font);
          set_primary_font_name(primary_font);

          // type and module set
          localStorage.setItem('marketplace_type', res.data.configs?.type);
          localStorage.setItem(
            'marketplace_module',
            res.data.configs?.sub_type
          );
          TYPE_CONSTANT.MARKETPLACE_TYPE = res.data.configs?.type;
          TYPE_CONSTANT.MARKETPLACE_MODULE = res.data.configs?.sub_type;

          // favicon set
          setFavicon(res?.data?.configs?.web_icon);

          // logo set
          localStorage.setItem('logo', res?.data?.configs?.web_logo);

          // hide footer note
          setHidFooter_note(res?.data?.configs?.hide_tradly_footer_note);

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

    // extensions config
    axios.get('/api/configs/extensions').then((res) => {
      if (typeof window !== 'undefined') {
        if (!res.data.error) {
          // GTM
          if (res.data.configs?.gtm) {
            TagManager.initialize({ gtmId: `GTM-${res.data.configs?.gtm}` });
          }

          // Search Console
          if (res.data.configs?.searchconsole) {
            setSearchConsole(res.data.configs?.searchconsole);
          }

          setIsExtension(true);
        } else {
          setIsExtension(false);
        }
      }
    });

    // SEO Configs
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
  }, []);

  useEffect(() => {
    if (is_onboarding && is_general && isExtension) {
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
          <link
            href={`https://fonts.googleapis.com/css2?family=${primary_font_name}&display=optional`}
            rel="stylesheet"
          />
          {searchConsole && (
            <meta name="google-site-verification" content={searchConsole} />
          )}
        </Head>
        <Provider store={store}>
          <Loading loading={loading} />
          <Component {...pageProps} />
          {!hideFooter_note && (
            <div
              className=" fixed bottom-5 right-5 z-50 shadow px-2 py-2 flex items-center gap-2 rounded bg-black cursor-pointer"
              onClick={() =>
                window.open('https://tradly.app/?utm_source=user_website')
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 126 126"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M63 0C97.7939 0 126 28.2061 126 63C126 97.7939 97.7939 126 63 126C28.2061 126 0 97.7939 0 63C0 28.2061 28.2061 0 63 0Z"
                  fill="url(#paint0_linear)"
                ></path>
                <path
                  opacity="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M63 119C93.9279 119 119 93.9279 119 63C119 32.0721 93.9279 7 63 7C32.0721 7 7 32.0721 7 63C7 93.9279 32.0721 119 63 119Z"
                  stroke="white"
                  strokeWidth="1.4"
                ></path>
                <path
                  opacity="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M63 105C86.196 105 105 86.196 105 63C105 39.804 86.196 21 63 21C39.804 21 21 39.804 21 63C21 86.196 39.804 105 63 105Z"
                  stroke="white"
                  strokeWidth="1.4"
                ></path>
                <path
                  d="M108.282 44.2442C105.799 38.2551 102.162 32.8652 97.6482 28.3518C88.7809 19.4845 76.5309 14 63 14C49.469 14 37.219 19.4845 28.3517 28.3518C23.8383 32.8652 20.2012 38.2551 17.7178 44.2442"
                  stroke="white"
                  strokeWidth="15.4"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M63.0001 14.0001V111.222"
                  stroke="white"
                  strokeWidth="15.4"
                  strokeLinecap="round"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="126"
                    y1="0"
                    x2="126"
                    y2="126"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2BDBC0"></stop>
                    <stop offset="1" stopColor="#13B58C"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <p className="text-sm font-semibold text-white  font-Inter-var">
                Built with <span className=" text-[#55d4a3] ">Tradly</span>
              </p>
            </div>
          )}
        </Provider>
      </>
    )
  );
}

export default MyApp;

export async function getServerSideProps(context) {
  axios.post('/api', {
    token: process.env.API_KEY,
    environment: process.env.ENVIRONMENT,
  });
}
