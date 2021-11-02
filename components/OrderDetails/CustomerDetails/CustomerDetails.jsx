import React from "react";
import icon from "../../../assets/Images/Categories/pexels-photo-247878.png";
import Image from "next/image";

const CustomerDetails = () => {
	return (
		<div className=" w-full h-min-[300px] bg-white border-2 border-gray-300 rounded-lg p-7  border-opacity-40 ">
			<div className="  pb-3 border-b-2 border-gray-400     bg-white z-20">
				<p className=" text-lg text-black font-semibold   ">
					Customer And Order Details
				</p>
			</div>
			<div>
				<div className=" flex justify-between items-center py-4 border-b-2 border-gray-400 border-opacity-20">
					<p className=" text-sm text-black font-semibold  ml-3">
						Customer Name
					</p>
					<p className=" text-sm text-black font-semibold  mr-3 text-opacity-70">
						Ahsan Ullah
					</p>
				</div>
				<div className=" flex justify-between items-center py-4 border-b-2 border-gray-400 border-opacity-20">
					<p className=" text-sm text-black font-semibold  ml-3">
						Phone Number
					</p>
					<p className=" text-sm text-black font-semibold  mr-3 text-opacity-70">
						01872****
					</p>
				</div>
				<div className=" flex justify-between items-center py-4 border-b-2 border-gray-400 border-opacity-20">
					<p className=" text-sm text-black font-semibold  ml-3">
						Shipping Method
					</p>
					<p className=" text-sm text-black font-semibold  mr-3 text-opacity-70">
						Delivery
					</p>
				</div>
				<div className=" flex justify-between items-center py-4   border-opacity-20">
					<p className=" text-sm text-black font-semibold  ml-3">
						Note
					</p>
					<p className=" text-sm text-black font-semibold  mr-3 text-opacity-70">
						N/A
					</p>
				</div>
			</div>
		</div>
	);
};

export default CustomerDetails;
