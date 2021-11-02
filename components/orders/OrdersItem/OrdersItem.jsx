import React from 'react';
import icon from "../../../assets/Images/Categories/pexels-photo-247878.png"
import Image from "next/image";
import Link from "next/link";


const OrdersItem = () => {
    return (
		<div>
			<div className=" grid  grid-cols-[40%,20%,20%,20%]">
				<p className=" text-lg text-[#000000] text-opacity-40">
					Order history
				</p>
				<p className=" text-lg text-[#000000] text-opacity-40 text-center">
					Date
				</p>
				<p className=" text-lg text-[#000000] text-opacity-40 text-center">
					Price
				</p>
				<p className=" text-lg text-[#000000] text-opacity-40 text-center">
					Current Status
				</p>
			</div>
			<div className=" mt-8">
				<Link href="/orders/12" passHref={true}>
					<div className=" grid  grid-cols-[40%,20%,20%,20%] items-center bg-white shadow-c-sm rounded-lg mb-3 py-3 cursor-pointer">
						<div className=" flex   items-center ">
							<div className=" w-10 h-10 relative ml-8  mr-8">
								<Image
									src={icon}
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div>
								<p className=" text-lg font-semibold text-primary">
									First product
									name
								</p>

								<p className=" text-sm text-[#77869E] leading-4 flex flex-col mt-1">
									<span>
										#42222
									</span>
									<span>
										01/01/0222
									</span>
								</p>
							</div>
						</div>
						<div className="flex justify-center items-center">
							<p className=" text-sm text[#000000] text-opacity-50 leading-4 text-center">
								21 December 2019
							</p>
						</div>
						<div className="flex justify-center items-center">
							<p className=" text-center text-primary font-semibold text-lg">
								{" "}
								300$
							</p>
						</div>
						<div className="flex justify-center items-center">
							<button className=" px-6 py-1 rounded-lg border border-primary">
								Delivered
							</button>
						</div>
					</div>
				</Link>
				<div className=" grid  grid-cols-[40%,20%,20%,20%] items-center bg-white shadow-c-sm rounded-lg mb-3 py-3">
					<div className=" flex   items-center ">
						<div className=" w-10 h-10 relative ml-8  mr-8">
							<Image
								src={icon}
								layout="fill"
								objectFit="cover"
							/>
						</div>
						<div>
							<p className=" text-lg font-semibold text-primary">
								First product name
							</p>

							<p className=" text-sm text-[#77869E] leading-4 flex flex-col mt-1">
								<span>#42222</span>
								<span>01/01/0222</span>
							</p>
						</div>
					</div>
					<div className="flex justify-center items-center">
						<p className=" text-sm text[#000000] text-opacity-50 leading-4 text-center">
							21 December 2019
						</p>
					</div>
					<div className="flex justify-center items-center">
						<p className=" text-center text-primary font-semibold text-lg">
							{" "}
							300$
						</p>
					</div>
					<div className="flex justify-center items-center">
						<button className=" px-6 py-1 rounded-lg border border-primary">
							Delivered
						</button>
					</div>
				</div>
			</div>
		</div>
    );
};

export default OrdersItem;