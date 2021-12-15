import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getThumbnailImage } from '../Shared/Constant/Constant';
import tradly from 'tradly';
import { useRouter } from 'next/dist/client/router';
import googleplayImage from '../../assets/Images/play-store-image.png';

const Footer = () => {
  const [logo, setLogo] = useState(null);
  const [categories, setCategories] = useState(null);
  const [general_configs, setGeneral_configs] = useState(null);
  const [tenants_data, setTenants_data] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setLogo(localStorage.getItem('logo'));
    tradly.app
      .getCategory({ bodyParam: { parent: 0, type: 'listings' }, authKey: '' })
      .then((res) => {
        if (!res.error) {
          setCategories(res.data.categories);
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
      })
    
    tradly.app
      .commonFuntion({
        path: `/v1/users/clients/tenants`,
        bodyParam: '',
        authKey: '',
        Method:"GET"
        
      })
      .then((res) => {
        if (!res.error) {
          setTenants_data(res.data.tenants);
        }
      });
  }, [0]);
  return (
    <>
      <div className="w-full h-full py-4 grid grid-cols-2 md:grid-cols-3 gap-10  border-b border-[rgba(216, 216, 216, 0.5)]">
        <div className=" col-span-2 md:col-span-1">
          {logo && (
            <Link href="/" passHref={true}>
              <div className="w-[180px] h-[50px] relative">
                <Image
                  src={getThumbnailImage(logo)}
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                />
              </div>
            </Link>
          )}

          <div className="mt-4 ml-3">
            <button
              onClick={() => window.open(general_configs?.app_download_link)}
              className=" text-base text-[#4F4F4F] font-medium rounded-lg overflow-hidden"
            >
              <Image
                src={googleplayImage}
                width={180}
                height={50}
                objectFit="cover"
                alt="logo"
              />
            </button>
          </div>
        </div>

        <div>
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
        </div>
        <div>
          <p className=" text-base font-semibold pb-4">Links</p>
          <div className="     pb-4">
            <button
              onClick={() => window.open(general_configs?.terms_url)}
              className=" text-base text-[#4F4F4F] font-medium  text-left"
            >
              Terms & Conditions
            </button>
          </div>
          <div className="    pb-4">
            <button
              onClick={() => window.open(general_configs?.privacy_policy_url)}
              className=" text-base text-[#4F4F4F] font-medium"
            >
              Privacy Policy
            </button>
          </div>
          <div className="    pb-4">
            <button
              onClick={() => window.open(general_configs?.support_url)}
              className=" text-base text-[#4F4F4F] font-medium"
            >
              Support
            </button>
          </div>

          <div className="   pb-4">
            <button
              onClick={() => window.open('/sitemap.xml')}
              className=" text-base text-[#4F4F4F] font-medium"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
      <div className="py-2">
        <p className=" text-xs text-secondary">© All rights reserved</p>
      </div>
    </>
  );
};

export default Footer;
