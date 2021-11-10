/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
 const StoreNameBox = ({ account }) => {
	return (
		<div className=" bg-white rounded  w-full  min-h-[81px] flex   justify-between items-center  p-[16px] shadow-c-sm">
			<div className="flex items-center">
				<div className="flex justify-start items-start w-[32px] h-[32px] rounded-full overflow-hidden relative">
					<Image
						src={account.images[0]}
						alt="store Image"
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div className="ml-[10px] ">
					<p className="text-base leading-4 text-[#121212] font-medium">
						{account.name}
					</p>
				</div>
			</div>
			<div className="  flex justify-center  float-right">
				<button className=" bg-primary rounded w-[66px] h-[24px] flex justify-center items-center  text-xs leading-3 text-white font-semibold ">
					Follow
				</button>
			</div>
		</div>
	);
};

export default StoreNameBox;