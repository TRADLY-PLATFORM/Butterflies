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
} from '../../Shared/Constant/Constant';
import { authSelector } from '../../../store/feature/authSlice';
import {
  getAllListings,
  listingLike,
  listingSelector,
} from '../../../store/feature/listingSlice';
   import { configsSelector } from '../../../store/feature/configsSlice';
 import ListListingCard from '../../Shared/Cards/ListListingCard';
import MarkerListingCard from '../../Shared/Cards/MarkerListingCard';

const MarkerListing = ({ item }) => {
  const { login, auth_key } = useSelector(authSelector);
  const { marketplace_type, marketplace_module } = useSelector(configsSelector);
  // const { isSuccess } = useSelector(listingSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const { page } = useSelector(listingSelector);

  const like = (id, isLiked) => {
    if (login) {
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
    } else {
      router.push('/sign-in');
    }
  };
  return (
    <div  className=" relative ">
      <MarkerListingCard
        item={item}
        like={like}
        marketplace_type={marketplace_type}
        map_card={true}
      />
    </div>
  );
};

export default MarkerListing;
