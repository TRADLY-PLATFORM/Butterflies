/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import tradly from 'tradly';
import { authSelector } from '../../../store/feature/authSlice';
import { myAccountListings } from '../../../store/feature/storeSlice';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  changeDateFormat,
  getThumbnailImage,
} from '../../Shared/Constant/Constant';
import Warning from '../../Shared/PopUp/Warning';
import CustomLoading from '../../Shared/Loading/CustomLoading';
import { configsSelector } from '../../../store/feature/configsSlice';

const StoreListings = ({ my_store_listings, my_stores }) => {
  const [marketplace_type, setMarketplace_type ] = useState(null);

  useEffect(() => {
    setMarketplace_type(localStorage.getItem('marketplace_type'));
  },[0])

  const [showWarning, setShowWarning] = useState(false);
  const [warning_message, setWarning_message] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const { auth_key } = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteListing = (id) => {
    setIsloading(true);
    tradly.app.deleteListing({ id, authKey: auth_key }).then((res) => {
      if (!res.error) {
        dispatch(
          myAccountListings({
            prams: { page: router.query.page, account_id: my_stores[0].id },
            authKey: auth_key,
          })
        );
        setIsloading(false);
      } else {
        setIsloading(false);
      }
    });
  };

  const closePopUP = () => {
    setShowWarning(false);
    setWarning_message('');
  };

  return (
    <div className=" grid grid-cols-listing_card_2  md:grid-cols-listing_card_3   lg:grid-cols-listing_card_4  xl:grid-cols-listing_card_5  gap-5 justify-center">
      {isLoading && <CustomLoading />}
      {showWarning && (
        <OutsideClickHandler
          onOutsideClick={() => {
            showWarning && (setShowWarning(false), setWarning_message(''));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <Warning message={warning_message} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}

      {my_store_listings?.map((item) => (
        <div key={Math.random()} className="  relative">
          <div
            className=" w-full  min-h-[210px] bg-[#FEFEFE]   rounded overflow-hidden cursor-pointer  shadow-c-sm"
            onClick={() => {
              if (item.active) {
                 router.push(`/l/${item.id}-${item.title.replace(/\W/g, '-')}`);
              } else {
                setShowWarning(true);
                setWarning_message('Product is under review.');
              }
            }}
          >
            <div className=" aspect-w-1 aspect-h-1 relative  mb-4 ">
              <Image
                src={item.images[0]}
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
            className=" h-[30px] w-[30px]  absolute right-0 top-0 cursor-pointer  [z-100] justify-center items-center  bg-white rounded-bl-md"
            onClick={() => {
              if (item.active) {
                router.push({
                  pathname: '/a/edit-product',
                  query: { product_id: item.id, account_id: my_stores[0].id },
                });
              } else {
                setShowWarning(true);
                setWarning_message(
                  "Product is under review, You can't edit now."
                );
              }
            }}
          >
            <span className=" w-full h-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6  mx-auto my-auto text-primary "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </span>
          </div>
          <div
            className=" h-[30px] w-[30px]  absolute right-0 top-0 mt-[35px] cursor-pointer  [z-100] justify-center items-center  bg-white rounded-bl-md"
            onClick={() => deleteListing(item.id)}
          >
            <span className=" w-full h-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex  text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </span>
          </div>
          {!item.active && (
            <div className=" h-8 w-[110px]  absolute left-0 top-0 cursor-pointer  [z-100] justify-center items-center   bg-yellow-400   rounded-br-lg">
              <p className=" h-full w-full flex justify-center items-center  text-gray-900 text-center text-sm font-medium">
                {' '}
                Under review
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StoreListings;
