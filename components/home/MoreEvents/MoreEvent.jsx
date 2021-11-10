import React, {useState, useEffect } from "react";
import image1 from "../../../assets/Images/Home/pexels-photo-789812 1-1.png";
import image2 from "../../../assets/Images/Home/pexels-photo-789812 1-2.png";
import image3 from "../../../assets/Images/Home/pexels-photo-789812 1.png";
 import favorite from "../../../assets/Images/Home/favourite.png";
 import Image from "next/image";import { svgHeartIcon } from "../../Shared/Constant/Icons/Icons";


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
const MoreEvent = () => {
	const [filterEvent, setFilterEvent] = useState();
	const [extraWidth, setExtraWidth] = useState(0);
	


		useEffect(() => {
			const width = window.innerWidth;
			let calc;
			if (width < 768) {
				calc = Math.floor(width / 206);
			} else {
				calc = Math.floor((width - 245) / 206);
			}
			let extra = width - 245 - 206 * calc;
			const sliceEvent = events.slice(0, calc);
			setFilterEvent(sliceEvent);
			setExtraWidth(extra);
		}, []);

	return (
		<div className="mt-10">
			<div>
				<h2 className=" text-2xl text-black font-semibold">
					More Today
				</h2>
			</div>
			<div className=" mt-4 flex ">
				{filterEvent?.map((item) => {
					return (
						<div
							className=" w-[190px] h-[284px] shadow-c-sm rounded mr-4 overflow-hidden"
							key={Math.random() * 3000000}
						>
							<div className="w-[190px]  h-[190px] relative">
								<Image
									src={item.image}
									alt={item.name}
									layout="fill"
									objectFit="cover"
								/>
								<div className=" absolute w-full top-0   flex   justify-between pr-1">
									<div className=" mt-[9px]  flex   pl-[10px]  ">
										<p className=" text-white text-[10px] leading-3  font-semibold ml-1 mt-[1px]">
											{
												item.time
											}
										</p>
									</div>
									<div className="w-[40px] h-[40px] ">
										{item.in_like ? (
											<div className="w-[40px] h-[40px]  relative">
												<Image
													src={
														favorite
													}
													 layout="fill"
													alt="follow button"
													objectFit='cover'  
												/>
											</div>
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


