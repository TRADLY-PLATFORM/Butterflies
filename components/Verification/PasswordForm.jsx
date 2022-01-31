/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import OtpInput from "react-otp-input";


const PasswordForm = ({code,setCode}) => {

    const [passwords,setPassword]=useState([])

   
    return (
      <div
        action=""
        className="  w-5/6 md:w-full  flex justify-center  mx-auto"
      >
        <OtpInput
          value={code}
          onChange={(otp) => setCode(otp)}
          className=" otp-input  w-[45px] h-[45px] xs:w-[50px] xs:h-[50px]    md:w-[54px] md:h-[54px]  lg:w-[64px]  lg:h-[64px] mb-6 bg-transparent border  border-white  rounded-[48px]   text-white outline-none placeholder-white  text-center text-xl font-semibold  mr-2 xs:mr-4 focus:border-white focus:ring-0  "
          numInputs={6}
          inputStyle="block w-full p-0"
          separator={<span></span>}
        />
        {/* <input
				type="number"
				className="  w-[64px]  h-[64px] mb-6 bg-transparent border  border-white  rounded-[48px]   text-white outline-none placeholder-white  text-center text-xl font-semibold mr-4"
				placeholder="0"
				size="1"
				minLength="1"
				maxLength={1}
				required
				// onKeyUp={(e) => setFirstName(e.target.value)}
				id="field1"
				onKeyUp={(e) => changeInputField(e, 1)}
			/> */}
      </div>
    );
};


export default PasswordForm;