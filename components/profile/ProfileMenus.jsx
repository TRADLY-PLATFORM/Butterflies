import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/feature/authSlice';
import { storeSelector } from '../../store/feature/storeSlice';
import { useRouter } from 'next/dist/client/router';
import { configsSelector } from '../../store/feature/configsSlice';

const ProfileMenus = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { my_stores } = useSelector(storeSelector);
  const { general_configs, accounts_configs, marketplace_type } =
    useSelector(configsSelector);

  

  return (
    <div className=" w-full h-min-[200px] p-[30px] bg-white rounded-lg shadow-c-sm">
      {my_stores?.length > 0 && (
        <div className="grid grid-cols-2 justify-between items-center   mb-3">
          <button
            onClick={() => setIsAccountOpen(false)}
            className={
              !isAccountOpen
                ? ' text-base text-primary   font-semibold py-2 border-b-4 border-primary '
                : ' transition duration-500 text-base text-[#4F4F4F] font-medium py-2 border-b-4 border-[#EBECEF]'
            }
          >
            Customer
          </button>
          <button
            onClick={() => setIsAccountOpen(true)}
            className={
              isAccountOpen
                ? ' text-base text-primary   font-semibold py-2 border-b-4 border-primary '
                : ' transition duration-500 text-base text-[#4F4F4F] font-medium py-2 border-b-4 border-[#EBECEF]'
            }
          >
            Account
          </button>
        </div>
      )}

      <div className={isAccountOpen ? 'hidden' : 'block'}>
        <div className=" border-b border-[#EBECEF] py-4">
          <Link href="/orders?page=1" passHref={true}>
            <button className=" text-base text-[#4F4F4F] font-medium">
              My Orders
            </button>
          </Link>
        </div>
        {marketplace_type === 1 && (
          <div className=" border-b border-[#EBECEF] py-4">
            <Link href="/checkout" passHref={true}>
              <button className=" text-base text-[#4F4F4F] font-medium">
                My Cart
              </button>
            </Link>
          </div>
        )}
        <div className=" border-b border-[#EBECEF] py-4">
          <button
            onClick={() => window.open(general_configs?.terms_url)}
            className=" text-base text-[#4F4F4F] font-medium"
          >
            Terms & Conditions
          </button>
        </div>
        <div className=" border-b border-[#EBECEF] py-4">
          <button
            onClick={() => window.open(general_configs?.privacy_policy_url)}
            className=" text-base text-[#4F4F4F] font-medium"
          >
            Privacy Policy
          </button>
        </div>
        {general_configs?.invite_friends_collection_enabled && (
          <div className=" border-b border-[#EBECEF] py-4">
            <Link href="/invite" passHref={true}>
              <button className=" text-base text-[#4F4F4F] font-medium">
                Invite Friend
              </button>
            </Link>
          </div>
        )}
        <div className="   border-[#EBECEF] py-4">
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
      <div className={!isAccountOpen ? 'hidden' : 'block'}>
        <div className=" border-b border-[#EBECEF] py-4">
          <Link href="/a/my-store?page=1" passHref={true}>
            <button className=" text-base text-[#4F4F4F] font-medium">
              My Account
            </button>
          </Link>
        </div>
        <div className=" border-b border-[#EBECEF] py-4">
          <button
            onClick={() =>
              router.push({
                pathname: '/a/orders',
                query: { store_id: my_stores[0].id ,page:1},
              })
            }
            className=" text-base text-[#4F4F4F] font-medium"
          >
            My Account Orders
          </button>
        </div>

        {my_stores?.length > 0 && (
          <div className=" border-b border-[#EBECEF] py-4">
            <Link href="/payout" passHref={true}>
              <button className=" text-base text-[#4F4F4F] font-medium">
                Payments
              </button>
            </Link>
          </div>
        )}
        <div className=" border-b border-[#EBECEF] py-4">
          <button
            onClick={() => window.open(general_configs?.terms_url)}
            className=" text-base text-[#4F4F4F] font-medium"
          >
            Terms & Conditions
          </button>
        </div>
        <div className=" border-b border-[#EBECEF] py-4">
          <button
            onClick={() => window.open(general_configs?.privacy_policy_url)}
            className=" text-base text-[#4F4F4F] font-medium"
          >
            Privacy Policy
          </button>
        </div>
        {general_configs?.invite_friends_collection_enabled && (
          <div className=" border-b border-[#EBECEF] py-4">
            <Link href="/invite" passHref={true}>
              <button className=" text-base text-[#4F4F4F] font-medium">
                Invite Friend
              </button>
            </Link>
          </div>
        )}
        <div className="   border-[#EBECEF] py-4">
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
    </div>
  );
};

export default ProfileMenus;
