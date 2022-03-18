/* eslint-disable react/prop-types */
import React from 'react';
import banner from '../../../assets/Images/store/banner.png';
import Image from 'next/image';
import { getThumbnailImage } from '../../Shared/Constant/Constant';
import { useRouter } from 'next/dist/client/router';

const CustomStoreProfile = ({ my_stores }) => {
  const router = useRouter();
  return (
    <div>
      <div className=" hidden md:block   relative w-[100%] h-[200px] right-0 top-0 ">
        <Image src={banner} layout="fill" objectFit="cover" alt="banner" />
      </div>
      <div className=" relative  w-full md:w-[90%]  mx-auto min-h-[126px] px-[10px] sm:px-[40px] py-[20px] bg-white flex flex-col xxs:flex-row justify-between md:items-center rounded-[10px] shadow-c-xsm  md:mt-[-80px]">
        <div className=" flex items-center">
          <div className=" w-[70px] h-[70px] rounded-full overflow-hidden  relative   mr-6 ">
            <Image
              src={my_stores[0]?.images[0]}
              layout="fill"
              objectFit="cover"
              alt="banner"
            />
          </div>
          <div className=" flex flex-col items-start">
            <p className=" font-semibold text-base text-black">
              {my_stores[0].name}
            </p>
            <p className=" text-default_gray text-sm">
              @{my_stores[0].user.first_name}
            </p>
          </div>
        </div>
        <div className=" mt-4 md:mt-0 flex flex-row justify-between   md:flex-col flex-wrap ">
          <button
            className="  w-[145px] h-[40px] flex justify-center items-center bg-primary rounded-md mb-2 text-white"
            onClick={() =>
              router.push({
                pathname: '/a/edit-account',
                query: { id: my_stores[0].id },
              })
            }
          >
            Edit Account{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomStoreProfile;
