/* eslint-disable react/prop-types */
import React from "react";
 import Image from "next/image";
 
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const Banner = ({ banners }) => {
	// const banner = [
	// 	{ name: "Pitching Event Online", image: bannerImage },
	// 	{ name: "Pitching Event Online", image: bannerImage },
	// 	{ name: "Pitching Event Online", image: bannerImage },
	// 	{ name: "Pitching Event Online", image: bannerImage },
	// ];
	return (
		<div className=" w-full   h-auto mb-9 mx-auto">
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
							<div className=" w-full h-[200px] relative rounded-lg overflow-hidden">
								<Image
									src={
										banner.image_path
									}
									alt="Banner Image"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							{/* <div className=" absolute top-0  left-0  mt-[50px]   ml-6">
								<p className=" text-2xl text-white font-semibold">
									{banner.name}
								</p>
								<button className=" mt-5  w-28 h-6 flex justify-center items-center bg-primary text-white font-semibold  text-xs  rounded-xl">
									Register Here
								</button>
							</div> */}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Banner;
