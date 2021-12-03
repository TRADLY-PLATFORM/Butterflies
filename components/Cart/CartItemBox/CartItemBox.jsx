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
import { configsSelector } from '../../../store/feature/configsSlice';

const CartItemBox = ({ cart, cart_details }) => {
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');

  const { marketplace_type, listings_configs } = useSelector(configsSelector);

  const dispatch = useDispatch();
  const { login, auth_key } = useSelector(authSelector);
  const { isError, isSuccess, errorMessage } = useSelector(cartSelector);

  const updateCartQuantity = (listing, quantity, increase) => {
    let cartData;
    if (increase) {
      if (quantity < listing.max_quantity) {
        if (
          (quantity === listing.stock || quantity > listing.stock) &&
          listings_configs?.enable_stock
        ) {
          setShowError(true);
          setError_message(`There are not ${quantity + 1} products in stock`);

          return false;
        } else {
          cartData = {
            cart: {
              listing_id: listing.id,
              quantity: quantity + 1,
            },
          };
        }
      } else {
        setShowError(true);
        setError_message(`The highest quantity is ${listing.max_quantity} `);
        return false;
      }
    } else {
      if (quantity > 1) {
        cartData = {
          cart: {
            listing_id: listing.id,
            quantity: quantity - 1,
          },
        };
      } else {
        setShowError(true);
        setError_message('Quantity cannot be less than 1');
        return false;
      }
    }
    dispatch(addToCart({ authKey: auth_key, data: cartData })).then((res) => {
      if (!res.payload.code) {
        dispatch(cartList({ authKey: auth_key }));
      }
    });
  };

  const delete_cart = (id) => {
    dispatch(
      deleteCart({
        authKey: auth_key,
        data: {
          cart: {
            listing_id: [id],
          },
        },
      })
    ).then((res) => {
      if (!res.payload.code) {
        dispatch(cartList({ authKey: auth_key }));
      }
    });
  };
  const closePopUP = () => {
    dispatch(clearCartState());
    setShowError(false);
    setError_message('');
  };

  return cart_details ? (
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

      {cart_details.map((cartItem) => {
        return (
          <div
            className=" w-full border border-primary rounded-lg px-[24px] py-[16px] grid  grid-cols-[100%] justify-between lg:grid-cols-[60%,35%]  mb-4"
            key={cartItem.id}
          >
            <div>
              {listings_configs?.enable_stock && (
                <p className=" text-xs  font-semibold leading-6 text-primary">
                  {cartItem.listing.stock} products in stock
                </p>
              )}
              <p className=" text-base text-black font-semibold mt-[2px]">
                {cartItem.listing.title}
              </p>
              <p className=" mt-[11px] text-secondary text-xs font-medium flex flex-wrap items-center">
                <span className=" text-xs leading-6 font-medium text-secondary mr-2">
                  {cartItem.listing.list_price.currency}
                </span>
                <span className="text-sm  ">
                  {cartItem.listing.list_price.amount}
                </span>
              </p>
            </div>
            <div className=" w-full mt-6 lg:mt-0  flex items-center justify-around">
              <div className="  min-w-[90px] h-[32px] border border-primary rounded-[2px]  flex justify-between items-center ">
                <button
                  onClick={() =>
                    updateCartQuantity(
                      cartItem.listing,
                      cartItem.quantity,
                      false
                    )
                  }
                  className=" w-[32px] h-[32px] bg-primary  rounded-l-sm flex justify-center items-center text-xl leading-6 font-medium text-white"
                >
                  -
                </button>
                <span className=" text-sm leading-4 font-medium text-[#4A4A4A] mx-3">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() =>
                    updateCartQuantity(
                      cartItem.listing,
                      cartItem.quantity,
                      true
                    )
                  }
                  className="w-[32px] h-[32px] bg-primary  rounded-r-sm flex justify-center items-center text-xl leading-6 font-medium  text-white "
                >
                  +
                </button>
              </div>
              <div className="ml-6">
                <button
                  className="w-[32px] h-[32px] bg-primary   flex justify-center items-center text-xl leading-6 font-medium  text-white  rounded"
                  onClick={() => delete_cart(cartItem.listing.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
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

export default CartItemBox;
