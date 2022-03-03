import React, { useEffect, useState } from 'react';
import tradly from 'tradly';
import { authSelector } from '../../store/feature/authSlice';
import Link from 'next/link';
import Image from 'next/image';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import SearchBox from '../SearchBox/SearchBox';
import axios from 'axios';

const Drawer = () => {
  const [categories, setCategories] = useState(null);
  const { auth_key } = useSelector(authSelector);

  const router = useRouter();
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    setLogo(localStorage.getItem('logo'));
  }, [0]);

  useEffect(() => {
    axios
      .get('/api/categories', { params: { parent: 0, type: 'listings' } })
      .then((res) => {
        if (!res.data.error) {
          setCategories(res.data.categories);
        }
      });
  }, [0]);

  return (
    <div>
      <div className="    left-0 right-0    flex-col  justify-center     mb-2">
        {logo && (
          <Link href="/" passHref={true}>
            <a className=" w-auto block px-2      cursor-pointer py-4">
              <img
                src={logo}
                className="   h-[50px] object-contain"
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
                    'w-full h-12 flex   items-center     cursor-pointer  hover:bg-secondary mb-1',
                    router?.query?.name === item.name ? 'bg-secondary' : '',
                  ].join(' ')}
                >
                  <p
                    className={[
                      ' text-sm font-semibold   ml-5 ',
                      router?.query?.name === item.name.replace(/\s/g, '-')
                        ? 'text-primary'
                        : ' text-default_gray',
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
