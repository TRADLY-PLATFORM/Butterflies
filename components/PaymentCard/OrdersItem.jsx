/* eslint-disable react/prop-types */
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "../../store/feature/cartSlice";

const OrdersItem = ({ cart, cart_details }) => {
	const router = useRouter();
 	const { client_secret } = useSelector(cartSelector);

	return client_secret ? (
		<div className="  w-[400px]  lg:w-[500px] ">
			<div>
				<button className="flex text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-primary  mr-3"
						fill="none "
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Go to home
				</button>
			</div>
			<div className="mt-4">
				<p className="text-lg font-semibold text-primary mt-6">
					{cart_details[0]?.listing.title}
				</p>
				<p className="text-lg font-semibold text-primary mt-2">
					{cart?.grand_total.formatted}
				</p>
			</div>
			<div className="flex justify-center mt-5 rounded-lg overflow-hidden h-[350px] w-[350px] mx-auto">
				<Image
					src={cart_details[0].listing.images[0]}
					alt="Product"
					height={350}
					width={350}
					objectFit="cover"
				/>
			</div>
		</div>
	) : (
		<div className="border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full h-full mx-auto ">
			<div className="animate-pulse flex space-x-4 mt-5">
				<div className="flex-1 space-y-4 py-1">
					<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
					<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
					<div className="space-y-2">
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-[90%]"></div>
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
						<div className="h-[350px] width-[350px] bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default OrdersItem;
