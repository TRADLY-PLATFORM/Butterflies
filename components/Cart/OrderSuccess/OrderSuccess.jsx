import React from "react";
import Image from "next/image";
import Link from "next/link";
import successImage from "../../../assets/Images/success/Success.png";

const OrderSuccess = () => {
	return (
		<div className="bg-white shadow-c-sm w-full  xs:w-[450px] min-h-[250px] rounded-lg  p-[20px] xs:p-[30px]">
			<div className=" w-full flex  flex-col justify-center">
				<Image
					src={successImage}
					alt="Success Image"
					height={100}
					width={100}
					objectFit="contain"
				/>
				<p className="text-primary text-base font-semibold text-center">
					Thank you. Your Order is successful
				</p>
			</div>
			<div className="flex flex-col xs:flex-row  justify-between items-center">
				<Link href="/" passHref={true}>
					<button className="bg-primary mt-8 px-4 py-2 rounded text-base text-white font-medium ">
						Back To Home
					</button>
				</Link>
				<Link href="/orders?page=1" passHref={true}>
					<button className="bg-primary mt-8 px-4 py-2 rounded text-base text-white font-medium ">
						Go To Orders
					</button>
				</Link>
  			</div>
		</div>
	);
};

export default OrderSuccess;
