/* eslint-disable react/prop-types */
import React from 'react';
import banner from '../../../assets/Images/store/banner.png';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import axios from 'axios';
import { check_login } from '../../../constant/check_auth';
import Image from 'next/image';

const AccountProfile = ({
  account_details,
  setAccount_details,
  setIsDataLoading,
}) => {
  const router = useRouter();
  const { login, auth_key } = useSelector(authSelector);

  const follow = (id, isFollow) => {
    if (check_login(router)) {
      setIsDataLoading(true);

      axios
        .post('/api/a/follow_account', { id, isFollow })
        .then((res) => {
          axios
            .get(`/api/a/${router.query.id}`)
            .then((res) => {
              setAccount_details(res.data.account);
              setIsDataLoading(false);
            })
            .catch((error) => {
              setIsDataLoading(false);
            });
        })
        .catch((error) => {
          setIsDataLoading(false);
        });
    }
  };

  return (
    <div>
      <div className=" hidden md:block  absolute w-[100%] h-[200px] right-0 top-0 mt-[190px]">
        <Image src={banner} alt="banner" layout="fill" objectFit="cover" />
      </div>
      <div className=" relative  w-full  min-h-[126px] px-[10px] sm:px-[40px] py-[20px] bg-white flex flex-col  xs:flex-row justify-between md:items-center rounded-[10px] shadow-c-xsm  md:mt-[130px]">
        <div className=" flex items-center">
          <div className=" w-[70px] h-[70px] rounded-full overflow-hidden  relative   mr-6 ">
            {account_details?.images.length > 0 && (
              <img
                src={account_details?.images[0]}
                className="w-[70px] h-[70px] rounded-full  object-cover"
                alt="banner"
              />
            )}
          </div>
          <div className=" flex flex-col items-start">
            <p className=" font-semibold text-base text-black">
              {account_details?.name}
            </p>
            <p className=" text-default_gray text-sm">
              @{account_details?.user?.first_name}
            </p>
            <p className=" mt-3 font-medium text-lg text-black flex flex-wrap  gap-x-10 gap-y-3">
              {account_details?.location && (
                <a
                  href={`https://maps.google.com/?q=${account_details?.coordinates?.latitude},${account_details?.coordinates?.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <a
                    href={`https://maps.apple.com/maps?q=${account_details?.coordinates?.latitude},${account_details?.coordinates?.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex  items-center gap-1 hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {account_details?.location?.city}
                  </a>
                </a>
              )}
              {account_details?.categories[0]?.name && (
                <span>{account_details?.categories[0]?.name}</span>
              )}
              {Number(account_details?.total_followers) > 0 && (
                <span>{account_details?.total_followers} Followers</span>
              )}
              {Number(account_details?.total_listings) > 0 && (
                <span>{account_details?.total_listings} Listings</span>
              )}
            </p>
          </div>
        </div>
        <div className=" mt-4 md:mt-0 flex flex-row justify-center  md:flex-col flex-wrap ">
          <button
            className={[
              '  w-[145px] h-[35px] flex justify-center items-center border border-primary  rounded-lg',
              account_details.following
                ? 'text-[#FFFFFF]  bg-primary'
                : 'text-primary   bg-transparent',
            ].join(' ')}
            onClick={() =>
              follow(account_details?.id, account_details?.following)
            }
          >
            {account_details?.following ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
