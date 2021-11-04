import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import {
	changeOrderStatus,
	get_order_details,
} from "../../../store/feature/orderSlice";
import { changeDateFormat } from "../../Shared/Constant/Constant";
import { changeStatus, orderStatus } from "../../Shared/Constant/Status";

const OrderSummary = ({ order_details }) => {
	const dispatch = useDispatch();
	const { auth_key } = useSelector(authSelector);
	const status_change = (e, order_details) => {
		dispatch(
			changeOrderStatus({
				authKey: auth_key,
				id: order_details.id,
				sendData: {
					order: {
						status: e.target.value,
					},
				}
			})
		);
		dispatch(
			get_order_details({
				authKey: auth_key,
				id: order_details.id,
			})
		);
	};
	return (
		<div className="w-full h-min-[300px] bg-white  shadow-c-sm rounded-lg p-[30px] border-opacity-40">
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
						{
							order_details?.shipping_total
								.formatted
						}
					</p>
				</div>
			</div>
			<div className=" flex justify-between items-center mt-3">
				<button className="bg-primary px-2 py-2 rounded-md text-white">
					View Order History
				</button>

				<select
					class="
                    block
                      w-[150px] sm:w-[200px]
                    
                    rounded-lg
                    bg-primary
                    border-transparent
                     text-white
                  "
 					onChange={(e) =>
						status_change(e, order_details)
					}
				>
					<option value="" disabled selected hidden>
						Change Status
					</option>
					{order_details?.next_status.map((status) => {
						return (
							<option value={status}>
								{changeStatus(status)}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default OrderSummary;
