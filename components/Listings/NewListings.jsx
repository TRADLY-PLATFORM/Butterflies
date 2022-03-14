/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDateFormat,
  getThumbnailImage,
} from '../Shared/Constant/Constant';
import { authSelector } from '../../store/feature/authSlice';
import {
  getAllListings,
  listingLike,
  listingSelector,
} from '../../store/feature/listingSlice';
import favorite from '../../assets/Images/Home/favourite@3x.png';
import heartIcon from '../../assets/Images/Home/heartIcon@3x.png';
import ListingCard from '../Shared/Cards/ListingCard';
import { configsSelector } from '../../store/feature/configsSlice';
import Filter from './Filter/Filter';
import { check_login } from '../../constant/check_auth';

const NewListings = ({ Products, like_listing }) => {
  const { login, auth_key } = useSelector(authSelector);
  const { MARKETPLACE_MODULES, MARKETPLACE_FLAVOURS } =
    useSelector(configsSelector);
  // const { isSuccess } = useSelector(listingSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const { page } = useSelector(listingSelector);

  const like = (id, isLiked) => {
    if (check_login(router)) {
      if (like_listing) {
        like_listing(id, isLiked);
      } else {
        dispatch(
          listingLike({
            id,
            isLiked,
            authKey: auth_key,
          })
        ).then((res) => {
          if (!res.payload.code) {
            dispatch(
              getAllListings({
                prams: router.query,
                authKey: auth_key,
              })
            );
          }
        });
      }
    }
  };
  return (
    <>
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
    </>
  );
};

export default NewListings;
