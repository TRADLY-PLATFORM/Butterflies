/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';

const Variants = ({ variants, setSelectedVariant, selectedVariant }) => {
  return (
    <div className="bg-white rounded  w-full min-h-[66px]    p-[16px]   ">
      <p className="text-[#121212] text-sm  font-semibold leading-4 ">
        Select Ticket
      </p>
      <div className="  mt-5     ">
        {variants.map((item) => {
          return (
            <div
              key={item.id}
              className={
                selectedVariant !== item.id
                  ? 'w-full h-[90px] relative rounded-md overflow-hidden  flex items-center my-4 shadow-c-sm  border border-transparent cursor-pointer'
                  : 'w-full h-[90px] relative rounded-md overflow-hidden  flex items-center my-4 shadow-c-sm cursor-pointer transition duration-700  border border-seceondary  ring ring-primary ring-offset-1'
              }
              onClick={() => setSelectedVariant(item.id)}
            >
              <div className="h-full w-[90px] relative">
                <Image src={item.images[0]} layout="fill" />
              </div>
              <div className=" ml-3">
                <p className=" text-sm text-primary font-normal">
                  {' '}
                  {item.stock} tickets left
                </p>
                <p className="text-black font-semibold">{item.title}</p>
                <p className=" flex items-center  ">
                  <span className=" text-secondary font-normal  text-xs">
                    {item.offer_price.currency}{' '}
                  </span>
                  <span className=" ml-2">{item.offer_price.amount} </span>
                </p>
                <p className=" flex items-center  text-xs ">
                  <span className=" line-through text-secondary font-normal">
                    {item.list_price.formatted}
                  </span>
                  <span className=" font-medium ml-2">
                    -{item.offer_percent}%
                  </span>
                </p>
              </div>
              <input
                className={
                  selectedVariant !== item.id
                    ? ' absolute  right-0 mr-6 cursor-pointer'
                    : 'absolute  right-0 mr-6 cursor-pointer text-primary  focus:ring-primary focus:text-primary'
                }
                checked={selectedVariant === item.id ? true : false}
                type="radio"
                name=""
                id=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Variants;
