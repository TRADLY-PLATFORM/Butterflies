/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  addToCart,
  deleteCart,
  cartList,
  cartSelector,
  clearCartState,
} from '../../../store/feature/cartSlice';
import PopUp from '../../Shared/PopUp/PopUp';
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from 'next/dist/client/router';
import { configsSelector } from '../../../store/feature/configsSlice';

const EventCartItemBox = ({ listing_details, quantity, setQuantity }) => {
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');

  const router = useRouter();
  const variant_id = router.query.variant_id;
  const selecte_varient_details = listing_details?.variants.filter(
    (item) => item.id === Number(variant_id)
  );

  const { marketplace_type, listings_configs } = useSelector(configsSelector);

  const dispatch = useDispatch();
  const { login, auth_key } = useSelector(authSelector);
  const { isError, isSuccess, errorMessage } = useSelector(cartSelector);

  const updateCartQuantity = (increase) => {
    let ItemQuantity = !variant_id
      ? listing_details.stock
      : selecte_varient_details[0].stock;
    if (increase) {
      if (quantity === ItemQuantity && listings_configs?.enable_stock) {
        setShowError(true);
        setError_message(`There are not ${quantity + 1} products in stock`);

        return false;
      } else {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        setShowError(true);
        setError_message('Quantity cannot be less than 1');
        return false;
      }
    }
  };

  const closePopUP = () => {
    dispatch(clearCartState());
    setShowError(false);
    setError_message('');
  };

  return listing_details ? (
    <>
      {(showError || isError) && (
        <OutsideClickHandler
          onOutsideClick={() => {
            (showError || isError) &&
              (setShowError(false),
              setError_message(''),
              dispatch(clearCartState()));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp
                message={error_message || errorMessage}
                closePopUP={closePopUP}
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}

      <div className=" w-full border border-primary rounded-lg px-[24px] py-[16px] grid  grid-cols-[100%] justify-between lg:grid-cols-[60%,35%]  mb-4">
        <div>
          {listings_configs?.enable_stock && (
            <p className=" text-xs  font-semibold leading-6 text-primary">
              {`${
                !variant_id
                  ? listing_details?.stock
                  : selecte_varient_details[0]?.stock
              }  tickets left`}
            </p>
          )}
          <p className=" text-base text-black font-semibold mt-[2px]">
            {!variant_id
              ? listing_details.title
              : selecte_varient_details[0].title}
          </p>
          <p className=" mt-[11px] text-secondary text-xs font-medium flex flex-wrap items-center">
            <span className=" text-xs leading-6 font-medium text-secondary mr-2">
              {!variant_id
                ? listing_details.offer_price.currency
                : selecte_varient_details[0].offer_price.currency}
            </span>
            <span className="text-sm  ">
              {!variant_id
                ? listing_details.offer_price.amount
                : selecte_varient_details[0].offer_price.amount}
            </span>
          </p>
        </div>
        <div className=" w-full mt-6 lg:mt-0  flex items-center justify-around">
          <div className="  min-w-[90px] h-[32px] border border-primary rounded-[2px]  flex justify-between items-center ">
            <button
              onClick={() => updateCartQuantity(false)}
              className=" w-[32px] h-[32px] bg-primary  rounded-l-sm flex justify-center items-center text-xl leading-6 font-medium text-white"
            >
              -
            </button>
            <span className=" text-sm leading-4 font-medium text-[#4A4A4A] mx-3">
              {quantity}
            </span>
            <button
              onClick={() => updateCartQuantity(true)}
              className="w-[32px] h-[32px] bg-primary  rounded-r-sm flex justify-center items-center text-xl leading-6 font-medium  text-white "
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded"></div>
            <div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCartItemBox;
