import React from 'react';

const AddressBox = () => {
    return (
		<div className="w-full h-min-[50px] bg-white border-2 border-gray-300 rounded-lg px-[30px]  py-5  border-opacity-40">
			<div className="flex  ">
				<p className=" text-lg text-black font-semibold   ">
					Delivery Address
				</p>
			</div>
			<div>
				<div className=" flex justify-start items-center py-1  ">
					<p className=" text-sm text-black font-semibold  ">
						City :
					</p>
					<p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
						Rangpur
					</p>
				</div>
				<div className=" flex justify-start items-center py-1  ">
					<p className=" text-sm text-black font-semibold  ">
						Country :
					</p>
					<p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
						Bangladesh
					</p>
				</div>
				<div className=" flex justify-start items-center py-1  ">
					<p className=" text-sm text-black font-semibold  ">
						Postal Code :
					</p>
					<p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
						1234
					</p>
				</div>
				<div className=" flex justify-start items-center py-1  ">
					<p className=" text-sm text-black font-semibold  ">
						Full Address :
					</p>
					<p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
						Rabgpur city, Bangladesh
					</p>
				</div>
			</div>
		</div>
    );
};

export default AddressBox;