/* eslint-disable react/prop-types */
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import Image from "next/image"; // install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

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
								className= " ms:w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] relative bg-white"
							>
								<div className=" w-[100vw] h-[400px] ms:w-[400px] ms:h-[400px] lg:w-[500px] lg:h-[500px]  xl:w-[600px] xl:h-[600px] relative  ">
									<Image
										src={
											image
										}
										alt="details image"
										layout="fill"
										objectFit="cover"
										priority={
											true
										}
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
