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

const EventButtons = ({ listing_details, selectedVariant }) => {
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');

  const { login, auth_key } = useSelector(authSelector);
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(cartSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const add_to_Cart = () => {
    if (login) {
      const cartData = {
        cart: {
          listing_id: listing_details.id,
          quantity: 1,
        },
      };
      dispatch(addToCart({ authKey: auth_key, data: cartData })).then((res) => {
        if (!res.payload.code) {
          router.push('/checkout');
        }
      });
    } else {
      router.push('/sign-in');
    }
  };
  const closePopUP = () => {
    dispatch(clearCartState());
    setShowError(false);
    setError_message('');
  };
  return (
    <div className=" w-full flex justify-center items-center">
      {(isError || showError) && (
        <OutsideClickHandler
          onOutsideClick={() => {
            (isError || showError) &&
              dispatch(
                setShowError(false),
                setError_message(''),
                clearCartState()
              );
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp
                message={errorMessage || error_message}
                closePopUP={closePopUP}
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}

      {/* <button className="   w-[40%] h-[52px]  flex justify-center items-center border border-primary rounded-lg box-border  ">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 5H5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6C4 6.26522 4.10536 6.51957 4.29289 6.70711C4.48043 6.89464 4.73478 7 5 7H15C15.2652 7 15.5196 6.89464 15.7071 6.70711C15.8946 6.51957 16 6.26522 16 6C16 5.73478 15.8946 5.48043 15.7071 5.29289C15.5196 5.10536 15.2652 5 15 5ZM15 9H5C4.73478 9 4.48043 9.10536 4.29289 9.29289C4.10536 9.48043 4 9.73478 4 10C4 10.2652 4.10536 10.5196 4.29289 10.7071C4.48043 10.8946 4.73478 11 5 11H15C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10C16 9.73478 15.8946 9.48043 15.7071 9.29289C15.5196 9.10536 15.2652 9 15 9ZM17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H14.59L18.29 19.71C18.3834 19.8027 18.4943 19.876 18.6161 19.9258C18.7379 19.9755 18.8684 20.0008 19 20C19.1312 20.0034 19.2613 19.976 19.38 19.92C19.5626 19.845 19.7189 19.7176 19.8293 19.5539C19.9396 19.3901 19.999 19.1974 20 19V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM18 16.59L15.71 14.29C15.6166 14.1973 15.5057 14.124 15.3839 14.0742C15.2621 14.0245 15.1316 13.9992 15 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V16.59Z"
						fill="#15B790"
					/>
				</svg>
				<span className=" text-xl text-primary font-semibold ml-3">
					Chat
				</span>
			</button> */}
      <button
        className="  w-[95%]  h-[52px] bg-primary rounded-lg flex justify-center items-center "
        // onClick={add_to_Cart}
        onClick={() =>
          login
            ? listing_details.variants.length > 0
              ? selectedVariant === null
                ? (setShowError(true), setError_message('Select one ticket'))
                : router.push({
                    pathname: '/checkout',
                    query: {
                      event_id: listing_details.id,
                      variant_id: selectedVariant,
                    },
                  })
              : router.push({
                  pathname: '/checkout',
                  query: { event_id: listing_details.id },
                })
            : router.push('/sign-in')
        }
      >
        {isFetching ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            width="21"
            height="14"
            viewBox="0 0 21 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 5C7.23478 5 6.98043 5.10536 6.79289 5.29289C6.60536 5.48043 6.5 5.73478 6.5 6V8C6.5 8.26522 6.60536 8.51957 6.79289 8.70711C6.98043 8.89464 7.23478 9 7.5 9C7.76522 9 8.01957 8.89464 8.20711 8.70711C8.39464 8.51957 8.5 8.26522 8.5 8V6C8.5 5.73478 8.39464 5.48043 8.20711 5.29289C8.01957 5.10536 7.76522 5 7.5 5ZM19.5 6C19.7652 6 20.0196 5.89464 20.2071 5.70711C20.3946 5.51957 20.5 5.26522 20.5 5V1C20.5 0.734784 20.3946 0.48043 20.2071 0.292893C20.0196 0.105357 19.7652 0 19.5 0H1.5C1.23478 0 0.98043 0.105357 0.792893 0.292893C0.605357 0.48043 0.5 0.734784 0.5 1V5C0.5 5.26522 0.605357 5.51957 0.792893 5.70711C0.98043 5.89464 1.23478 6 1.5 6C1.76522 6 2.01957 6.10536 2.20711 6.29289C2.39464 6.48043 2.5 6.73478 2.5 7C2.5 7.26522 2.39464 7.51957 2.20711 7.70711C2.01957 7.89464 1.76522 8 1.5 8C1.23478 8 0.98043 8.10536 0.792893 8.29289C0.605357 8.48043 0.5 8.73478 0.5 9V13C0.5 13.2652 0.605357 13.5196 0.792893 13.7071C0.98043 13.8946 1.23478 14 1.5 14H19.5C19.7652 14 20.0196 13.8946 20.2071 13.7071C20.3946 13.5196 20.5 13.2652 20.5 13V9C20.5 8.73478 20.3946 8.48043 20.2071 8.29289C20.0196 8.10536 19.7652 8 19.5 8C19.2348 8 18.9804 7.89464 18.7929 7.70711C18.6054 7.51957 18.5 7.26522 18.5 7C18.5 6.73478 18.6054 6.48043 18.7929 6.29289C18.9804 6.10536 19.2348 6 19.5 6ZM18.5 4.18C17.9208 4.3902 17.4205 4.77363 17.0668 5.27816C16.7132 5.7827 16.5235 6.38388 16.5235 7C16.5235 7.61612 16.7132 8.2173 17.0668 8.72184C17.4205 9.22637 17.9208 9.6098 18.5 9.82V12H8.5C8.5 11.7348 8.39464 11.4804 8.20711 11.2929C8.01957 11.1054 7.76522 11 7.5 11C7.23478 11 6.98043 11.1054 6.79289 11.2929C6.60536 11.4804 6.5 11.7348 6.5 12H2.5V9.82C3.07915 9.6098 3.57954 9.22637 3.93316 8.72184C4.28678 8.2173 4.47648 7.61612 4.47648 7C4.47648 6.38388 4.28678 5.7827 3.93316 5.27816C3.57954 4.77363 3.07915 4.3902 2.5 4.18V2H6.5C6.5 2.26522 6.60536 2.51957 6.79289 2.70711C6.98043 2.89464 7.23478 3 7.5 3C7.76522 3 8.01957 2.89464 8.20711 2.70711C8.39464 2.51957 8.5 2.26522 8.5 2H18.5V4.18Z"
              fill="#FEFEFE"
            />
          </svg>
        )}
        <span className=" text-xl text-white font-semibold ml-7 ">
          Book Now
        </span>
      </button>
    </div>
  );
};

export default EventButtons;
