import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import tradly from 'tradly';
import { authSelector } from '../../store/feature/authSlice';
import Link from 'next/link';

const HeaderCategories = () => {
  const [categories, setCategories] = useState(null);

  const { auth_key } = useSelector(authSelector);

  useEffect(() => {
    const width = window.innerWidth;
    var calc;
    tradly.app
      .getCategory({
        bodyParam: { parent: 0, type: 'listings' },
        authKey: auth_key,
      })
      .then((res) => {
        if (!res.error) {
          const response = res.data.categories;
          if (response.length > 0) {
            if (response.length < 9) {
              setCategories(response);
            } else {
              var sliceLength;
              if (width < 1100) {
                sliceLength = 3;
              }

              let updatedCategories = response.slice(0, sliceLength || 5);
              let moreCategory = {
                id: Math.random(),
                name: 'More',
                image_path: '',
                has_sub_category: true,
                link: 'all-categories',
              };
              updatedCategories.push(moreCategory);
              setCategories(updatedCategories);
            }
          }
        }
      });
  }, [0]);

  return (
    <div>
      <div className=" flex items-center">
        {categories?.map((item) => {
          const query =
            item.name !== 'More'
              ? {
                  name: item.name.replace(/\s/g, '-'),
                  id: item.id,
                }
              : '';

          return (
            <Link
              key={Math.random()}
              href={{
                pathname: `${
                  item.name !== 'More'
                    ? '/category/[name]'
                    : '/category'
                }`,
                query,
              }}
              
              passHref
            >
              <div className="">
                <p className=" min-h-[44px] px-3 flex justify-center items-center cursor-pointer transition duration-300 hover:text-primary ">
                  {item.name }
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderCategories;
