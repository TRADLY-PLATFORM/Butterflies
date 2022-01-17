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

const Footer = () => {
  const [logo, setLogo] = useState(null);
  const [isSeeAllCategories, setIsSeeAllCategories] = useState(false);
  const [allCategories, setAllCategories] = useState(null);
  const [general_configs, setGeneral_configs] = useState(null);
  const [social_configs, setSocial_configs] = useState({});

  const router = useRouter();

  useEffect(() => {
    setLogo(localStorage.getItem('logo'));
    tradly.app
      .getCategory({ bodyParam: { parent: 0, type: 'listings' }, authKey: '' })
      .then((res) => {
        if (!res.error) {
          setAllCategories(res.data.categories);
        }
      });

    tradly.app
      .getConfigList({
        paramBody: 'general',
      })
      .then((res) => {
        if (!res.error) {
          setGeneral_configs(res.data.configs);
        }
      });

    tradly.app
      .getConfigList({
        paramBody: 'social',
      })
      .then((res) => {
        if (!res.error) {
          setSocial_configs(res.data.configs);
        }
      });
  }, [0]);
  return (
    <>
      <div className="w-full h-full py-4 grid grid-cols-2 md:grid-cols-3 gap-10  border-b border-[rgba(216, 216, 216, 0.5)]">
        <div className=" col-span-2 md:col-span-1">
          {logo && (
            <Link href="/" passHref={true}>
              <a className=" block w-[180px] h-[50px] relative">
                <Image
                  src={getThumbnailImage(logo)}
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                />
              </a>
            </Link>
          )}

          {general_configs?.android_app_download_link && (
            <Link href={general_configs?.android_app_download_link}>
              <a className=" block mt-4 ml-3" target="_blank">
                <button className=" text-base text-[#4F4F4F] font-medium rounded-lg overflow-hidden">
                  <Image
                    src={googleplayImage}
                    width={180}
                    height={50}
                    objectFit="cover"
                    alt="logo"
                  />
                </button>
              </a>
            </Link>
          )}

          {Object.keys(social_configs)?.length > 0 && (
            <div className="mt-4 ml-3">
              <h2 className="text-base font-semibold pb-4">
                Follow us on social media
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
          <p className=" text-base font-semibold pb-4">Categories</p>
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
            }
          })}

          {isSeeAllCategories &&
            allCategories?.map((item, index, array) => {
              if (array.length > 4) {
                if (index > 4) {
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
          <p className=" text-base font-semibold pb-4">Links</p>
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
      <div className="py-2 flex items-center">
        <p className=" text-sm text-secondary mr-4">
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
    </>
  );
};

export default Footer;
