/* eslint-disable react/prop-types */
import React from "react";
import ItemQuantity from "./ItemQuantity";
import OrderItems from "./OrderItems";

const OrderSummary = ({ cart, cart_details }) => {
	return cart_details ? (
		<div className=" w-full min-h-[200px] bg-[#FEFEFE] rounded-lg py-[26px] px-6 ">
			<p className="text-primary text-xl leading-6 font-medium  mt-3">
				Order Summary
			</p>
			<div className="mt-5">
				<OrderItems cart_details={cart_details} />
			</div>
			<div className="mt-8">
				<ItemQuantity cart_details={cart_details} />
			</div>
			<div className="mt-8">
				<p className="text-base leading-6 font-semibold text-secondary flex justify-between items-center mb-2">
					<span>Total</span>{" "}
					<span className=" flex flex-wrap items-center">
						<span className="text-sm leading-6 font-medium text-secondary mr-2">
							{cart.list_total?.currency}
						</span>
						<span className="text-base leading-6 font-semibold text-gray-600">
							{cart.list_total?.amount}
						</span>
					</span>
				</p>
				<p className="text-base leading-6 font-semibold text-secondary flex justify-between items-center mb-2">
					<span>Shipping</span>{" "}
					<span className=" flex flex-wrap items-center">
						<span className="text-sm leading-6 font-medium text-secondary mr-2">
							{cart.shipping_total?.currency}
						</span>
						<span className="text-base leading-6 font-semibold text-gray-600">
							{cart.shipping_total?.amount}
						</span>
					</span>
				</p>
				<p className="text-xl leading-6 font-semibold text-black flex justify-between items-center">
					<span>Subtotal</span>{" "}
					<span className=" flex flex-wrap items-center">
						<span className="text-sm leading-6 font-medium text-secondary mr-2">
							{cart.grand_total?.currency}
						</span>
						<span className="text-xl leading-6 font-semibold text-black">
							{cart.grand_total?.amount}
						</span>
					</span>
				</p>
			</div>
		</div>
	) : (
		<div className="  border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full mx-auto">
			<div className="animate-pulse flex space-x-4">
				<div className="flex-1 space-y-4 py-1">
					<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
					<div className="space-y-2">
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded"></div>
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
