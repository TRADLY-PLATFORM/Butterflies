/* eslint-disable react/prop-types */
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import Swiper core and required modules
import Image from 'next/image'; // install Swiper modules

const ImagePart = ({ images }) => {
  return (
    <div className=" w-[100%]  ms:w-[400px] ms:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] ">
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
              <SwiperSlide
                key={i}
                className=" ms:w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] relative bg-white rounded-md overflow-hidden "
              >
                <div className="  ">
                  <img
                    src={image}
                    alt="details image"
                    layout="fill"
                    className="w-[100vw] h-[400px] ms:w-[400px] ms:h-[400px] lg:w-[500px] lg:h-[500px]  xl:w-[600px] xl:h-[600px] relative  rounded-md overflow-hidden  shadow-c-sm"
                    objectFit="cover"
                    priority={true}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] bg-[#3B3269] bg-opacity-[10%] animate-pulse"></div>
      )}
    </div>
  );
};

export default ImagePart;
