import React from "react";
import icon from "../../../assets/Images/Categories/pexels-photo-247878.png";
import Image from "next/image";
 import { getThumbnailImage } from "../../Shared/Constant/Constant";

const ItemsSummary = ({ order_details }) => {
	const OrderDetails = order_details?.order_details;
	return (
		<div className=" w-full h-min-[300px] bg-white border-2 border-gray-300 rounded-lg p-7 border-opacity-40  ">
			<div className=" grid  grid-cols-[50%,20%,30%] md:grid-cols-[40%,20%,20%,20%] pb-3 border-b-2 border-gray-400     bg-white z-20">
				<p className=" text-sm sm:text-lg text-black font-semibold ">
					Items Summary
				</p>
				<p className="  text-sm sm:text-lg text-black font-semibold  text-center">
					QTY
				</p>
				<p className=" hidden md:block text-lg text-black font-semibold  text-center">
					Price
				</p>
				<p className="text-sm sm:text-lg text-black font-semibold  text-center">
					Total Price
				</p>
			</div>
			<div>
				{OrderDetails?.map((item, index) => {
					return (
						<div
							className={[
								" grid  grid-cols-[50%,20%,30%]   md:grid-cols-[40%,20%,20%,20%] items-center py-3 ",
								index !==
									OrderDetails.length -
										1 &&
									"border-b-2 border-gray-400 border-opacity-20",
							].join(" ")}
						>
							<div
								className=" flex items-center pl-1"
								key={item.id}
							>
								<Image
									src={getThumbnailImage(
										item
											?.listing
											.images[0]
									)}
									width={50}
									height={50}
									objectFit="contain"
								/>
								<p className=" text-sm font-semibold  ml-3">
									{
										item
											.listing
											.title
									}
								</p>
							</div>
							<div>
								<p className=" text-sm font-semibold  text-center">
									X {item.quantity}
								</p>
							</div>
							<div className=" hidden md:block">
								<p className=" text-sm font-semibold  text-center">
									{
										item
											.list_price
											.formatted
									}
								</p>
							</div>
							<div>
								<p className=" text-sm font-semibold  text-center">
									{
										item
											.list_price
											.formatted
									}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ItemsSummary;
