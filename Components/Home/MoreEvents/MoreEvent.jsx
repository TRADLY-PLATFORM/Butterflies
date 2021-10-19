import React from "react";
import image1 from "../../../assets/Images/Home/pexels-photo-789812 1-1.png";
import image2 from "../../../assets/Images/Home/pexels-photo-789812 1-2.png";
import image3 from "../../../assets/Images/Home/pexels-photo-789812 1.png";
import locationMarker from "../../../assets/Images/Home/locationMarker.svg";
import favorite from "../../../assets/Images/Home/favourite@3x.png";
import heartIcon from "../../../assets/Images/Home/heartIcon@3x.png";
import Image from "next/Image";
import { svgHeartIcon } from "../../../Constant/Icons/Icons";

const MoreEvent = () => {
	const events = [
		{
			image: image1,
			time: "15 hours ago",
			name: "Yoga Class For beginner",
			price: "Starting at ‘500",
			store_name: "Name Here",
			follower: "4.5k Followers ",
			city: "Indonesia",
			in_like: true,
		},
		{
			image: image2,
			time: "15 hours ago",
			name: "Explore Jakarta",
			price: "Starting at ‘500",
			store_name: "Name Here",
			follower: "4.5k Followers ",
			city: "Indonesia",
			in_like: false,
		},
		{
			image: image3,
			time: "15 hours ago",
			name: "Webinar Startup Industries",
			price: "Starting at ‘500",
			store_name: "Name Here",
			follower: "4.5k Followers ",
			city: "Indonesia",
			in_like: true,
		},
	];
	return (
		<div className="mt-10">
			<div>
				<h2 className=" text-2xl text-black font-semibold">
					More Today
				</h2>
			</div>
			<div className=" mt-4 flex ">
				{events.map((item) => {
					return (
						<div
							className=" w-[190px] h-[249px] shadow-c-sm rounded mr-4 overflow-hidden"
							key={Math.random() * 3000000}
						>
							<div className="w-full  h-[155px] relative">
								<Image
									src={item.image}
									alt={item.name}
									width={190}
									heigh={155}
								/>
								<div className=" absolute w-full top-0   flex   justify-between pr-1">
									<div className=" mt-[9px]  flex   pl-[10px]  ">
										 
										<p className=" text-white text-[10px] leading-3 font-medium ml-1 mt-[1px]">
											{
												item.time
											}
										</p>
									</div>
									<div>
										{item.in_like ? (
											<Image
												src={
													favorite
												}
												alt="follow button"
												width={
													40
												}
												height={
													40
												}
											/>
										) : (
											svgHeartIcon
										)}
									</div>
								</div>
							</div>
							 
							<div className="mt-2 pl-2">
								<p className=" text-xs leading-[15px] font-semibold text-primary">
									{item.name}
								</p>
								<p className=" text-[10px] leading-4 font-medium text-gray-500 mt-1">
									{item.price}
								</p>
							</div>
							<div className=" pl-2 mt-4 mb-[14px] flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div className="ml-1">
									<p className=" text-[10px]  leading-3 text-gray-900 font-medium">
										{
											item.store_name
										}
									</p>
									 
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MoreEvent;


