/* eslint-disable react/prop-types */
import React from "react";
 
const CustomerDetails = ({ order_details }) => {
	const customer = order_details?.user;
	return (
		 <div className=" w-full h-min-[300px] bg-white shadow-c-sm rounded-lg  p-7  border-opacity-40 ">
			<div className="  pb-3 border-b-2 border-gray-400     bg-white z-20">
				<p className=" text-lg text-black font-semibold   ">
					Customer And Order Details
				</p>
			</div>
			<div>
				<div className="  grid grid-cols-2 sm:flex justify-between items-center py-4 border-b-2 border-gray-400 border-opacity-20">
					<p className=" text-sm text-black font-semibold  ml-3">
						Customer Name
					</p>
					<p className=" text-sm text-black font-semibold  mr-3 text-opacity-70  text-right">
						{`${customer?.first_name}  ${customer?.last_name}`}
					</p>
				</div>
				<div className="  grid grid-cols-[100%] sm:flex justify-between items-center py-4 border-b-2 border-gray-400 border-opacity-20">
					<p className=" text-sm text-black font-semibold  ml-3">
						Email Address
					</p>
					<p className=" text-sm text-black font-semibold ml-5 mt-3 sm:ml-0   sm:mr-3 text-opacity-70">
						 {customer?.email}
					</p>
				</div>
				<div className=" flex justify-between items-center py-4 border-b-2 border-gray-400 border-opacity-20">
					<p className=" text-sm text-black font-semibold  ml-3">
						Shipping Method
					</p>
					<p className=" text-sm text-black font-semibold  mr-3 text-opacity-70">
						{order_details?.shipping_method.name}
					</p>
				</div>
				<div className=" flex justify-between items-center py-4   border-opacity-20">
					<p className=" text-sm text-black font-semibold  ml-3">
						 Payment Status
					</p>
					<p className=" text-sm text-black font-semibold  mr-3 text-opacity-70">
						Complete
					</p>
				</div>
			</div>
		</div>
	);
};

export default CustomerDetails;
