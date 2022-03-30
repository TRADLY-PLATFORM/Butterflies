/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import tradly from 'tradly';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { listingDetails } from '../../../store/feature/listingSlice';
import Link from 'next/link';
import axios from 'axios';
import { check_login } from '../../../constant/check_auth';
import { getThumbnailImage } from '../../Shared/Constant/Constant';

const StoreNameBox = ({ account }) => {
  const { login, auth_key } = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const follow = (id, isFollow) => {
    if (check_login(router)) {
      axios.post('/api/a/follow_account', { id, isFollow }).then((res) => {
        dispatch(
          listingDetails({
            id: router?.query.id,
            authKey: auth_key,
          })
        );
      });
    }
  };
  return (
    <div className=" bg-white rounded  w-full  min-h-[81px] flex   justify-between items-center  p-[16px] shadow-c-sm">
      <div className="flex items-center">
        <div className="flex justify-start items-start ">
          {account?.images[0] && (
            <img
              src={getThumbnailImage(account?.images[0])}
              alt="store Image"
              className=" w-[32px] h-[32px] rounded-full overflow-hidden relative object-cover "
            />
          )}
        </div>
        <Link
          href={{
            pathname: '/a/[id]',
            query: {
              id: account?.slug?account?.slug:`${account?.id}-${account?.name.replace(/\s/g, '-')}`,
              page: 1,
            },
          }}
        >
          <a
            className=" block ml-[10px] cursor-pointer "
            // onClick={() =>
            //   router.push({
            //     pathname: '/a/[id]',
            //     query: {
            //       id: `${account?.id}-${account?.name.replace(/\s/g, '-')}`,
            //       page: 1,
            //     },
            //   })
            // }
          >
            <p className="text-base leading-4 text-[#121212] font-medium">
              {account?.name}
            </p>
          </a>
        </Link>
      </div>
      <div className="  flex justify-center  float-right">
        <button
          className={[
            '  rounded w-[80px] h-[30px] flex justify-center items-center  text-xs leading-3 font-semibold border border-primary',
            account.following
              ? 'bg-primary text-white '
              : 'bg-transparent text-primary ',
          ].join(' ')}
          onClick={() => follow(account.id, account.following)}
        >
          {account.following ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default StoreNameBox;
