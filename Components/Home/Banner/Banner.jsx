import React from 'react';
import bannerImage from "../../../assets/Images/Banner/Rectangle.png"
import Image from "next/Image";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);


const Banner = () => {
    const banner = [
       { name:"Pitching Event Online",image:bannerImage},
       { name:"Pitching Event Online",image:bannerImage},
       { name:"Pitching Event Online",image:bannerImage},
       { name:"Pitching Event Online",image:bannerImage},
     ]
    return (
		<div className=" max-w-6xl  h-44">
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
				{banner?.map((list, i) => {
					return (
						<SwiperSlide
							key={i}
							className=" w-full flex flex-col justify-center items-center"
						>
							<div className=" w-full h-full mb-14">
								<Image
									src={list.image}
									alt="onboardingImage"
									layout="responsive"
									width={1152}
									height={176}
								/>
							</div>
							<div className=" absolute top-0  left-0 mt-12  ml-6">
								<p className=" text-2xl text-white font-semibold">
									{list.name}
                                </p>
                                <button className=" mt-5  w-28 h-6 flex justify-center items-center bg-primary text-white font-semibold  text-xs  rounded-xl">Register Here</button>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
    );
};

export default Banner;