import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getThumbnailImage } from '../Shared/Constant/Constant';
import tradly from 'tradly';
import { useRouter } from 'next/dist/client/router';
import googleplayImage from '../../assets/Images/play-store-image.png';
import { angle_down } from '../Shared/Constant/Icons/AllIcons';
import {
  facebook_icon,
  snapchat_icon,
  telegram_icon,
  twitter_icon,
  whatsapp_icon,
  youtube_icon,
} from '../Shared/Constant/Icons/socialIcons';
import axios from 'axios';

const CustomFooter = () => {
  const [logo, setLogo] = useState(null);
  const [isSeeAllCategories, setIsSeeAllCategories] = useState(false);
  const [allCategories, setAllCategories] = useState(null);
  const [general_configs, setGeneral_configs] = useState(null);
  const [social_configs, setSocial_configs] = useState({});

  const router = useRouter();

  useEffect(() => {
    setLogo(localStorage.getItem('logo'));

    axios
      .get('/api/categories', { params: { parent: 0, type: 'listings' } })
      .then((res) => {
        if (!res.data.error) {
          setAllCategories(res.data.categories);
        }
      });

    axios.get('/api/configs/general').then((res) => {
      if (!res.data.error) {
        setGeneral_configs(res.data.configs);
      }
    });

    axios.get('/api/configs/social').then((res) => {
      if (!res.data.error) {
        setSocial_configs(res.data.configs);
      }
    });
  }, [0]);
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
      <div className="w-full h-full py-4 grid grid-cols-2 md:grid-cols-3 gap-10  border-b border-t border-[rgba(216, 216, 216, 0.5)] pt-16  ">
        <div className=" col-span-2 md:col-span-1">
          {logo && (
            <Link href="/" passHref={true}>
              <a className=" block w-[180px] h-[50px] relative">
                <Image
                  src={logo}
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                />
              </a>
            </Link>
          )}

          <div className="flex items-center justify-start flex-wrap gap-3">
            {general_configs?.android_app_download_link && (
              <Link href={general_configs?.android_app_download_link}>
                <a className=" block mt-4 " target="_blank">
                  {general_configs?.android_app_download_icon ? (
                    <img
                      src={general_configs?.android_app_download_icon}
                      objectFit="cover"
                      alt="logo"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="48px"
                      height="48px"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      baseProfile="basic"
                    >
                      <linearGradient
                        id="jFdG-76_seIEvf-hbjSsaa"
                        x1="1688.489"
                        x2="1685.469"
                        y1="-883.003"
                        y2="-881.443"
                        gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#047ed6" />
                        <stop offset="1" stopColor="#50e6ff" />
                      </linearGradient>
                      <path
                        fill="url(#jFdG-76_seIEvf-hbjSsaa)"
                        fillRule="evenodd"
                        d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194 v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z"
                        clipRule="evenodd"
                      />
                      <linearGradient
                        id="jFdG-76_seIEvf-hbjSsab"
                        x1="1645.286"
                        x2="1642.929"
                        y1="-897.055"
                        y2="-897.055"
                        gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#ffda1c" />
                        <stop offset="1" stopColor="#feb705" />
                      </linearGradient>
                      <path
                        fill="url(#jFdG-76_seIEvf-hbjSsab)"
                        fillRule="evenodd"
                        d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428 l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z"
                        clipRule="evenodd"
                      />
                      <linearGradient
                        id="jFdG-76_seIEvf-hbjSsac"
                        x1="1722.978"
                        x2="1720.622"
                        y1="-889.412"
                        y2="-886.355"
                        gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#d9414f" />
                        <stop offset="1" stopColor="#8c193f" />
                      </linearGradient>
                      <path
                        fill="url(#jFdG-76_seIEvf-hbjSsac)"
                        fillRule="evenodd"
                        d="M33.762,30.561l-6.565-6.567L7.809,43.382 c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561"
                        clipRule="evenodd"
                      />
                      <linearGradient
                        id="jFdG-76_seIEvf-hbjSsad"
                        x1="1721.163"
                        x2="1722.215"
                        y1="-891.39"
                        y2="-890.024"
                        gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#33c481" />
                        <stop offset="1" stopColor="#61e3a7" />
                      </linearGradient>
                      <path
                        fill="url(#jFdG-76_seIEvf-hbjSsad)"
                        fillRule="evenodd"
                        d="M33.762,17.429L11.041,4.522 c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </a>
              </Link>
            )}
            {general_configs?.ios_app_download_link && (
              <Link href={general_configs?.ios_app_download_link}>
                <a className=" block mt-4 " target="_blank">
                  {general_configs?.ios_app_download_icon ? (
                    <img
                      src={general_configs?.ios_app_download_icon}
                      objectFit="cover"
                      alt="logo"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="48px"
                      height="48px"
                    >
                      <path
                        fill="#0091ea"
                        d="M14.1,42h19.8c4.474,0,8.1-3.627,8.1-8.1V27H6v6.9C6,38.373,9.626,42,14.1,42z"
                      />
                      <rect
                        width="36"
                        height="11"
                        x="6"
                        y="16"
                        fill="#00b0ff"
                      />
                      <path
                        fill="#40c4ff"
                        d="M33.9,6H14.1C9.626,6,6,9.626,6,14.1V16h36v-1.9C42,9.626,38.374,6,33.9,6z"
                      />
                      <path
                        fill="#fff"
                        d="M22.854,18.943l1.738-2.967l-1.598-2.727c-0.418-0.715-1.337-0.954-2.052-0.536 c-0.715,0.418-0.955,1.337-0.536,2.052L22.854,18.943z"
                      />
                      <path
                        fill="#fff"
                        d="M26.786,12.714c-0.716-0.419-1.635-0.179-2.052,0.536L16.09,28h3.477l7.754-13.233 C27.74,14.052,27.5,13.133,26.786,12.714z"
                      />
                      <path
                        fill="#fff"
                        d="M34.521,32.92l-7.611-12.987l-0.763,1.303c-0.444,0.95-0.504,2.024-0.185,3.011l5.972,10.191 c0.279,0.476,0.78,0.741,1.295,0.741c0.257,0,0.519-0.066,0.757-0.206C34.701,34.554,34.94,33.635,34.521,32.92z"
                      />
                      <path
                        fill="#fff"
                        d="M25.473,27.919l-0.171-0.289c-0.148-0.224-0.312-0.434-0.498-0.621H12.3 c-0.829,0-1.5,0.665-1.5,1.484s0.671,1.484,1.5,1.484h13.394C25.888,29.324,25.835,28.595,25.473,27.919z"
                      />
                      <path
                        fill="#fff"
                        d="M16.66,32.961c-0.487-0.556-1.19-0.934-2.03-0.959l-0.004,0c-0.317-0.009-0.628,0.026-0.932,0.087 l-0.487,0.831c-0.419,0.715-0.179,1.634,0.536,2.053c0.238,0.14,0.5,0.206,0.757,0.206c0.515,0,1.017-0.266,1.295-0.741 L16.66,32.961z"
                      />
                      <path
                        fill="#fff"
                        d="M30.196,27.009H35.7c0.829,0,1.5,0.665,1.5,1.484s-0.671,1.484-1.5,1.484h-5.394 C30.112,29.324,30.01,27.196,30.196,27.009z"
                      />
                    </svg>
                  )}
                </a>
              </Link>
            )}
          </div>

          {Object.keys(social_configs)?.length > 0 && (
            <div className="mt-4 ml-3">
              <h2 className="text-base font-semibold pb-4">
                Follow us on Social Media
              </h2>
              <div className="flex items-center gap-3">
                {social_configs?.facebook_pageurl && (
                  <Link href={social_configs?.facebook_pageurl}>
                    <a target="_blank">{facebook_icon}</a>
                  </Link>
                )}
                {social_configs?.youtube_channelurl && (
                  <Link href={social_configs?.youtube_channelurl}>
                    <a target="_blank">{youtube_icon}</a>
                  </Link>
                )}
                {social_configs?.twitter_handleurl && (
                  <Link href={social_configs?.twitter_handleurl}>
                    <a target="_blank">{twitter_icon}</a>
                  </Link>
                )}
                {social_configs?.snapchat && (
                  <Link href={social_configs?.snapchat}>
                    <a target="_blank">{snapchat_icon}</a>
                  </Link>
                )}
                {social_configs?.telegram_url && (
                  <Link href={social_configs?.telegram_url}>
                    <a target="_blank">{telegram_icon}</a>
                  </Link>
                )}
                {social_configs?.whatsapp_number && (
                  <Link href={social_configs?.whatsapp_number}>
                    <a target="_blank">{whatsapp_icon}</a>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <p className=" text-lg font-semibold pb-4">Categories</p>
          {allCategories?.map((item, index, array) => {
            if (array.length > 3) {
              if (index < 3) {
                return (
                  <div className="mb-4 " key={Math.random()}>
                    {' '}
                    <Link
                      href={{
                        pathname: `/lc/[name]`,
                        query: {
                          name: item.name.replace(/\s/g, '-'),
                          category_id: item.id,
                          page: 1,
                        },
                      }}
                    >
                      <a>
                        <button
                          // onClick={() =>
                          //   router.push({
                          //     pathname: `/lc/[name]`,
                          //     query: {
                          //       name: item.name.replace(/\s/g, '-'),
                          //       category_id: item.id,
                          //       page: 1,
                          //     },
                          //   })
                          // }
                          className={[
                            '  text-[#4F4F4F]    cursor-pointer transition duration-300 hover:text-primary  text-left',
                            router?.query?.name ===
                            item.name.replace(/\s/g, '-')
                              ? 'text-primary'
                              : '',
                          ].join(' ')}
                        >
                          {item.name.length > 20
                            ? item.name.substring(0, 19) + '.'
                            : item.name}
                        </button>
                      </a>
                    </Link>
                  </div>
                );
              }
              if (index === 3) {
                return (
                  <div className="mb-4 " key={Math.random()}>
                    <button
                      className=" text-xs text-primary font-semibold py-[7px]  flex justify-between items-center  cursor-pointer "
                      onClick={() => setIsSeeAllCategories(!isSeeAllCategories)}
                    >
                      <span className="mr-3 text-left">See all categories</span>
                      <span
                        className={isSeeAllCategories && 'transform rotate-180'}
                      >
                        {angle_down}
                      </span>
                    </button>
                  </div>
                );
              }
            } else {
              return (
                <div className="mb-4 " key={Math.random()}>
                  {' '}
                  <Link
                    href={{
                      pathname: `/lc/[name]`,
                      query: {
                        name: item.name.replace(/\s/g, '-'),
                        category_id: item.id,
                        page: 1,
                      },
                    }}
                  >
                    <a>
                      <button
                        // onClick={() =>
                        //   router.push({
                        //     pathname: `/lc/[name]`,
                        //     query: {
                        //       name: item.name.replace(/\s/g, '-'),
                        //       category_id: item.id,
                        //       page: 1,
                        //     },
                        //   })
                        // }
                        className={[
                          '  text-[#4F4F4F]    cursor-pointer transition duration-300 hover:text-primary  text-left',
                          router?.query?.name === item.name.replace(/\s/g, '-')
                            ? 'text-primary'
                            : '',
                        ].join(' ')}
                      >
                        {item.name.length > 20
                          ? item.name.substring(0, 19) + '.'
                          : item.name}
                      </button>
                    </a>
                  </Link>
                </div>
              );
            }
          })}

          {isSeeAllCategories &&
            allCategories?.map((item, index, array) => {
              if (array.length > 4) {
                if (index + 1 > 4) {
                  return (
                    <div className="mb-4 " key={Math.random()}>
                      {' '}
                      <Link
                        href={{
                          pathname: `/lc/[name]`,
                          query: {
                            name: item.name.replace(/\s/g, '-'),
                            category_id: item.id,
                            page: 1,
                          },
                        }}
                      >
                        <a>
                          <button
                            // onClick={() =>
                            //   router.push({
                            //     pathname: `/lc/[name]`,
                            //     query: {
                            //       name: item.name.replace(/\s/g, '-'),
                            //       category_id: item.id,
                            //       page: 1,
                            //     },
                            //   })
                            // }
                            className={[
                              '  text-[#4F4F4F]    cursor-pointer transition duration-300 hover:text-primary text-left',
                              router?.query?.name ===
                              item.name.replace(/\s/g, '-')
                                ? 'text-primary'
                                : '',
                            ].join(' ')}
                          >
                            {item.name.length > 20
                              ? item.name.substring(0, 19) + '.'
                              : item.name}
                          </button>
                        </a>
                      </Link>
                    </div>
                  );
                }
              }
            })}
        </div>

        {/* <div>
          <p className=" text-base font-semibold pb-4">Categories</p>
          {categories?.map((item) => {
            return (
              <div className="mb-4 " key={Math.random()}>
                <button
                  onClick={() =>
                    router.push({
                      pathname: `/lc/[name]`,
                      query: {
                        name: item.name.replace(/\s/g, '-'),
                        category_id: item.id,
                        page: 1,
                      },
                    })
                  }
                  className={[
                    '  text-[#4F4F4F]    cursor-pointer transition duration-300 hover:text-primary ',
                    router?.query?.name === item.name.replace(/\s/g, '-')
                      ? 'text-primary'
                      : '',
                  ].join(' ')}
                >
                  {item.name.length > 20
                    ? item.name.substring(0, 19) + '.'
                    : item.name}
                </button>
              </div>
            );
          })}
        </div> */}
        <div>
          <p className=" text-lg font-semibold pb-4">Links</p>
          {general_configs?.terms_url && (
            <Link href={general_configs?.terms_url}>
              <a className=" block    pb-4" target="_blank">
                <button
                  // onClick={() => window.open(general_configs?.terms_url)}
                  className=" text-base text-[#4F4F4F] font-medium  text-left"
                >
                  Terms & Conditions
                </button>
              </a>
            </Link>
          )}
          {general_configs?.privacy_policy_url && (
            <Link href={general_configs?.privacy_policy_url}>
              <a className=" block    pb-4" target="_blank">
                <button
                  // onClick={() => window.open(general_configs?.privacy_policy_url)}
                  className=" text-base text-[#4F4F4F] font-medium"
                >
                  Privacy Policy
                </button>
              </a>
            </Link>
          )}
          {general_configs?.support_url && (
            <Link href={general_configs?.support_url}>
              <a className=" block    pb-4" target="_blank">
                <button
                  // onClick={() => window.open(general_configs?.support_url)}
                  className=" text-base text-[#4F4F4F] font-medium"
                >
                  Support
                </button>
              </a>
            </Link>
          )}

          {/* <div className="   pb-4">
            
          </div> */}
        </div>
      </div>
      <div className="py-2 flex flex-wrap items-center justify-between ">
        <div className=" flex items-center">
          <p className=" text-sm text-default_gray mr-4">
            {`© ${new Date().getFullYear()} ${
              general_configs?.website_name
            }. All rights reserved.`}
          </p>
          <Link href={'/sitemap.xml'}>
            <a className=" text-xs text-[#4F4F4F] font-medium" target="_blank">
              Sitemap
            </a>
          </Link>
        </div>
        <div>
          <Link href={'https://tradly.app/'}>
            <a className=" text-xs text-[#4F4F4F] font-medium" target="_blank">
              Built with Tradly API
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomFooter;
