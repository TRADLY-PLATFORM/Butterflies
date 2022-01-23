/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import {
  addToCart,
  cartSelector,
  clearCartState,
} from '../../../store/feature/cartSlice';
import { authSelector } from '../../../store/feature/authSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUp from '../../Shared/PopUp/PopUp';
import CustomLoading from '../../Shared/Loading/CustomLoading';
import { listingDetails } from '../../../store/feature/listingSlice';
import Link from 'next/link';

const CustomProductButton = ({ attributes }) => {
  const router = useRouter();
  const link = attributes?.filter((it) => it.name === 'External Link');
 
  return (
    link?.length > 0 && (
      <>
        <div className=" w-full flex justify-center items-center">
          <Link href={link[0].values[0]}>
            <a
              className=" w-full text-center py-3 px-10 bg-primary rounded-lg text-white"
              target="_blank"
            >
              Install
            </a>
          </Link>
        </div>
      </>
    )
  );
};

export default CustomProductButton;
