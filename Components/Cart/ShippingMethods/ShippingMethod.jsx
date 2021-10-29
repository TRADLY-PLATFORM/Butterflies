import React from 'react';

const ShippingMethod = () => {
    return (
		<div className=" w-full min-h-[100px] bg-[#FEFEFE] rounded-lg p-[31px] ">
			<p className="text-primary text-xl leading-6 font-medium ">
				Shipping Method
			</p>
			<div className=" mt-5 flex items-center flex-wrap">
				<button className=" min-w-[100px] h-5 px-6 py-4 border border-secondary flex items-center justify-between rounded-lg mr-3 mb-3   hover:border-primary hover:text-primary">
					<span className=" text-base   font-semibold mr-3">Pickup</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5   ml-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				<button className=" min-w-[100px] h-5 px-6 py-4 border border-secondary flex items-center justify-between rounded-lg mr-3 mb-3   hover:border-primary hover:text-primary">
					<span className=" text-base   font-semibold mr-3">Pickup</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5   ml-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				<button className=" min-w-[100px] h-5 px-6 py-4 border border-secondary flex items-center justify-between rounded-lg mr-3 mb-3   hover:border-primary hover:text-primary">
					<span className=" text-base   font-semibold mr-3">Pickup</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5   ml-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				 
			</div>
		</div>
    );
};

export default ShippingMethod;