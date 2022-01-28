/* eslint-disable react/prop-types */
import React from 'react';
import { rating_icon } from '../../Shared/Constant/Icons/AllIcons';

const RatingBox = ({ rating_data }) => {
  return (
    <div className=" bg-white rounded  w-full min-h-[66px] px-4  py-[24px]  grid       lg:grid-cols-[45%,55%] xl:grid-cols-2  items-center justify-center ">
      <div className="flex flex-col justify-end items-center">
        <p className=" text-black  font-semibold text-sm">
          Ratings and reviews
        </p>
        <p className=" text-black  font-semibold text-6xl  my-3">
          {rating_data.rating_average}
        </p>
        <p className=" text-default_gray font-normal text-sm  ">
          {rating_data.rating_count} ratings
        </p>
      </div>
      <div className="mt-5 lg:mt-0">
        {/* rating 1 */}
        <div className="flex items-center gap-3">
          <p className="flex justify-end items-center gap-1 w-20">
            {rating_icon}
            {rating_icon}
            {rating_icon}
            {rating_icon}
            {rating_icon}
          </p>
          <p className=" block w-28 ">
            <span className=" block bg-primary h-2 w-28 rounded-full" />
          </p>
          <p className="ml-5">{rating_data.rating_count_data.rating_5}</p>
        </div>
        {/* rating 4 */}
        <div className="flex items-center gap-3">
          <p className="flex justify-end items-center gap-1 w-20">
            {rating_icon}
            {rating_icon}
            {rating_icon}
            {rating_icon}
          </p>
          <p className=" block w-28 ">
            <span className=" block bg-primary h-2 w-[88px] rounded-full" />
          </p>
          <p className="ml-5">{rating_data.rating_count_data.rating_4}</p>
        </div>
        {/* rating 3 */}
        <div className="flex items-center gap-3">
          <p className="flex justify-end items-center gap-1 w-20">
            {rating_icon}
            {rating_icon}
            {rating_icon}
          </p>
          <p className=" block w-28 ">
            <span className=" block bg-primary h-2 w-[66px] rounded-full" />
          </p>
          <p className="ml-5">{rating_data.rating_count_data.rating_3}</p>
        </div>
        {/* rating 2 */}
        <div className="flex items-center gap-3">
          <p className="flex items-center justify-end gap-1 w-20">
            {rating_icon}
            {rating_icon}
          </p>
          <p className=" block w-28 ">
            <span className=" block bg-primary h-2 w-[44px] rounded-full" />
          </p>
          <p className="ml-5">{rating_data.rating_count_data.rating_2}</p>
        </div>
        {/* rating 1 */}
        <div className="flex items-center gap-3">
          <p className="flex items-center gap-1 justify-end w-20">
            {rating_icon}
          </p>
          <p className=" block w-28 ">
            <span className=" block bg-primary h-2 w-[22px] rounded-full" />
          </p>
          <p className="ml-5">{rating_data.rating_count_data.rating_1}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingBox;
