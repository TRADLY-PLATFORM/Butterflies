import React from 'react';
import icon from "../../../assets/Images/Categories/pexels-photo-247878.png"
import Image from "next/image";

const ItemsSummary = () => {
    return (
		<div className=" w-full h-min-[300px] bg-white border-2 border-gray-300 rounded-lg p-7 border-opacity-40  ">
			<div className=" grid grid-cols-[40%,20%,20%,20%] pb-3 border-b-2 border-gray-400     bg-white z-20">
				<p className=" text-lg text-black font-semibold ">
					Items Summary
				</p>
				<p className=" text-lg text-black font-semibold  text-center">
					QTY
				</p>
				<p className=" text-lg text-black font-semibold  text-center">
					Price
				</p>
				<p className=" text-lg text-black font-semibold  text-center">
					Total Price
				</p>
			</div>
			<div>
				<div className=" grid grid-cols-[40%,20%,20%,20%] items-center py-3 border-b-2 border-gray-400 border-opacity-20">
					<div className=" flex items-center pl-1">
						<Image
							src={icon}
							width={50}
							height={50}
						/>
						<p className=" text-sm font-semibold  ml-3">
							Novels Book
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							X 1
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							50$
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							60$
						</p>
					</div>
				</div>
				<div className=" grid grid-cols-[40%,20%,20%,20%] items-center py-3 border-b-2 border-gray-400 border-opacity-20">
					<div className=" flex items-center pl-1">
						<Image
							src={icon}
							width={50}
							height={50}
						/>
						<p className=" text-sm font-semibold  ml-3">
							Novels Book
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							X 1
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							50$
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							60$
						</p>
					</div>
				</div>
				<div className=" grid grid-cols-[40%,20%,20%,20%] items-center py-3 border-b-2 border-gray-400 border-opacity-20">
					<div className=" flex items-center pl-1">
						<Image
							src={icon}
							width={50}
							height={50}
						/>
						<p className=" text-sm font-semibold  ml-3">
							Novels Book
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							X 1
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							50$
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							60$
						</p>
					</div>
				</div>
				<div className=" grid grid-cols-[40%,20%,20%,20%] items-center py-3 border-b-2 border-gray-400 border-opacity-20">
					<div className=" flex items-center pl-1">
						<Image
							src={icon}
							width={50}
							height={50}
						/>
						<p className=" text-sm font-semibold  ml-3">
							Novels Book
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							X 1
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							50$
						</p>
					</div>
					<div>
						<p className=" text-sm font-semibold  text-center">
							60$
						</p>
					</div>
				</div>
			</div>
		</div>
    );
};

export default ItemsSummary;