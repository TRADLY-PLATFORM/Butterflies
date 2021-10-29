import React from "react";

const CartItemBox = () => {
	return (
		<div className=" w-full border border-primary rounded-lg px-[24px] py-[16px] grid  grid-cols-[100%] lg:grid-cols-[60%,20%] gap-[10%]">
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
			<div className=" mb-6 lg:mb-0 flex items-center justify-around">
				<div className=" min-w-[100px] h-[32px] border border-primary rounded-[2px]  flex justify-between items-center ">
					<button className=" w-[32px] h-[32px] bg-primary  rounded-l-sm flex justify-center items-center text-xl leading-6 font-medium text-white">
						-
					</button>
					<span className=" text-sm leading-4 font-medium text-[#4A4A4A] mx-2">
						55
					</span>
					<button className="w-[32px] h-[32px] bg-primary  rounded-r-sm flex justify-center items-center text-xl leading-6 font-medium  text-white ">
						+
					</button>
				</div>
				<div className="ml-6">
					<button className="w-[32px] h-[32px] bg-primary   flex justify-center items-center text-xl leading-6 font-medium  text-white  rounded">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItemBox;
