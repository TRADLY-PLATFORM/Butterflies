import React from "react";
import ItemQuantity from "./ItemQuantity";
import OrderItems from "./OrderItems";

const OrderSummary = () => {
	return (
		<div className=" w-full min-h-[200px] bg-[#FEFEFE] rounded-lg py-[26px] px-6 ">
			<p className="text-primary text-xl leading-6 font-medium  mt-3">
				Order Summary
			</p>
			<div className="mt-5">
				<OrderItems />
			</div>
			<div className="mt-8">
				<ItemQuantity />
			</div>
			<div className="mt-8">
				<p className="text-xl leading-6 font-semibold text-black flex justify-between items-center">
					<span>Total</span> <span>100 Taka</span>
				</p>
			</div>
		</div>
	);
};

export default OrderSummary;
