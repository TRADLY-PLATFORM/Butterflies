import Image from "next/Image";
import Link from "next/Link";
import React from "react";
import noCartIcon from "../../../assets/Images/cart/Nocart.png";

const NoCartItem = () => {
	return (
		<div className="  min-h-screen    ">
			<div className=" mt-8 w-full  md:w-[600px] min-h-[300px] py-10 bg-white shadow-c-sm  flex flex-col justify-center items-center mx-auto">
				<div>
					<Image
						src={noCartIcon}
						width={250}
						height={250}
						alt="No Item"
					/>
				</div>
				<p className="text-base font-semibold text-primary mt-4">
					No Items in Cart List.
				</p>
				<Link href="/">
					<button className=" mt-4 px-6 py-2 bg-primary rounded-lg text-white text-base font-semibold">
						Back To Home
					</button>
				</Link>
			</div>
		</div>
	);
};

export default NoCartItem;
