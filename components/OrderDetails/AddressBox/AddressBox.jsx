import React from "react";
import OrderDetails from "../../../pages/orders/[id]";

const AddressBox = ({ order_details }) => {
	const type = order_details?.shipping_method.type;
	let address;
	if (type === "pickup") {
		address = order_details?.pickup_address;
	} else {
		address = order_details?.shipping_address;
	}
	return (
		<div className="w-full h-min-[50px] bg-white border-2 border-gray-300 rounded-lg px-[30px]  py-5  border-opacity-40">
			<div className="flex  ">
				<p className=" text-lg text-black font-semibold   ">
					{order_details?.shipping_method.name} Address
				</p>
			</div>
			<div>
				{address?.country ? (
					<>
						<div className=" flex justify-start items-center py-1  ">
							<p className=" text-sm text-black font-semibold  ">
								City :
							</p>
							<p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
								{address.city}
							</p>
						</div>
						<div className=" flex justify-start items-center py-1  ">
							<p className=" text-sm text-black font-semibold  ">
								Country :
							</p>
							<p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
								{address.country}
							</p>
						</div>
						<div className=" flex justify-start items-center py-1  ">
							<p className=" text-sm text-black font-semibold  ">
								Postal Code :
							</p>
							<p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
								{address.postal_code}
							</p>
						</div>
						<div className=" flex justify-start items-center py-1  ">
							<p className=" text-sm text-black font-semibold  ">
								Full Address :
							</p>
							<p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
								{
									address.formatted_address
								}
							</p>
						</div>
					</>
				) : (
					"N/A"
				)}
			</div>
		</div>
	);
};

export default AddressBox;
