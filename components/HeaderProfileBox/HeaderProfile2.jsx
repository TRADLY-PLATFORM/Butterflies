/* eslint-disable react/prop-types */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authSelector, logout } from '../../store/feature/authSlice';
import { useRouter } from 'next/dist/client/router';
import {
  booking,
  order,
} from '../Shared/Constant/TextConstant/MenuTextConstant';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import tradly from 'tradly';
import {
  invite_friend,
  privacy_icon,
  sign_in_icon,
  store_icon,
} from '../Shared/Constant/Icons/AllIcons';
import { myStore, storeSelector } from '../../store/feature/storeSlice';
import { account_menus, customer_menus } from './desktopMenu';

const HeaderProfile2 = ({ showUserMenus, setShowUserMenus }) => {
  const [marketplace_type, setMarketplace_type] = useState(null);
  const [general_configs, setGeneral_configs] = useState(null);

  useEffect(() => {
    setMarketplace_type(Number(localStorage.getItem('marketplace_type')));
    tradly.app
      .getConfigList({
        paramBody: 'general',
      })
      .then((res) => {
        if (!res.error) {
          setGeneral_configs(res?.data?.configs);
        }
      });
  }, [0]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    if (localStorage.getItem('auth_key')) {
      dispatch(
        myStore({
          prams: {
            page: 1,
            type: 'accounts',
            user_id: userDetails.id,
          },
          authKey: localStorage.getItem('auth_key'),
        })
      );
    }
  }, [localStorage.getItem('auth_key')]);

  const { my_stores } = useSelector(storeSelector);

  const dispatch = useDispatch();
  const router = useRouter();

  const { first_name, last_name, profile_pic, login } =
    useSelector(authSelector);

  return (
    <>
      <div
        className="bg-transparent flex items-center  cursor-pointer   group relative "
        // onClick={openUserMenu}
      >
        {login ? (
          <div className="flex items-center">
            {profile_pic !== undefined && profile_pic !== '' ? (
              <div className=" w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src={profile_pic}
                  objectFit="cover"
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-10 w-10  md:h-10 md:w-10 text-gray-600"
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
            <p className=" hidden lg:block text-base font-medium text-primary  lg:ml-2">
              {login ? first_name : 'Guest'}
            </p>
            <svg
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" w-[6px] h-[4px] md:w-[12px] md:h-[8px] ml-[5px] lg:ml-4"
            >
              <path
                d="M11.0002 1.17019C10.8128 0.983936 10.5594 0.879395 10.2952 0.879395C10.031 0.879395 9.77756 0.983936 9.59019 1.17019L6.00019 4.71019L2.46019 1.17019C2.27283 0.983936 2.01938 0.879395 1.75519 0.879395C1.49101 0.879395 1.23756 0.983936 1.05019 1.17019C0.956464 1.26315 0.88207 1.37375 0.831301 1.49561C0.780533 1.61747 0.754395 1.74818 0.754395 1.88019C0.754395 2.0122 0.780533 2.1429 0.831301 2.26476C0.88207 2.38662 0.956464 2.49722 1.05019 2.59019L5.29019 6.83019C5.38316 6.92392 5.49376 6.99831 5.61562 7.04908C5.73747 7.09985 5.86818 7.12599 6.00019 7.12599C6.1322 7.12599 6.26291 7.09985 6.38477 7.04908C6.50663 6.99831 6.61723 6.92392 6.71019 6.83019L11.0002 2.59019C11.0939 2.49722 11.1683 2.38662 11.2191 2.26476C11.2699 2.1429 11.296 2.0122 11.296 1.88019C11.296 1.74818 11.2699 1.61747 11.2191 1.49561C11.1683 1.37375 11.0939 1.26315 11.0002 1.17019Z"
                fill="#959393"
              />
            </svg>
          </div>
        ) : (
          <div>
            <button
              className=" w-[90px]  bg-primary text-sm text-white   py-[6px] flex items-center justify-center rounded-md "
              onClick={() => router.push('/sign-in')}
            >
              <span className=" hidden  ms:block "> {sign_in_icon}</span>
              <span className=" ms:ml-[6px]"> Log In</span>
            </button>
          </div>
        )}
        <div
          id="profileMenus"
          className={
            '   group-hover:block  fixed top-0 right-0 z-[60]  mx-[16px] xs:mx-[30px]  md:mx-[25px] 2xl:mx-[10%] mt-[65px]   transition duration-1000 hidden'
          }
        >
          {login && (
            <div className="bg-[#fff] rounded-lg  min-w-[300px] mt-[15px]  pt-[20px] pb-[15px]   min-h-[100px]  border border-[rgba(250, 250, 250, 0.93)]  shadow-sm  relative">
              {login && (
                <>
                  {my_stores?.length > 0 ? (
                    <div className="grid   grid-cols-2 ms:grid-cols-[200px,200px] sm:grid-cols-[250px,250px]">
                      {customer_menus(
                        Link,
                        marketplace_type,
                        general_configs,
                        router,
                        dispatch
                      )}
                      {account_menus(Link, router, my_stores)}
                    </div>
                  ) : (
                    <div className="grid grid-cols-[250px]">
                      {customer_menus(
                        Link,
                        marketplace_type,
                        general_configs,
                        router,
                        dispatch
                      )}
                    </div>
                  )}
                  {/* <div className="grid grid-cols-[250px,250px]">
                  {customer_menus(
                    Link,
                    marketplace_type,
                    general_configs,
                    router,
                    dispatch
                  )}
                  {account_menus(Link, router, my_stores)}
                </div> */}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderProfile2;
