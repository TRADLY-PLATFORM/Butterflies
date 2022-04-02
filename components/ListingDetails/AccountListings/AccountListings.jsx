import React from 'react';
import image1 from '../../../assets/Images/EventDetails/pexels-photo-789812 1-1.png';
import image2 from '../../../assets/Images/EventDetails/pexels-photo-789812 1-2.png';
import image3 from '../../../assets/Images/EventDetails/pexels-photo-789812 1.png';
import favorite from '../../../assets/Images/EventDetails/favourite.png';
import Image from 'next/image';
import { svgHeartIcon } from '../../Shared/Constant/Icons/Icons';

import { Swiper, SwiperSlide as div } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
import tradly from 'tradly';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import ListingCard from '../../Shared/Cards/ListingCard';
import { listingLike } from '../../../store/feature/listingSlice';
import Link from 'next/link';
import { check_login } from '../../../constant/check_auth';
import axios from 'axios';

const AccountListings = ({ account_id, account }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth_key, login } = useSelector(authSelector);

  const [account_listings, setAccount_listings] = useState(null);
  useEffect(() => {
    if (account_id) {
      axios
        .get('/api/l', {
          params: { page: 1, per_page: 30, account_id: account_id },
        })
        .then((res) => {
          setAccount_listings(res.data.listings);
        });
    }
  }, [account_id]);

  // Button Handle
  const like = (id, isLiked) => {
    if (check_login(router)) {
      dispatch(
        listingLike({
          id: id,
          isLiked: isLiked,
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          axios
            .get('/api/l', {
              params: { page: 1, per_page: 30, account_id: account_id },
            })
            .then((res) => {
              setAccount_listings(res.data.listings);
            });
        }
      });
    }
  };

  return (
    <>
      {account_listings !== null ? (
        account_listings?.length > 0 && (
          <div className=" w-[100%] ms:w-full min-h-[400px] p-[19px] bg-[#FFFFFF] rounded-md shadow-c-sm">
            <div className=" flex justify-between items-center">
              <p className=" caption font-semibold  text-[#222222] ">
                More from this account
              </p>
              <Link
                href={{
                  pathname: '/a/[id]',
                  query: {
                    id: account?.slug
                      ? account.slug
                      : `${account_id}-${account?.name.replace(/\s/g, '-')}`,
                    page: 1,
                  },
                }}
              >
                <a className="  px-8 py-2 flex  justify-center items-center  bg-primary text-[14px] text-[#FEFEFE]  rounded">
                  See All
                </a>
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-listing_card_2  md:grid-cols-listing_card_3   lg:grid-cols-listing_card_4  xl:grid-cols-listing_card_5  gap-5 justify-center">
              {account_listings?.map((item) => {
                return (
                  <div
                    className="  shadow-sm rounded   overflow-hidden"
                    key={Math.random() * 3000000}
                  >
                    <ListingCard item={item} like={like} />
                  </div>
                );
              })}
            </div>
          </div>
        )
      ) : (
        <div className="border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full  mx-auto overflow-hidden">
          <div className="flex  justify-between">
            <div className="h-8 bg-[#3B3269] bg-opacity-[20%] rounded  w-28"></div>
            <div className="h-8 bg-[#3B3269] bg-opacity-[20%] rounded w-28"></div>
          </div>
          <div className="animate-pulse mt-4  ">
            <div className="w-full  min-h-[210px] grid grid-cols-listing_card_2  md:grid-cols-listing_card_3   lg:grid-cols-listing_card_4  xl:grid-cols-listing_card_5  gap-5 justify-center">
              <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountListings;
