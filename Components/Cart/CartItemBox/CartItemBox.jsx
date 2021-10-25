import React from "react";

const CartItemBox = () => {
	return (
		<div className=" w-full border border-primary rounded-lg px-[24px] py-[16px] grid  grid-cols-[80%,10%] gap-[10%]">
			<div>
				<p className=" text-xs  font-semibold leading-6 text-primary">
					5 tickets left
				</p>
				<p className=" text-base text-black font-semibold mt-[2px]">
					Yoga Class For Beginner{" "}
				</p>
				<p className=" mt-[11px] text-secondary text-xs font-medium">
					$400
				</p>
			</div>
			<div>
				<div className=" min-w-[100px] h-[32px] border border-primary rounded-[2px]  flex justify-between items-center ">
					<button className=" w-[32px] h-[32px] bg-primary  rounded-l-sm flex justify-center items-center text-xl leading-6 font-medium text-white">
						-
					</button>
					<span className=" text-sm leading-4 font-medium text-[#4A4A4A]">
						5555
					</span>
					<button className="w-[32px] h-[32px] bg-primary  rounded-r-sm flex justify-center items-center text-xl leading-6 font-medium  text-white ">
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItemBox;
