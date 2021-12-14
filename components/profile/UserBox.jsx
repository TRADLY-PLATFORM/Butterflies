import { Router, useRouter } from 'next/dist/client/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import Image from 'next/image';
import { getThumbnailImage } from '../Shared/Constant/Constant';


const UserBox = () => {
  const { login, first_name, last_name, profile_pic } =
    useSelector(authSelector);
  const router = useRouter();
  return (
    <div className=" w-full h-min-[30px] bg-white  shadow-c-sm rounded-lg p-[20px]  grid  xs:grid-cols-[70%,30%] items-center">
      <div className="flex justify-start items-center">
        {profile_pic ? (
          <div className="w-12 h-12 relative rounded-full overflow-hidden">
            <Image
              src={getThumbnailImage(profile_pic)}
              layout="fill"
              objectFit="cover"
              
            />
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-700"
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
        <h2 className=" text-xl text-black font-semibold ml-2">
          {login ? `${first_name}  ${last_name}` : 'Guest'}
        </h2>
      </div>
      <div className=" flex justify-center  xs:justify-end">
        <button
          onClick={() => router.push('/edit-profile')}
          className=" px-6 py-1 bg-primary  rounded-lg text-base text-white font-medium"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserBox;
