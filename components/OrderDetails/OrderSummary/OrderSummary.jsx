import React from 'react';

const OrderSummary = () => {
    return (
		<div className="w-full h-min-[300px] bg-white border-2 border-gray-300 rounded-lg p-[30px] border-opacity-40">
			<div className="flex justify-between items-center">
				<p className=" text-lg text-black font-semibold   ">
					Order Summary
				</p>
				<button className=" bg-gray-200  px-6 py-2 rounded-lg text-primary font-semibold">
					Processing
				</button>
			</div>
			<div>
				<div className=" flex justify-between items-center py-4  ">
					<p className=" text-sm text-black font-semibold  ">
						Order Created
					</p>
					<p className=" text-sm text-black font-semibold   text-opacity-70">
						Sun, May 07 , 2021
					</p>
				</div>
				<div className=" flex justify-between items-center py-4  ">
					<p className=" text-sm text-black font-semibold  ">
						Order Time
					</p>
					<p className=" text-sm text-black font-semibold   text-opacity-70">
						05:44 AM
					</p>
				</div>
				<div className=" flex justify-between items-center py-4  ">
					<p className=" text-sm text-black font-semibold  ">
						Subtotal
					</p>
					<p className=" text-sm text-black font-semibold   text-opacity-70">
						$300
					</p>
				</div>
				<div className=" flex justify-between items-center py-4  ">
					<p className=" text-sm text-black font-semibold  ">
						Delivery Fee
					</p>
					<p className=" text-sm text-black font-semibold   text-opacity-70">
						$0
					</p>
				</div>
			</div>
		</div>
    );
};

export default OrderSummary;