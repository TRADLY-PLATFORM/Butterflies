/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';

import ListingCard from '../../Shared/Cards/ListingCard';
import { configsSelector } from '../../../store/feature/configsSlice';
import { authSelector } from '../../../store/feature/authSlice';
import { listingLike } from '../../../store/feature/search';
import tradly from 'tradly';
import axios from 'axios';
import { check_login } from '../../../constant/check_auth';

const AccountListingsItem = ({
  Products,
  setAccount_details,
  setIsDataLoading,
}) => {
  const { login, auth_key } = useSelector(authSelector);
  const { MARKETPLACE_MODULES, MARKETPLACE_FLAVOURS } =
    useSelector(configsSelector);
  // const { isSuccess } = useSelector(listingSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  // like listing
  const like = (id, isLiked) => {
    if (check_login(router)) {
      setIsDataLoading(true);
      dispatch(
        listingLike({
          id,
          isLiked,
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          axios
            .get(`/api/a/${router.query.id}`)
            .then((res) => {
              setAccount_details(res.data.account);
              setIsDataLoading(false);
            })
            .catch((error) => {
              setIsDataLoading(false);
            });
        } else {
          setIsDataLoading(false);
        }
      });
    }
  };
  return (
    <div className="grid grid-cols-listing_card_2  md:grid-cols-listing_card_3   lg:grid-cols-listing_card_4  xl:grid-cols-listing_card_5  gap-5 justify-center">
      {Products?.map((item) => (
        <div key={Math.random()} className=" relative">
          <ListingCard
            item={item}
            like={like}
            MARKETPLACE_MODULES={MARKETPLACE_MODULES}
          />
        </div>
      ))}
    </div>
  );
};

export default AccountListingsItem;
