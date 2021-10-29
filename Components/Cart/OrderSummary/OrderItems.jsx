import React from 'react';
import image from "../../../assets/Images/EventDetails/pexels-photo-789812 1-1.png"
import Image from "next/Image";

const OrderItems = () => {
    return (
		<div className="w-full  bg-[#FFFFFF] rounded-lg shadow-c-sm   overflow-hidden flex  ">
			<div className=" w-[100px] h-[100px] relative mr-3 ">
				<Image
					src={image}
					layout="fill"
					objectFit="cover"
					alt="Order Items"
					priority={true}
				/>
			</div>
			<div className=" flex flex-col justify-around">
				<div>
					<p className=" text-base  font-semibold text-black">
						Lorem Input
					</p>
				</div>
				<div>
					<p className=" text-base  font-medium text-secondary ">
						 alaka
					</p>
					<p className=" text-base  font-medium text-secondary ">
						<span>Quantity :</span> <span>1</span>{" "}
					</p>
				</div>
			</div>
		</div>
    );
};

export default OrderItems;