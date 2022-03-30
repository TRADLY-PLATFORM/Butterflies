import React from 'react';
import image1 from '../../../assets/Images/EventDetails/pexels-photo-789812 1-1.png';
import image2 from '../../../assets/Images/EventDetails/pexels-photo-789812 1-2.png';
import image3 from '../../../assets/Images/EventDetails/pexels-photo-789812 1.png';
import favorite from '../../../assets/Images/EventDetails/favourite.png';
import Image from 'next/image';
import { svgHeartIcon } from '../../Shared/Constant/Icons/Icons';

import { Swiper, SwiperSlide } from 'swiper/react';

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

const RelatedListings = ({listing_details}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth_key, login } = useSelector(authSelector);

  const [related_listings, setRelated_listings] = useState(null);
  useEffect(() => {
    if (listing_details) {
      axios
        .get('/api/l/similar', {
          params: {
            page: 1,
            per_page: 30,
            id: listing_details?.id,
          },
        })
        .then((res) => {
          setRelated_listings(res.data.listings);
        });
    }
  }, [listing_details]);

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
            .get('/api/l/similar', {
              params: {
                page: 1,
                per_page: 30,
                id: listing_details.id,
              },
            })
            .then((res) => {
              setRelated_listings(res.data.listings);
            });
        }
      });
    }
  };

  return (
    <>
      {related_listings !== null ? (
        related_listings?.length > 0 && (
          <div className="w-full h-[400px] p-[19px] bg-[#FFFFFF] rounded-md shadow-c-sm">
            <div className=" flex justify-between items-center">
              <p className=" caption font-semibold  text-[#222222] ">
                You may also like
              </p>
              <Link
                href={{
                  pathname: `/l/similar/${listing_details?.id}`,
                  query: { page: 1 },
                }}
              >
                <a className="  px-8 py-2 flex  justify-center items-center  bg-primary text-[14px] text-[#FEFEFE]  rounded">
                  See All
                </a>
              </Link>
            </div>
            <div className="mt-8 ">
              <Swiper
                slidesPerView={'auto'}
                slidesPerGroup={1}
                spaceBetween={16}
                loop={false}
                navigation={false}
                style={{ paddingBottom: '20px' }}
              >
                {related_listings?.map((item) => {
                  return (
                    <SwiperSlide
                      className=" w-[190px] h-[284px]  shadow-sm   rounded mr-4 overflow-hidden"
                      key={Math.random() * 3000000}
                      style={{
                        width: '190px',
                      }}
                    >
                      <ListingCard item={item} like={like} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        )
      ) : (
        <div className="border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full mx-auto overflow-hidden">
          <div className="flex  justify-between">
            <div className="h-8 bg-[#3B3269] bg-opacity-[20%] rounded  w-28"></div>
            <div className="h-8 bg-[#3B3269] bg-opacity-[20%] rounded w-28"></div>
          </div>
          <div className="animate-pulse mt-4 flex space-x-4">
            <Swiper
              slidesPerView={'auto'}
              slidesPerGroup={1}
              spaceBetween={16}
              loop={false}
              navigation={false}
              style={{ paddingBottom: '20px' }}
            >
              <SwiperSlide
                style={{
                  width: '190px',
                }}
              >
                <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: '190px',
                }}
              >
                <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: '190px',
                }}
              >
                <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: '190px',
                }}
              >
                <div className="w-[190px] h-[220px] bg-[#3B3269] bg-opacity-[20%] rounded  "></div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedListings;
