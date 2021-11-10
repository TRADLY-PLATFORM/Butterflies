/* eslint-disable react/prop-types */
import React from "react";
 
const PaymentMethod = ({
	payment_methods,
	paymentMethod,
	setPaymentMethod,
}) => {
	const selectPaymentMethod = (method) => {
		setPaymentMethod(method);
	};
 
	return payment_methods ? (
		<div className=" w-full bg-[#FEFEFE] rounded-lg p-[31px] ">
			<p className="text-primary text-xl leading-6 font-medium ">
				Payment Method
			</p>
			<div className=" mt-5 flex items-center flex-wrap">
				{payment_methods.map((method) => {
					return (
						<button
							className={
								paymentMethod?.id !==
								method.id
									? " min-w-[100px] h-5 px-6 py-4 border border-secondary flex items-center justify-between rounded-lg mr-3 mb-3  transition duration-700    hover:border-primary hover:text-primary"
									: " min-w-[100px] h-5 px-6 py-4 border   flex items-center justify-between   mr-3 mb-3  border-transparent bg-primary text-white rounded-md cursor-pointer  ring-2 ring-primary ring-offset-2 "
							}
							key={method.id}
							onClick={() =>
								selectPaymentMethod(
									method
								)
							}
						>
							<span className=" text-base   font-semibold mr-3">
								{method.name}
							</span>
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
					);
				})}
			</div>
		</div>
	) : (
		<div className="  border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full mx-auto">
			<div className="animate-pulse flex space-x-4">
				<div className="flex-1 space-y-4 py-1">
					<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
					<div className="space-y-2">
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded"></div>
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethod;
