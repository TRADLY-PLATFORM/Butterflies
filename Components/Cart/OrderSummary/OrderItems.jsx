import React from 'react';
import image from "../../../assets/Images/EventDetails/pexels-photo-789812 1-1.png"
import Image from "next/Image";
import { getThumbnailImage } from '../../Shared/Constant/Constant';

const OrderItems = ({ cart_details }) => {
	return (
		cart_details.map((item) => {
			return (
				<div
					className="w-full  bg-[#FFFFFF] rounded-lg shadow-c-sm   overflow-hidden flex  "
					key={item.id}
				>
					<div className=" w-[100px] h-[100px] relative mr-3 ">
						<Image
							src={getThumbnailImage(
								item.listing.images[0]
							)}
							layout="fill"
							objectFit="cover"
							alt="Order Items"
							priority={true}
						/>
					</div>
					<div className=" flex flex-col justify-around py-2">
						<div>
							<p className=" text-base  font-semibold text-black">
								{item.listing.title}
							</p>
						</div>
						<div>
							<p className=" text-base  font-medium text-secondary ">
								{
									item.listing
										.location
										.country
								}
							</p>
							<p className=" text-base  font-medium text-secondary ">
								<span>Quantity :</span>{" "}
								<span>
									{item.quantity}
								</span>{" "}
							</p>
						</div>
					</div>
				</div>
			);
		 })
	);
};

export default OrderItems;