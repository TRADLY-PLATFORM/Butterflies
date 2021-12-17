/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getThumbnailImage } from '../Shared/Constant/Constant';

const Categories = ({ allCategories }) => (
  <div>
    <div>
      <div className=" grid grid-cols-[144px,144px]  xs:grid-cols-3 gap-[23px] sm:gap-0  sm:flex sm:flex-wrap justify-center md:justify-start  items-center">
        {allCategories?.map((item) => (
          <Link
            key={Math.random()}
            href={{
              pathname: '/lc/[name]',
              query: {
                category_id: item.id,
                page: 1,
                name: item.name.replace(/\s/g, '-'),
              },
            }}
            passHref
          >
            <a className=" block sm:mr-4  sm:mb-6  bg-[#ffffff] rounded-xl  py-4 flex flex-col  justify-between items-center border border-transparent  shadow-c-sm hover:border-primary hover:bg-primary_light  w-[144px] h-[144px] md:w-[100px]  md:h-[100px]  cursor-pointer">
              <div className=" w-[46px] h-[46px] md:w-[32px] md:h-[32px] relative">
                <Image
                  src={
                    item.name !== 'All Categories'
                      ? getThumbnailImage(item.image_path)
                      : item.image_path
                  }
                  alt={item.name}
                  title={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className=" w-11/12 mx-auto min-h-[5px] text-primary  text-xs   font-medium flex justify-center items-center text-center">
                {item.name === 'All Categories'
                  ? item.name
                  : item.name.length > 11
                  ? item.name.substring(0, 10)
                  : item.name}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Categories;
