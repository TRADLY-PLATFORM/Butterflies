/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import {
  changeDateFormat,
  getThumbnailImage,
} from '../../Shared/Constant/Constant';
import { configsSelector } from '../../../store/feature/configsSlice';
import { authSelector } from '../../../store/feature/authSlice';
import { listingLike } from '../../../store/feature/listingSlice';
import { homeCollections } from '../../../store/feature/homeSlice';

import favorite from '../../../assets/Images/Home/favourite@3x.png';
import heartIcon from '../../../assets/Images/Home/heartIcon@3x.png';
// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const Listings = ({ products }) => {
  const { login, auth_key } = useSelector(authSelector);
  const { marketplace_type, marketplace_module } = useSelector(configsSelector);
  // const { isSuccess } = useSelector(listingSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const like = (id, isLiked) => {
    if (login) {
      dispatch(
        listingLike({
          id,
          isLiked,
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          dispatch(homeCollections({ authKey: auth_key }));
        }
      });
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center  ">
        <h2 className=" text-2xl text-black font-semibold">{products.title}</h2>
        <Link
          href={{
            pathname: '/l',
            query: { page: 1 },
          }}
          passHref
        >
          <a className=" block text-base text-primary font-semibold cursor-pointer">
            View All
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {products?.listings?.map((item, index) => {
          return (
              <Link href={`/l/${item.id}-${item.title.replace(/\W/g, '-')}`} key={index}>
              <a className="  w-full   px-4  mb-1 flex  items-center justify-start border border-transparent hover:border-gray-300  rounded-lg p-4 cursor-pointer">
                <img
                  src={item.images[0]}
                  alt="image"
                  className=" w-16 h-16 "
                />
                <div className="pl-7 ">
                  <h4 className="truncate text-sm font-semibold">
                    {item.title.length > 18
                      ? item.title.substring(0, 18) + '..'
                      : item.title}
                  </h4>
                  <p className="mb-0 text-second text-sm truncate">
                    <p className=" mt-1 flex items-center flex-wrap">
                      <span className="text-[10px] leading-4 font-medium text-gray-500">
                        {item.list_price.currency}
                      </span>
                      <span className="text-[14px] leading-4 font-medium text-gray-600 ml-1">
                        {item.list_price.amount}
                      </span>
                    </p>
                  </p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
