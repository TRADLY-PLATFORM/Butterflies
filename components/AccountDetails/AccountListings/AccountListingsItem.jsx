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
import tradly from "tradly"
 
 

const AccountListingsItem = ({ Products, setAccount_details ,setIsDataLoading}) => {
  const { login, auth_key } = useSelector(authSelector);
  const { marketplace_type, marketplace_module } = useSelector(configsSelector);
  // const { isSuccess } = useSelector(listingSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const like = (id, isLiked) => {
    if (login) {
      setIsDataLoading(true);
      dispatch(
        listingLike({
          id,
          isLiked,
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
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
    <div className="grid grid-cols-listing_card_2  md:grid-cols-listing_card_3   lg:grid-cols-listing_card_4  xl:grid-cols-listing_card_5  gap-5 justify-center">
      {Products?.map((item) => (
        <div key={Math.random()} className=" relative">
          <ListingCard
            item={item}
            like={like}
            marketplace_type={marketplace_type}
          />
        </div>
      ))}
    </div>
  );
};

export default AccountListingsItem;
