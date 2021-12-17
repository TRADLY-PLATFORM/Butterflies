/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import favorite from '../../../assets/Images/Home/favourite@3x.png';
import heartIcon from '../../../assets/Images/Home/heartIcon@3x.png';
import { changeDateFormat, getThumbnailImage } from '../Constant/Constant';
import { useRouter } from 'next/dist/client/router';
import Link from "next/link"

const ListingCard = ({ item, like, marketplace_type }) => {
  const router = useRouter();
  return (
    <div className="  relative">
      <Link href={`/l/${item.id}-${item.title.replace(/\W/g, '-')}`}>
        <a
        className=" block w-full  min-h-[210px] bg-[#FEFEFE]   rounded overflow-hidden cursor-pointer  shadow-c-sm"
        // onClick={() =>
        //   router.push(`/l/${item.id}-${item.title.replace(/\W/g, '-')}`)
        // }
      >
        <div className="   aspect-w-1 aspect-h-1 relative  mb-4 ">
          {item?.images?.length > 0 && (
            <Image
              src={getThumbnailImage(item?.images[0])}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        {/* {marketplace_type === 2 && (
          <p className=" mt-2 pl-2 text-[10px] leading-3 text-gray-900  font-medium">
            {changeDateFormat(item.start_at, 'dddd Do MMM YYYY')}
          </p>
        )} */}
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
      </a>
       </Link>
      

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
