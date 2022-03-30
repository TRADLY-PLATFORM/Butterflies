/* eslint-disable react/prop-types */
import React from 'react';
import banner from '../../../assets/Images/store/banner.png';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import axios from 'axios';
import { check_login } from '../../../constant/check_auth';

const CustomAccountProfile = ({
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
      <div className=" hidden md:block  relative   w-[100%] h-[200px] right-0 top-0  ">
        <Image src={banner} layout="fill" objectFit="cover" alt="banner" />
      </div>
      <div className=" relative  w-full md:w-[90%]  mx-auto min-h-[126px] px-[10px] sm:px-[40px] py-[20px] bg-white flex flex-col  xs:flex-row justify-between md:items-center rounded-[10px] shadow-c-xsm  md:mt-[-90px]">
        <div className=" flex items-center">
          <div className=" w-[70px] h-[70px] rounded-full overflow-hidden  relative   mr-6 ">
            {account_details?.images.length > 0 && (
              <img
                src={account_details?.images[0]}
                className=" w-[70px] h-[70px] rounded-full object-cover "
                alt="banner"
              />
            )}
          </div>
          <div className=" flex flex-col items-start">
            <p className=" font-semibold text-base text-black">
              {account_details.name}
            </p>
            <p className=" text-default_gray text-sm">
              @{account_details.user.first_name}
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
              follow(account_details.id, account_details.following)
            }
          >
            {account_details.following ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAccountProfile;
