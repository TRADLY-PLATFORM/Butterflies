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

const HeaderProfile = ({ showUserMenus, setShowUserMenus }) => {
  const [marketplace_type, setMarketplace_type] = useState(null);
  useEffect(() => {
    setMarketplace_type(Number(localStorage.getItem('marketplace_type')));
  }, [0]);


  const dispatch = useDispatch();
  const router = useRouter();

  const { first_name, last_name, profile_pic, login } =
    useSelector(authSelector);

  const openUserMenu = () => {
    showUserMenus ? setShowUserMenus(false) : setShowUserMenus(true);
  };
  const outsideClick = () => {
    showUserMenus && setShowUserMenus(false);
  };

 

  return (
    <>
      <div
        className="bg-transparent flex items-center  cursor-pointer relative  "
        onClick={openUserMenu}
      >
        {profile_pic !== undefined && profile_pic !== '' ? (
          <div className=" w-10 h-10 relative rounded-full overflow-hidden">
            <Image src={profile_pic} objectFit="cover" width={40} height={40} />
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
        <OutsideClickHandler onOutsideClick={outsideClick}>
          <div
            id="profileMenus"
            className={
              showUserMenus
                ? ' transition duration-1000 bg-[#fff] rounded-lg w-[300px] min-h-[100px] fixed top-0 right-0 z-[60]  mt-[80px]  pt-[25px] pb-[15px] shadow-sm flex flex-col  justify-center border border-[rgba(250, 250, 250, 0.93)] mx-[16px] xs:mx-[30px]  md:mx-[25px] 2xl:mx-[10%]'
                : ' hidden'
            }
          >
            {login ? (
              <>
                <div className="w-[15px] h-[15px] bg-[#fff] absolute   right-0  transform rotate-45  -top-2  mr-4  md:mr-8 border-l border-t border-[rgba(250, 250, 250, 0.93)]  z-[50]" />
                <Link href="/profile" passHref={true}>
                  <a className="flex items-center cursor-pointer w-auto  px-[25px] py-2  hover:bg-[#f2f4f4] group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-5 text-[#6e686e]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className=" text-sm  text-[#222222]  font-semibold  transition duration-500 group-hover:text-primary">
                      Profile
                    </span>
                  </a>
                </Link>
                {marketplace_type !== null && (
                  <Link href="/orders?page=1" passHref={true}>
                    <a>{marketplace_type === 1 ? order : booking}</a>
                  </Link>
                )}
                <div
                  className="flex items-center cursor-pointer w-auto  px-[25px] py-2  hover:bg-[#f2f4f4] group"
                  onClick={() => {
                    dispatch(logout({ router }));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-1 mr-4 text-[#6e686e]"
                    fill="none"
                    viewBox="0 0 24 24 "
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className=" text-sm  text-[#222222]  font-semibold transition duration-500 group-hover:text-primary">
                    Log Out
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="w-[15px] h-[15px] bg-[#fff] absolute right-0   transform rotate-45  -top-2   mr-4  lg:mr-10 border-l border-t border-[rgba(250, 250, 250, 0.93)]  z-[50]" />
                <Link href="/sign-in" passHref={true}>
                  <a className="flex items-center cursor-pointer w-auto  px-[25px] py-2  hover:bg-[#f2f4f4] group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-5 text-[#6e686e] mt-[2px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className=" text-sm  text-[#222222]  font-semibold transition duration-500 group-hover:text-primary">
                      Log In
                    </span>
                  </a>
                </Link>
              </>
            )}
          </div>
        </OutsideClickHandler>
      </div>
    </>
  );
};

export default HeaderProfile;
