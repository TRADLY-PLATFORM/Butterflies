/* eslint-disable react/prop-types */
import Link from 'next/link';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authSelector, logout } from '../../store/feature/authSlice';
import { useRouter } from 'next/dist/client/router';

const HeaderProfile = ({ showUserMenus, setShowUserMenus }) => {
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
        className="bg-transparent flex items-center  cursor-pointer"
        onClick={openUserMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" h-[24px] w-[24px]  md:h-10 md:w-10"
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
        <p className=" hidden lg:block text-base font-medium text-primary  lg:ml-2">
          {login ? first_name + '  ' + last_name : 'Guest'}
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
                ? ' bg-white rounded-xl w-[300px] min-h-[100px] fixed top-0 right-0 z-[60]  mt-[100px] mr-[30px] py-[25px] shadow-sm flex flex-col justify-center'
                : 'hidden'
            }
          >
            {login ? (
              <>
                <Link href="/profile" passHref={true}>
                  <div className="flex items-center cursor-pointer w-auto  px-[25px] py-2  hover:bg-[#f2f4f4]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-5"
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
                    <span className=" text-sm  text-secondary  font-semibold">
                      Profile
                    </span>
                  </div>
                </Link>
                <div
                  className="flex items-center cursor-pointer w-auto  px-[25px] py-2  hover:bg-[#f2f4f4]"
                  onClick={() => {
                    dispatch(logout({router}));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className=" text-sm  text-secondary  font-semibold">
                    Log Out
                  </span>
                </div>
              </>
            ) : (
              <Link href="/sign-in" passHref={true}>
                <div className="flex items-center cursor-pointer w-auto  px-[25px] py-2  hover:bg-[#f2f4f4]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-5"
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
                  <span className=" text-sm  text-secondary  font-semibold">
                    Log In
                  </span>
                </div>
              </Link>
            )}
          </div>
        </OutsideClickHandler>
      </div>
    </>
  );
};

export default HeaderProfile;
