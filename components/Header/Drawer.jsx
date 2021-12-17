import React, { useEffect, useState } from 'react';
import tradly from 'tradly';
import { authSelector } from '../../store/feature/authSlice';
import Link from 'next/link';
import Image from 'next/image';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import SearchBox from '../SearchBox/SearchBox';

const Drawer = () => {
  const [categories, setCategories] = useState(null);
  const { auth_key } = useSelector(authSelector);

  const router = useRouter();
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    setLogo(localStorage.getItem('logo'));
  }, [0]);

  useEffect(() => {
    tradly.app
      .getCategory({
        bodyParam: { parent: 0, type: 'listings' },
        authKey: auth_key,
      })
      .then((res) => {
        if (!res.error) {
          setCategories(res.data.categories);
        }
      });
  }, [0]);

  return (
    <div>
      <div className="    left-0 right-0    flex-col  justify-center     mb-2">
        {logo && (
          <Link href="/" passHref={true}>
            <a className=" block flex items-center   relative cursor-pointer py-4">
              <Image
                src={logo}
                height={44}
                width={250}
                objectFit="contain"
                alt="logo"
              />
            </a>
          </Link>
        )}

        <div className="pb-[10px] px-2">
            <SearchBox />
          </div>
      </div>
      <div>
        {categories?.map((item) => {
          const query =
            item.name !== 'More'
              ? {
                  name: item.name.replace(/\s/g, '-'),
                  category_id: item.id,
                  page: 1,
                }
              : '';
          return (
            <div key={item.id}>
              <Link
                href={{
                  pathname: `${item.name !== 'More' ? '/lc/[name]' : '/lc'}`,
                  query,
                }}
                passHref={true}
              >
                <div
                  className={[
                    'w-full h-12 flex   items-center     cursor-pointer  hover:bg-primary_light mb-1',
                    router?.query?.name === item.name ? 'bg-primary_light' : '',
                  ].join(' ')}
                >
                  <p
                    className={[
                      ' text-sm font-semibold   ml-5 ',
                      router?.query?.name === item.name.replace(/\s/g, '-')
                        ? 'text-primary'
                        : ' text-secondary',
                    ].join(' ')}
                  >
                    {item.name}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Drawer;
