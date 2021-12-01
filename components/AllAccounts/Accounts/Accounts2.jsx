/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import { getThumbnailImage } from '../../Shared/Constant/Constant';
import demoImage from '../../../assets/Images/store/avatar1.png';
import tradly from 'tradly';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  get_all_accounts,
  storeSelector,
} from '../../../store/feature/storeSlice';
import { useRouter } from 'next/dist/client/router';

const Accounts2 = ({ accounts }) => {
  const { login, auth_key } = useSelector(authSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const follow = (id, isFollow) => {
    if (login) {
      tradly.app
        .followUnfollowAccounts({
          id,
          authKey: auth_key,
          isFollowing: isFollow,
        })
        .then((res) => {
          if (!res.code) {
            dispatch(
              get_all_accounts({
                bodyParam: {
                  page: router.query.page,
                  type: 'accounts',
                  per_page: 30,
                },
                authKey: auth_key,
              })
            );
          }
        });
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <div className="  grid grid-cols-2   gap-4  ms:gap-0  ms:grid-cols-[190px,190px] justify-around   xs:flex  xs:flex-wrap   xs:justify-center md:justify-center">
      {accounts?.map((item) => {
        return (
          <div className=" relative  ms:mb-5  ms:mr-4 " key={item.id}>
            <div
              className=" ms:w-[190px] min-h-[260px] bg-[#FEFEFE]   rounded   overflow-hidden cursor-pointer shadow-c-xsm relative px-[22px] py-[25px] flex flex-col justify-between "
              //   onClick={() => router.push(`/listing/${item.id}`)}
            >
              <div className="w-[64px]  h-[64px] rounded-full overflow-hidden relative mx-auto ">
                {item?.images?.length > 0 ? (
                  <Image
                    src={getThumbnailImage(item?.images[0])}
                    alt={item?.title}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src={demoImage}
                    alt="image"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div>
                <p className="w-full text-[#000000] font-semibold text-[14px] text-center ">
                  {item.user.first_name.length > 15
                    ? item.user.first_name.substring(0, 15) + '..'
                    : item.user.first_name}
                </p>
                <p className="mt-2 text-[#4A4A4A] text-[18px] w-full text-center">
                  {item.name.length > 15
                    ? item.name.substring(0, 13) + '..'
                    : item.name}
                </p>
              </div>
              <div>
                <button
                  className={[
                    'w-full h-[34px] flex justify-center items-center rounded-xl border border-primary  ',
                    item.following
                      ? 'text-[#FFFFFF]  bg-primary'
                      : 'text-primary   bg-transparent',
                  ].join(' ')}
                  onClick={() => follow(item.id, item.following)}
                >
                  {item.following ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accounts2;
