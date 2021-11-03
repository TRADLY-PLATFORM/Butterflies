import React from 'react';
import { changeDateFormat } from '../../Shared/Constant/Constant';
import { orderStatus } from '../../Shared/Constant/Status';

const OrderSummary = ({ order_details }) => {
	return (
		<div className="w-full h-min-[300px] bg-white border-2 border-gray-300 rounded-lg p-[30px] border-opacity-40">
			<div className="flex justify-between items-center">
				<p className=" text-lg text-black font-semibold   ">
					Order Summary
				</p>
				<button className=" bg-gray-200  px-6 py-2 rounded-lg text-primary font-semibold">
					{orderStatus(order_details?.order_status)}
				</button>
			</div>
			<div>
				<div className=" flex justify-between items-center py-4  ">
					<p className=" text-sm text-black font-semibold  ">
						Order Created
					</p>
					<p className=" text-sm text-black font-semibold   text-opacity-70">
						{changeDateFormat(
							order_details?.created_at,
							"DD/MM/YYYY"
						)}
					</p>
				</div>
				<div className=" flex justify-between items-center py-4  ">
					<p className=" text-sm text-black font-semibold  ">
						Order Time
					</p>
					<p className=" text-sm text-black font-semibold   text-opacity-70">
						{changeDateFormat(
							order_details?.created_at,
							"hh:mm A"
						)}
					</p>
				</div>
				<div className=" flex justify-between items-center py-4  ">
					<p className=" text-sm text-black font-semibold  ">
						Subtotal
					</p>
					<p className=" text-sm text-black font-semibold   text-opacity-70">
						{order_details?.list_total.formatted}
					</p>
				</div>
				<div className=" flex justify-between items-center py-4  ">
					<p className=" text-sm text-black font-semibold  ">
						Delivery Fee
					</p>
					<p className=" text-sm text-black font-semibold   text-opacity-70">
						{order_details?.shipping_total.formatted}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;