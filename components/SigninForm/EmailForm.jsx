/* eslint-disable react/prop-types */
import React from 'react';

const EmailForm = ({ setEmail, setPassword }) => {
	return (
		<div className=" flex flex-col  justify-center items-center">
			<input
				type="text"
				className=" w-full md:w-[390px]  h-12 mb-5 bg-transparent border  border-white  rounded-[48px] p-3 text-white outline-none placeholder-white     focus:border-white focus:ring-0  "
				placeholder="Email"
				required
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				className=" w-full md:w-[390px]  h-12  bg-transparent  border border-white rounded-[48px] p-3 text-white outline-none placeholder-white focus:border-white focus:ring-0"
				placeholder="Password"
				required
				onChange={(e) => setPassword(e.target.value)}
			/>
		</div>
	);
};

export default EmailForm;