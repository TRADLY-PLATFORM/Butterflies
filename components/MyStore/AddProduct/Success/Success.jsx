import React from 'react';
import successIcon from "../../../../assets/Images/success/Success.png"
import Image from "next/image"

const Success = () => {
    return (
      <div className=" mt-[100px] w-full flex justify-center">
        <div className="w-[1024px] h-[600px] bg-[#FEFEFE] shadow-c-sm rounded-lg ">
          <div className="w-[256px] h-[256px] relative">
            <Image src={successIcon} layout="fill" objectFit="contain" />
          </div>
          <div>
            <h2>Thank you. Your Event has been succesful</h2>
          </div>
        </div>
      </div>
    );
};

export default Success;