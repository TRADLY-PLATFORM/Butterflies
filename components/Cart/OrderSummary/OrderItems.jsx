import React from 'react';
import Image from 'next/image';
import { getThumbnailImage } from '../../Shared/Constant/Constant';

const OrderItems = ({ cart_details }) => {
  return cart_details.map((item) => {
    return (
      <div
        className="w-full  bg-[#FFFFFF] rounded-lg shadow-c-sm   overflow-hidden flex  mb-3 "
        key={item.id}
      >
        <div className="  relative mr-3 ">
          <img
            src={getThumbnailImage(item.listing.images[0])}
            className="w-[100px] h-[100px] object-fill"
            alt="Order Items"
          />
        </div>
        <div className=" flex flex-col justify-around py-2">
          <div>
            <p className=" text-base  font-semibold text-black">
              {item.listing.title}
            </p>
          </div>
          <div>
            <p className=" text-base  font-medium text-default_gray ">
              {item.listing.location.country}
            </p>
            <p className=" text-base  font-medium text-default_gray ">
              <span>Quantity :</span> <span>{item.quantity}</span>{' '}
            </p>
          </div>
        </div>
      </div>
    );
  });
};

export default OrderItems;
