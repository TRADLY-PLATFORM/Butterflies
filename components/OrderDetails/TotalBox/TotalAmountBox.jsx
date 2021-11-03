import React from 'react';

const TotalAmountBox = ({ order_details }) => {
	return (
		<div className="w-full h-min-[50px] bg-white border-2 border-gray-300 rounded-lg px-[30px]  border-opacity-40">
			<div className=" flex justify-between items-center py-4  ">
				<p className=" text-sm text-black font-semibold  ">
					Total
				</p>
				<p className=" text-sm text-black font-semibold   text-opacity-70">
					{order_details?.grand_total.formatted}
				</p>
			</div>
		</div>
	);
};

export default TotalAmountBox;