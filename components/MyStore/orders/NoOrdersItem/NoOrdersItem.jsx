import React from "react";
import Image from "next/image";
import Link from "next/link";
import  CartIcon from "../../../../assets/Images/Cart/Nocart.png";

const NoOrdersItem = () => {
	return (
		<div className="  min-h-screen    ">
			<div className=" mt-8 w-full  md:w-[600px] min-h-[300px] py-10 bg-white shadow-c-sm  flex flex-col justify-center items-center mx-auto">
				<div>
					<Image
						src={CartIcon}
						width={250}
						height={250}
						alt="No Item"
						objectFit="contain"
					/>
				</div>
				<p className="text-base font-semibold text-primary mt-4">
					No Items in Orders List.
				</p>
				<Link href="/" passHref={true}>
					<button className=" mt-4 px-6 py-2 bg-primary rounded-lg text-white text-base font-semibold">
						Back To Home
					</button>
				</Link>
			</div>
		</div>
	);
};

export default NoOrdersItem;
