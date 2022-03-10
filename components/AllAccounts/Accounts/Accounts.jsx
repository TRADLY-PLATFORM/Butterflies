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
import AccountCard from '../../Shared/Cards/AccountCard';
import { check_login } from '../../../constant/check_auth';
import axios from 'axios';

const Accounts = ({ accounts }) => {
  const { login, auth_key } = useSelector(authSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const follow = (id, isFollow) => {
    if (check_login(router)) {
      axios
        .post('/api/a/follow_account', { id, isFollow })
        .then((res) => {
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
        })
        .catch((error) => {
          alert(error.response.data.message)
        });
    }
  };

  return (
    <div className="  grid grid-cols-2   gap-4  ms:gap-0  ms:grid-cols-[190px,190px] justify-around   xs:flex  xs:flex-wrap   xs:justify-center md:justify-center">
      {accounts?.map((item) => {
        return (
          <div className=" relative w-[190px]  ms:mb-5  ms:mr-4 " key={item.id}>
            <AccountCard item={item} follow={follow} />
          </div>
        );
      })}
    </div>
  );
};

export default Accounts;
