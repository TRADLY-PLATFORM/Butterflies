import React from 'react';

const ItemQuantity = ({ cart_details }) => {
	return (
		cart_details.map((item) => {
			return (
				<div
					className=" w-full min-h-[57px] bg-[#FFFFFF] border border-primary rounded-lg  px-4 py-5 mb-3 "
					key={item.id}
				>
					<p className=" text-sm leading-4 font-semibold text-[#4F4F4F] ">
						<span>{item.quantity}</span>
						<span className="ml-2">X</span>
						<span className="ml-2">
							{item.listing.title}
						</span>
					</p>
				</div>
			);
		})
	);
};

export default ItemQuantity;