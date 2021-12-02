/* eslint-disable react/prop-types */
import React from 'react';
import ItemQuantity from './ItemQuantity';
import Image from 'next/image';
import { getThumbnailImage } from '../../Shared/Constant/Constant';
import { useRouter } from 'next/dist/client/router';

const EventOrderSummary = ({ listing_details, quantity }) => {
  const router = useRouter();
  const variant_id = router.query.variant_id;
  const selecte_varient_details = listing_details?.variants.filter(
    (item) => item.id === Number(variant_id)
  );
  return listing_details ? (
    <div className=" w-full min-h-[200px] bg-[#FEFEFE] rounded-lg py-[26px] px-6 ">
      <p className="text-primary text-xl leading-6 font-medium  mt-3">
        Order Summary
      </p>
      <div className="mt-5">
        <div className="w-full  bg-[#FFFFFF] rounded-lg shadow-c-sm   overflow-hidden flex  mb-3 ">
          <div className=" w-[100px] h-[100px] relative mr-3 ">
            {listing_details?.images.length > 0 && (
              <Image
                src={
                  !variant_id
                    ? getThumbnailImage(listing_details.images[0])
                    : selecte_varient_details[0].images.length > 0
                    ? getThumbnailImage(selecte_varient_details[0].images[0])
                    : getThumbnailImage(listing_details.images[0])
                }
                layout="fill"
                objectFit="cover"
                alt="Order Items"
                priority={true}
              />
            )}
          </div>
          <div className=" flex flex-col justify-around py-2">
            <div>
              <p className=" text-base  font-semibold text-black">
                {!variant_id
                  ? listing_details.title
                  : selecte_varient_details[0].title}
              </p>
            </div>
            <div>
              <p className=" text-base  font-medium text-secondary ">
                {listing_details.location.country}
              </p>
              <p className=" text-base  font-medium text-secondary ">
                <span>Quantity :</span> <span>{quantity}</span>{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className=" w-full min-h-[57px] bg-[#FFFFFF] border border-primary rounded-lg  px-4 py-5 mb-3 ">
          <p className=" text-sm leading-4 font-semibold text-[#4F4F4F] ">
            <span>{quantity}</span>
            <span className="ml-2">X</span>
            <span className="ml-2">
              {!variant_id
                ? listing_details.title
                : selecte_varient_details[0].title}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-base leading-6 font-semibold text-secondary flex justify-between items-center mb-2">
          <span>Total</span>{' '}
          <span className=" flex flex-wrap items-center">
            <span className="text-sm leading-6 font-medium text-secondary mr-2">
              {!variant_id
                ? listing_details.list_price.currency
                : selecte_varient_details[0].list_price?.currency}
            </span>
            <span className="text-base leading-6 font-semibold text-gray-600">
              {!variant_id
                ? Number(listing_details.list_price.amount * quantity).toFixed(
                    2
                  )
                : Number(
                    selecte_varient_details[0].list_price.amount * quantity
                  ).toFixed(2)}
            </span>
          </span>
        </p>
        <p className="text-base leading-6 font-semibold text-secondary flex justify-between items-center mb-2">
          <span>Offer Percent</span>{' '}
          <span className=" flex flex-wrap items-center">
            <span className="text-base leading-6 font-semibold text-gray-600">
              {!variant_id
                ? listing_details.offer_percent
                : selecte_varient_details[0].offer_percent}
              %
            </span>
          </span>
        </p>
        <p className="text-xl leading-6 font-semibold text-black flex justify-between items-center">
          <span>Subtotal</span>{' '}
          <span className=" flex flex-wrap items-center">
            <span className="text-sm leading-6 font-medium text-secondary mr-2">
              {!variant_id
                ? listing_details.offer_price?.currency
                : selecte_varient_details[0].offer_price?.currency}
            </span>
            <span className="text-xl leading-6 font-semibold text-black">
              {!variant_id
                ? Number(
                    listing_details.offer_price?.amount * quantity
                  ).toFixed(2)
                : Number(
                    selecte_varient_details[0].offer_price?.amount * quantity
                  ).toFixed(2)}
            </span>
          </span>
        </p>
      </div>
    </div>
  ) : (
    <div className="  border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded"></div>
            <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrderSummary;
