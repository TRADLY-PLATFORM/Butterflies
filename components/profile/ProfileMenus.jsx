import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/feature/authSlice';
import { storeSelector } from '../../store/feature/storeSlice';
import { useRouter } from 'next/dist/client/router';

const ProfileMenus = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { my_stores } = useSelector(storeSelector);

  return (
    <div className=" w-full h-min-[200px] p-[30px] bg-white rounded-lg shadow-c-sm">
      <div className=" border-b border-gray-900 border-opacity-30 py-4">
        <Link href="/orders" passHref={true}>
          <button className=" text-base text-gray-800 font-medium">
            My Orders
          </button>
        </Link>
      </div>
      {my_stores?.length > 0 && (
        <div className=" border-b border-gray-900 border-opacity-30 py-4">
          <Link href="/payout" passHref={true}>
            <button className=" text-base text-gray-800 font-medium">
              Payments
            </button>
          </Link>
        </div>
      )}
      <div className=" border-b border-gray-900 border-opacity-30 py-4">
        <Link href="#" passHref={true}>
          <button className=" text-base text-gray-800 font-medium">
            Terms & conditions
          </button>
        </Link>
      </div>
      <div className=" border-b border-gray-900 border-opacity-30 py-4">
        <Link href="#" passHref={true}>
          <button className=" text-base text-gray-800 font-medium">
            Settings
          </button>
        </Link>
      </div>
      <div className=" border-b border-gray-900 border-opacity-30 py-4">
        <Link href="#" passHref={true}>
          <button className=" text-base text-gray-800 font-medium">
            Privacy Policy
          </button>
        </Link>
      </div>
      <div className="   border-gray-900 border-opacity-30 py-4">
        <button
          onClick={() => {
            dispatch(logout({ router }));
          }}
          className=" text-base  text-red-500 font-medium"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileMenus;
