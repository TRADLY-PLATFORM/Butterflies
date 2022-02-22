/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import tradly from 'tradly';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const Banner3 = ({ banners }) => {
  return (
    <>
      <div className=" hidden md:block w-full   h-auto mb-9 mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
        >
          {banners?.map((banner, i) => {
            return (
              banner.medium == 'web' && (
                <SwiperSlide
                  key={i}
                  className=" w-full flex flex-col justify-center items-center mb-14"
                >
                  <div className="w-full h-[200px] md:h-[350px] relative rounded-lg overflow-hidden">
                    <Image
                      src={banner.image_path}
                      alt="Banner Image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              )
            );
          })}
        </Swiper>
      </div>
      <div className=" block md:hidden w-full   h-auto mb-9 mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
        >
          {banners?.map((banner, i) => {
            return (
              banner.medium == 'app' && (
                <SwiperSlide
                  key={i}
                  className=" w-full flex flex-col justify-center items-center mb-14"
                >
                  <div className=" w-full h-full aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden">
                    <Image
                      src={banner.image_path}
                      alt="Banner Image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              )
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Banner3;

// w-full h-[200px] md:h-[400px]  relative rounded-lg overflow-hidden
