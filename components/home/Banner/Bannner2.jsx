/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';

const Banner2 = ({}) => {
  const [banners, setBanners] = useState(null);
  useEffect(() => {
    const medium = window.innerWidth > 850 ? 'web' : 'app';
    axios.get(`/api/banners`, { params: { medium } }).then((res) => {
      setBanners(res.data.promo_banners);
    });
  }, []);

  if (!banners?.length) return null;

  return (
    <div className="h-auto mb-9 mx-auto">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i} className="w-full flex flex-col justify-center items-center">
            <div className="relative">
              <img
                src={banner.image_path}
                alt="Banner"
                className="w-full object-contain rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner2;
