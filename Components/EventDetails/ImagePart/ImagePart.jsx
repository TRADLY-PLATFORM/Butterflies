import React from 'react';
import image from "../../../assets/Images/EventDetails/pexels-photo-789812 1.png"
import image1 from "../../../assets/Images/EventDetails/pexels-photo-789812 1.png"
import image2 from "../../../assets/Images/EventDetails/pexels-photo-789812 1.png"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import Image from 'next/Image';
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const ImagePart = ({ images }) => {
 	return (
		<div className=" w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] bg-white">
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
							className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] relative"
						>
							<div className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] relative">
								<Image
									src={image}
									alt="details image"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default ImagePart;