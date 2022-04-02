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

const ProductButtons = ({
  listing_details,
  selectedVariant,
  setError_message,
  setShowError,
}) => {
  console.log(selectedVariant);

  const { login, auth_key } = useSelector(authSelector);
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(cartSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const add_to_Cart = (isBuyNow) => {
    if (isBuyNow) {
      const cartData = {
        cart: {
          listing_id: listing_details.id,
          quantity: 1,
        },
      };
      if (selectedVariant !== null) {
        cartData.cart['variant_id'] = selectedVariant;
      }
      dispatch(addToCart({ authKey: auth_key, data: cartData })).then((res) => {
        if (!res.payload.code) {
          router.push('/checkout');
        }
      });
    } else {
      const cartData = {
        cart: {
          listing_id: listing_details.id,
          quantity: 1,
        },
      };
      if (selectedVariant !== null) {
        cartData.cart['variant_id'] = selectedVariant;
      }
      dispatch(addToCart({ authKey: auth_key, data: cartData })).then((res) => {
        if (!res.payload.code) {
          dispatch(
            listingDetails({
              id: router?.query.id,
              authKey: auth_key,
            })
          );
        }
      });
    }
  };
  const closePopUP = () => {
    setShowError(false);
    setError_message('');
    dispatch(clearCartState());
  };
  return (
    <>
      {isFetching && <CustomLoading />}

      <div className=" w-full  flex justify-between items-center">
        <button
          className="   w-[45%]  h-[44px] md:h-[52px]  flex justify-center items-center border border-primary rounded-lg box-border  "
          onClick={() =>
            login
              ? listing_details.in_cart
                ? router.push('/checkout')
                : listing_details.variants.length > 0
                ? selectedVariant === null
                  ? (setShowError(true), setError_message('Select one Variant'))
                  : add_to_Cart(false)
                : add_to_Cart(false)
              : router.push(`/sign-in?to=${router.asPath}`)
          }
        >
          <span className=" text-base  sm:text-xl text-primary font-semibold ml-3">
            {listing_details?.in_cart ? 'Go To Cart' : ' Add To Cart'}
          </span>
        </button>
        <button
          className="  w-[50%]  h-[44px]  md:h-[52px] bg-primary rounded-lg flex justify-center items-center "
          // onClick={add_to_Cart}
          onClick={() =>
            login
              ? listing_details.variants.length > 0
                ? selectedVariant === null
                  ? (setShowError(true), setError_message('Select one Variant'))
                  : add_to_Cart(true)
                : add_to_Cart(true)
              : router.push(`/sign-in?to=${router.asPath}`)
          }
        >
          <span className=" text-base sm:text-xl text-white font-semibold  ">
            Buy Now
          </span>
        </button>
      </div>
    </>
  );
};

export default ProductButtons;
