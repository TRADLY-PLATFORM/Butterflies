/* eslint-disable react/prop-types */
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import Image from 'next/image'; // install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const CustomImagePart = ({ images }) => {
  return (
    <div className=" w-[100%]   ">
      {images ? (
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
          {images?.map((image, i) => {
            return (
              <SwiperSlide key={i} className="    relative bg-white">
                <div className="  ">
                  <img
                    src={image}
                    alt="details image"
                    layout="fill"
                    className=" w-full relative  rounded-md overflow-hidden  shadow-c-sm object-cover "
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="  aspect-h-1 aspect-w-1 bg-[#3B3269] bg-opacity-[10%] animate-pulse"></div>
      )}
    </div>
  );
};

export default CustomImagePart;
