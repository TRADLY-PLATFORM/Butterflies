/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import { getThumbnailImage } from '../../Shared/Constant/Constant';
import Link from 'next/link';

const ItemsSummary = ({
  order_details,
  selected_product,
  setSelected_product,
  setSelected_product_review_status,
}) => {
  const OrderDetails = order_details?.order_details;
  return (
    <div className=" w-full h-min-[300px]    shadow-c-sm rounded-lg p-7 border-opacity-40  ">
      <div>
        {OrderDetails?.map((item, index) => {
          return (
            <div key={Math.random()}>
              <button
                className={[
                  'flex    items-center my-3 w-full  cursor-pointer bg-white rounded-2xl overflow-hidden border border-transparent',
                  selected_product === item.listing.id
                    ? 'cursor-pointer transition duration-700  border border-seceondary  ring ring-primary  '
                    : '',
                ].join(' ')}
                onClick={() => {
                  selected_product !== item.listing.id &&
                    setSelected_product(item.listing.id);
                  setSelected_product_review_status(item.listing.review_status);
                }}
              >
                <div
                  className=" flex items-center  rounded-2xl overflow-hidden"
                  key={item.id}
                >
                  {item?.listing?.images?.length > 0 && (
                    <Image
                      src={getThumbnailImage(item?.listing.images[0])}
                      width={100}
                      height={100}
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-4 ml-5 text-left">
                  <p className=" text-base font-semibold text-primary">
                    {item.listing.title}
                  </p>

                  <p className=" text-sm font-semibold flex items-center    ">
                    <span className=" text-xs font-normal">
                      {item.list_price.currency}
                    </span>
                    <span className=" ml-1">{item.list_price.amount}</span>
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsSummary;
