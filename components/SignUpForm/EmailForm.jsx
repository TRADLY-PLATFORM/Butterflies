/* eslint-disable react/prop-types */
import React from "react";

const EmailForm = ({
	setFirstName,
	setLastName,
	setEmail,
	setPassword,
	setReTypePassword,
}) => {
	return (
    <div className=" flex flex-col  justify-center items-center">
      <input
        type="text"
        className=" w-full md:w-[390px]  h-12 mb-6 bg-transparent border  border-white  rounded-[48px] p-3 text-white outline-none placeholder-white focus:outline-none focus:border-white focus:ring-0"
        placeholder="First Name"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        className=" w-full md:w-[390px]  h-12 mb-6 bg-transparent border  border-white  rounded-[48px] p-3 text-white outline-none placeholder-white focus:border-white focus:ring-0"
        placeholder="Last Name"
        required
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        className=" w-full md:w-[390px]  h-12 mb-6 bg-transparent border  border-white  rounded-[48px] p-3 text-white outline-none placeholder-white focus:border-white focus:ring-0"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className=" w-full md:w-[390px]  h-12 mb-6  bg-transparent  border border-white rounded-[48px] p-3 text-white outline-none placeholder-white focus:border-white focus:ring-0"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className=" w-full md:w-[390px]  h-12  bg-transparent  border border-white rounded-[48px] p-3 text-white outline-none placeholder-white focus:border-white focus:ring-0"
        placeholder="Re Type Password"
        required
        onChange={(e) => setReTypePassword(e.target.value)}
      />
    </div>
  );
};

export default EmailForm;
