import React from 'react';
import icon from '../../../../assets/Images/Home/pexels-photo-789812 1.png';
import Image from 'next/image';
import AddVariantsForm from './AddVariantsForm';

const VariantsPart = () => {
    return (
      <>
        <div className=" w-full h-[130px] bg-[#FEFEFE] rounded shadow-c-sm  grid grid-cols-[30%,50%,20%] items-center ">
          <div className="h-[130px] w-[130px] relative">
            <Image src={icon} layout="fill" alt="icon" />
          </div>
          <div>
            <p className=" text-primary font-semibold text-base">Test</p>
            <p className=" text-black font-semibold text-base">$1000</p>
            <p className=" text-secondary font-normal text-sm">Available</p>
          </div>
          <div className=" flex justify-around items-center">
            <button className="bg-white text-black">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button className=" bg-white  text-black">
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
            <div>
                <AddVariantsForm/>
            </div>
        <button className=" text-primary flex justify-center mx-auto mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
                </svg>
                Add Variant
        </button>
      </>
    );
};

export default VariantsPart;
