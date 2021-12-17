/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import tradly from "tradly"

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
import { authSelector } from '../../../store/feature/authSlice';
import { listingLike } from '../../../store/feature/listingSlice';
import { homeCollections } from '../../../store/feature/homeSlice';

import favorite from '../../../assets/Images/Home/favourite@3x.png';
import heartIcon from '../../../assets/Images/Home/heartIcon@3x.png';
import AccountCard from '../../Shared/Cards/AccountCard';
// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const StoresForFollow = ({ stores }) => {

    	const { login, auth_key } = useSelector(authSelector);
      // const { isSuccess } = useSelector(listingSelector);
      const dispatch = useDispatch();
      const router = useRouter();

      const follow = (id, isFollow) => {
        if (login) {
          tradly.app.followUnfollowAccounts({
            id,
            authKey: auth_key,
            isFollowing: isFollow,
          }) 
          .then((res) => {
            if (!res.code) {
              dispatch(homeCollections({ authKey: auth_key }));
            }
          });
        } else {
          router.push('/sign-in');
        }
      };


  return (
    <div className="mt-10">
      <div className="flex justify-between items-center  ">
        <h2 className=" text-2xl text-black font-semibold">{stores.title}</h2>
        <Link
          href={{
            pathname: '/a',
            query: { page: 1 },
          }}
          passHref
        >
          <a  className=" block text-base text-primary font-semibold cursor-pointer">
            View All
          </a>
        </Link>
      </div>
      <div className=" mt-4 flex  justify-start ">
        <Swiper
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={16}
          loop={false}
          navigation={false}
          style={{ paddingBottom: '20px' }}
        >
          {stores?.accounts?.map((item) => (
            <SwiperSlide
              className=" w-[166px] h-[270px]    rounded mr-4 overflow-hidden"
              key={Math.random() * 3000000}
              style={{
                width: '190px',
                minHeight: '270px',
              }}
            >
              <AccountCard item={item} follow={follow}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StoresForFollow;
