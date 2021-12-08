/* eslint-disable react/prop-types */
import React from 'react';
import banner from '../../../assets/Images/store/banner.png';
import Image from 'next/image';
import { getThumbnailImage } from '../../Shared/Constant/Constant';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import tradly from 'tradly';

const AccountProfile = ({
  account_details,
  setAccount_details,
  setIsDataLoading,
}) => {
  const router = useRouter();
  const { login, auth_key } = useSelector(authSelector);

  const follow = (id, isFollow) => {
    if (login) {
      setIsDataLoading(true);
      tradly.app
        .followUnfollowAccounts({
          id,
          authKey: auth_key,
          isFollowing: isFollow,
        })
        .then((res) => {
          if (!res.code) {
            tradly.app
              .commonFuntion({
                path: `/v1/accounts/${router.query.id.split('-')[0]}`,
                bodyParam: '',
                authKey: auth_key,
                Method: 'Get',
              })
              .then((res) => {
                if (!res.error) {
                  setAccount_details(res.data.account);
                  setIsDataLoading(false);
                } else {
                  setIsDataLoading(false);
                }
              });
          } else {
            setIsDataLoading(false);
          }
        });
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <div>
      <div className=" hidden md:block  absolute w-[100%] h-[200px] right-0 top-0 mt-[160px]">
        <Image src={banner} layout="fill" objectFit="cover" alt="banner" />
      </div>
      <div className=" relative  w-full  min-h-[126px] px-[10px] sm:px-[40px] py-[20px] bg-white flex flex-col  xs:flex-row justify-between md:items-center rounded-[10px] shadow-c-xsm  md:mt-[130px]">
        <div className=" flex items-center">
          <div className=" w-[70px] h-[70px] rounded-full overflow-hidden  relative   mr-6 ">
            {account_details?.images.length > 0 && (
              <Image
                src={account_details?.images[0]}
                layout="fill"
                objectFit="cover"
                alt="banner"
              />
            )}
          </div>
          <div className=" flex flex-col items-start">
            <p className=" font-semibold text-base text-black">
              {account_details.name}
            </p>
            <p className=" text-secondary text-sm">
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

export default AccountProfile;
