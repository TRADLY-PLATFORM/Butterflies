/* eslint-disable react/prop-types */
import React from 'react';
import productIcon from '../../../assets/Images/store/product.png';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';

const NoProducts = ({ my_stores }) => {
  const router = useRouter();
  return (
    <div className=" flex flex-col justify-center    items-center  mt-10 ">
      <h1 className=" text-center text-3xl font-semibold text-black text-opacity-70  mt-10 ">
        You don’t have a listing
      </h1>
      <button
        className=" px-6 py-2 bg-primary rounded-md text-white text-base mt-7"
        onClick={() =>
          router.push({
            pathname: '/a/add-product',
            query: { account_id: my_stores[0].id },
          })
        }
      >
        Add Listing
      </button>
      <div className=" w-[220px] h-[220px] relative mt-10">
        <Image
          src={productIcon}
          layout="fill"
          objectFit="contain"
          alt="store Icon"
        />
      </div>
    </div>
  );
};

export default NoProducts;
