/* eslint-disable react/prop-types */
import React from 'react';
import Image from "next/image"
import favorite from '../../../assets/Images/Home/favourite@3x.png';
import heartIcon from '../../../assets/Images/Home/heartIcon@3x.png';
import { getThumbnailImage } from '../Constant/Constant';
import { useRouter } from 'next/dist/client/router';

const ListingCard = ({ item, like, marketplace_type }) => {
  const router = useRouter(); 
  return (
    <div className="  relative">
      <div
        className=" w-full  min-h-[210px] bg-[#FEFEFE]   rounded overflow-hidden cursor-pointer  shadow-c-sm"
        onClick={() => router.push(`/listing/${item.id}`)}
      >
        <div className="   aspect-w-1 aspect-h-1 relative  mb-4 ">
          <Image
            src={getThumbnailImage(item?.images[0])}
            alt={item.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {marketplace_type === 2 && (
          <p className=" mt-2 pl-2 text-[10px] leading-3 text-gray-900  font-medium">
            {changeDateFormat(item.start_at, 'dddd Do MMM YYYY')}
          </p>
        )}
        <div className="mt-2 pl-2">
          <p className="  text-sm ms:text-base xmd:text-lg leading-[15px] font-semibold text-primary">
            {item.title.length > 18
              ? item.title.substring(0, 18) + '..'
              : item.title}
          </p>
          <p className=" text-[14px]  ms:text-[16px] mb-[14px] leading-4 font-medium text-gray-500 mt-1">
            {item.list_price.formatted}
          </p>
        </div>
        {/* <div className=" pl-2 mt-4 mb-[14px] flex items-center">
              {item?.account?.images.length > 0 ? (
                <div className="h-5 w-5 rounded-full overflow-hidden  relative">
                  <Image
                    src={getThumbnailImage(item?.account.images[0])}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <div className="ml-1">
                <p className=" text-[10px]   leading-3 text-[#4F4F4F] font-medium mix-blend-normal">
                  {item?.account?.name.length > 10
                    ? item?.account?.name.substring(0, 18) + '..'
                    : item?.account?.name}
                </p>
                <p className="text-[10px] leading-3 text-[#4F4F4F] font-medium   opacity-50">
                  {item?.account?.total_followers} Followers
                </p>
              </div>
            </div> */}
      </div>

      <div
        className=" h-[40px] w-[40px]  absolute right-0 top-0 cursor-pointer  [z-100]  "
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

export default ListingCard;