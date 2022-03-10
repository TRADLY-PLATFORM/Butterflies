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
import axios from 'axios';
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const Banner3 = ({}) => {
  const [banners, setBanners] = useState(null);
  useEffect(() => {
    window.innerWidth > 850
      ? axios
          .get(`/api/banners`, {
            params: { medium: 'web', placement: 'footer' },
          })
          .then((res) => {
            setBanners(res.data.promo_banners);
          })
      : axios
          .get(`/api/banners`, {
            params: { medium: 'app', placement: 'footer' },
          })
          .then((res) => {
            setBanners(res.data.promo_banners);
          });
  }, [0]);
  return (
    <>
      <div className="     h-auto mb-9 mx-auto">
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
              <SwiperSlide
                key={i}
                className=" w-full flex flex-col justify-center items-center mb-14"
              >
                <div className="  relative   ">
                  <img
                    src={banner.image_path}
                    alt="Banner Image"
                    className="w-full  object-contain  rounded-lg "
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Banner3;

// w-full h-[200px] md:h-[400px]  relative rounded-lg overflow-hidden
