/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import successImage from '../../../assets/Images/success/Success.png';
import { myAccountListingDetails } from '../../../store/feature/storeSlice';
 
const EditListingSuccess = ({
  message,
  setShowSuccessMessage,
  dispatch,
  productId,
  auth_key,
}) => {
  return (
    <div className="bg-white shadow-c-sm w-full  xs:w-[450px] min-h-[250px] rounded-lg  p-[20px] xs:p-[30px] relative">
      <button
        className="absolute top-0  right-0 text-primary font-semibold text-xl mt-3 mr-5"
        onClick={() => {
          setShowSuccessMessage(false),
            dispatch(
              myAccountListingDetails({ id: productId, authKey: auth_key })
            );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className=" w-full flex  flex-col justify-center">
        <Image
          src={successImage}
          alt="Success Image"
          height={100}
          width={100}
          objectFit="contain"
        />
        <p className="text-primary text-base font-semibold text-center">
          {message}
        </p>
      </div>
      <div className="flex flex-col xs:flex-row  justify-between items-center">
        <Link href="/a/my-store?page=1" passHref={true}>
          <button className="bg-primary mt-8 px-4 py-2 rounded text-base text-white font-medium ">
            Back To Account
          </button>
        </Link>
        <button
          className="bg-primary mt-8 px-4 py-2 rounded text-base text-white font-medium flex justify-center items-center "
          onClick={() => {
            setShowSuccessMessage(false),
              dispatch(
                myAccountListingDetails({ id: productId, authKey: auth_key })
              );
          }}
        >
          <span>Continue</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditListingSuccess;
