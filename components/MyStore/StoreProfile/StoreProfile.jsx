/* eslint-disable react/prop-types */
import React from 'react';
import banner from '../../../assets/Images/store/banner.png';
import Image from 'next/image';
import { getThumbnailImage } from '../../Shared/Constant/Constant';
import { useRouter } from 'next/dist/client/router';

const StoreProfile = ({ my_stores }) => {
  const router = useRouter();
  return (
    <div>
      <div className=" hidden md:block  absolute w-[100%] h-[200px] right-0 top-0 mt-[160px]">
        <Image src={banner} layout="fill" objectFit="cover" alt="banner" />
      </div>
      <div className=" relative  w-full  min-h-[126px] px-[10px] sm:px-[40px] py-[20px] bg-white flex flex-col md:flex-row justify-between md:items-center rounded-[10px] shadow-c-xsm  md:mt-[130px]">
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
            <p className=" text-secondary text-sm">
              @{my_stores[0].user.first_name}
            </p>
          </div>
        </div>
        <div className=" mt-4 md:mt-0 flex flex-row justify-between   md:flex-col flex-wrap ">
          <button
            className="  w-[145px] h-[30px] flex justify-center items-center bg-primary rounded-md mb-2 text-white"
            onClick={() =>
              router.push({
                pathname: '/a/edit-store',
                query: { id: my_stores[0].id },
              })
            }
          >
            Edit Account{' '}
          </button>
          <button
            onClick={() =>
              router.push({
                pathname: '/a/orders',
                query: { store_id: my_stores[0].id,page:1 },
              })
            }
            className="  w-[145px] h-[30px] flex justify-center items-center bg-primary rounded-md text-white"
          >
            Account Orders{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;
