/* eslint-disable react/prop-types */
import React from 'react';
import EventButtons from '../EventsButtons/EventButtons';
import favorite from '../../../assets/Images/Home/favourite@3x.png';
import heartIcon from '../../../assets/Images/Home/heartIcon@3x.png';
import Image from 'next/image';
import * as constant from '../../Shared/Constant/TextConstant/listingDetailsConstant';
import { useSelector } from 'react-redux';
import { configsSelector } from '../../../store/feature/configsSlice';

const MainBox = ({ listing_details, rating_data, like }) => {
  const { marketplace_type, listings_configs } = useSelector(configsSelector);

  return listing_details !== null ? (
    <div className=" w-full  min-h-[250px] bg-white rounded  p-[25px] relative">
      <div className=" w-5/6 ">
        {listings_configs?.enable_stock && (
          <p className=" text-sm text-primary font-medium">
            {constant.stock_text(marketplace_type, listing_details.stock)}
          </p>
        )}
        <h2 className=" mt-[9px] text-[20px] md:text-[30px] text-primary font-medium ">
          {listing_details.title}
        </h2>
        <p className=" mt-1 flex items-center flex-wrap">
          <span className="text-secondary text-base font-medium">
            {listing_details.list_price.currency}
          </span>
          <span className=" text-black text-xl font-medium ml-[8px]">
            {listing_details.list_price.amount}
          </span>
        </p>
        <p className="flex justify-start items-center ">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.99967 10.3892L3.78059 12.1687C3.4153 12.3706 2.97802 12.0625 3.04521 11.6506L3.66634 7.84278L1.01255 5.12285C0.728341 4.83156 0.892609 4.34088 1.29491 4.27941L4.93956 3.72256L6.54705 0.297803C6.72701 -0.0855992 7.27234 -0.0855992 7.4523 0.297803L9.05979 3.72256L12.7044 4.27941C13.1067 4.34088 13.271 4.83156 12.9868 5.12285L10.333 7.84278L10.9541 11.6506C11.0213 12.0625 10.584 12.3706 10.2188 12.1687L6.99967 10.3892Z"
              fill="#FFBA49"
            />
          </svg>
          <span className=" text-[#4F4F4F] font-medium text-base ml-[6px] ">
            {rating_data.rating_average}
          </span>
          <span className=" text-secondary  text-xs font-medium ml-[6px]">
            {rating_data.rating_count} Ratings
          </span>
        </p>
      </div>

      <div className=" absolute top-0 right-0 mt-6 mr-6">
        <button
          className=" h-[48px] w-[48px] relative cursor-pointer "
          onClick={() => like(listing_details.id, listing_details.liked)}
        >
          {listing_details.liked ? (
            <Image
              src={favorite}
              alt="follow button"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <Image
              src={heartIcon}
              alt="follow button"
              layout="fill"
              objectFit="cover"
            />
          )}
        </button>
      </div>
    </div>
  ) : (
    <div className=" min-h-[300px] border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded"></div>
            <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4 mt-5">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded"></div>
            <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4 mt-5">
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

export default MainBox;
