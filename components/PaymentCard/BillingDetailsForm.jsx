/* eslint-disable react/prop-types */
import React from "react";

const BillingDetailsForm = (props) => {
	return (
		<div className=" w-full mt-7 mb-7   rounded-lg  ">
			<h2 className="text-xl text-primary text-center font-bold">
				Pay with Card
			</h2>
			<div className="mt-8  w-full">
				<div className="grid grid-cols-1 gap-6">
					<label className="block">
						<span className="text-gray-700">
							Name
						</span>
						<input
							onChange={(e) =>
								props.setName(
									e.target.value
								)
							}
							type="text"
							className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
							placeholder=""
						/>
					</label>
					<label className="block">
						<span className="text-gray-700">
							Email
						</span>
						<input
							onChange={(e) =>
								props.setEmail(
									e.target.value
								)
							}
							type="text"
							className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
							placeholder="john@example.com"
						/>
					</label>
					<label className="block">
						<span className="text-gray-700">
							Address
						</span>
						<input
							onChange={(e) =>
								props.setAddress(
									e.target.value
								)
							}
							type="text"
							className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
							placeholder="Address"
						/>
					</label>
					<div className="grid grid-cols-[100%] gap-3  sm:gap-0 sm:grid-cols-[30%,30%,30%]  justify-between  ">
						<label className="block">
							<span className="text-gray-700">
								City
							</span>
							<input
								onChange={(e) =>
									props.setCity(
										e.target
											.value
									)
								}
								type="text"
								className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
								placeholder=""
							/>
						</label>
						<label className="block">
							<span className="text-gray-700">
								State
							</span>
							<input
								onChange={(e) =>
									props.setState(
										e.target
											.value
									)
								}
								type="text"
								className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
								placeholder=""
							/>
						</label>
						<label className="block">
							<span className="text-gray-700">
								ZIP
							</span>
							<input
								onChange={(e) =>
									props.setZip(
										e.target
											.value
									)
								}
								type="number"
								className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
								placeholder="123456"
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BillingDetailsForm;
