/* eslint-disable react/prop-types */
import React from 'react';

const TotalAmountBox = ({ order_details }) => {
	return (
		<div className="w-full h-min-[50px] bg-white  shadow-c-sm rounded-lg px-[30px]  border-opacity-40">
			<div className=" flex justify-between items-center py-4  ">
				<p className=" text-sm text-black font-semibold  ">
					Total
				</p>
				<p className=" text-sm text-black font-semibold   text-opacity-70 flex flex-wrap">
					<span className=" text-xm  font-normal">
						{order_details?.grand_total.currency}
					</span>
					<span className=" ml-2">
						{order_details?.grand_total.amount}
					</span>
				</p>
			</div>
		</div>
	);
};

export default TotalAmountBox;