/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import favorite from '../../../assets/Images/Home/favourite@3x.png';
import heartIcon from '../../../assets/Images/Home/heartIcon@3x.png';
import { changeDateFormat, getThumbnailImage } from '../Constant/Constant';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { time_icon } from '../Constant/Icons/AllIcons';
import moment from 'moment';


const ListListingCard = ({ item, like, marketplace_type }) => {
   const router = useRouter();
  return (
    <div className="  relative">
      <Link href={`/l/${item.id}-${item.title.replace(/\W/g, '-')}`}>
        <a
          className="   w-full  min-h-[146px bg-[#FEFEFE]   rounded-lg overflow-hidden cursor-pointer  shadow-c-sm flex"
          // onClick={() =>
          //   router.push(`/l/${item.id}-${item.title.replace(/\W/g, '-')}`)
          // }
        >
          <div className=" rounded-lg   w-[122px] h-[146px] relative  overflow-hidden ">
            {item?.images?.length > 0 && (
              <Image
                src={getThumbnailImage(item?.images[0])}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>

          <div className="mt-2 pl-2">
            {marketplace_type == 2 && (
              <p className=" mt-2   text-[12px] leading-3 text-gray-900  font-bold flex items-center ">
                { item.schedules &&time_icon}
                <span className="ml-[6px]">
                  {item.schedules &&
                    moment(item.schedules[0].start_time, 'HH:mm').format(
                      'hh:mm a'
                    )}
                </span>
                {item.schedules && <span className="ml-[6px]">to</span>}
                <span className="ml-[6px]">
                  {item.schedules &&
                    moment(item.schedules[0].end_time, 'HH:mm').format(
                      'hh:mm a'
                    )}
                </span>
              </p>
            )}
            <p className="mt-4  text-sm ms:text-base xmd:text-lg leading-[15px] font-semibold text-primary">
              <span className="hidden md:block">
                {item.title.length > 30 ? item.title : item.title}
              </span>
              <span className=" md:hidden">
                {item.title.length > 20
                  ? item.title.substring(0, 18) + '..'
                  : item.title}
              </span>
            </p>
            <p className=" mt-2 flex justify-start items-center ">
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
              <span className="  text-[#4F4F4F] font-medium text-base ml-[6px] ">
                {item.rating_data.rating_average}
              </span>
              <span className=" border-l border-[#959393]   text-[#4F4F4F] font-medium text-base ml-[4px] pl-[4px] ">
                {item.rating_data.rating_average} ratings
              </span>
            </p>
            <p className=" text-[14px]  ms:text-[16px] mb-[14px] leading-4 font-medium text-gray-500 mt-3">
              {item.list_price.formatted}
            </p>
          </div>
        </a>
      </Link>

      <div
        className=" h-[40px] w-[40px]  absolute right-0 top-0 cursor-pointer  [z-100]  mt-5 md:mt-2 mr-2  "
        onClick={() => like(item.id, item.liked)}
      >
        {item.liked ? (
          <Image
            src={favorite}
            alt="follow button"
            layout="fill"
            objectFit="cover"
            require
          />
        ) : (
          <Image
            src={heartIcon}
            alt="follow button"
            layout="fill"
            objectFit="cover"
            require
          />
        )}
      </div>
    </div>
  );
};

export default ListListingCard;
