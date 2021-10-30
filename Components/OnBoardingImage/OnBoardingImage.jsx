import React from "react";
import onboardingImage from "../../assets/Images/signin/Group 379.svg";
import Image from "next/Image";
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const OnBoardingImage = () => {
	const sliderImage = [
		{
			image: onboardingImage,
			text: "Empowering Artisans, Farmers & Micro Business",
		},
		{
			image: onboardingImage,
			text: "Empowering Artisans, Farmers & Micro Business",
		},
		{
			image: onboardingImage,
			text: "Empowering Artisans, Farmers & Micro Business",
		},
	];
	return (
		<div className="  w-full h-full">
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
				{sliderImage?.map((list, i) => {
					return (
						<SwiperSlide key={i}  className=' w-full flex flex-col justify-center items-center'>
							<div className="mb-8">
								<Image
									src={list.image}
									alt="onboardingImage"
									width={480}
									height={480}
								/>
							</div>
							<div className=" w-80">
								<p className=" mb-14 text-2xl text-primary font-medium text-center">
									{list.text}
								</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default OnBoardingImage;
