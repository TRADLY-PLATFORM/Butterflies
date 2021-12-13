import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { useForm } from 'react-hook-form';
import tradly from 'tradly';

import {
  cartList,
  cartSelector,
  clearCartState,
  directCheckout,
  EphemeralKey,
  getCurrencies,
  getSchedulesData,
  paymentIntent,
  paymentMethods,
} from '../../../store/feature/cartSlice';
import PaymentMethod from '../../Cart/PaymentMethods/PaymentMethod';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUp from '../../Shared/PopUp/PopUp';
import Modal from '../../Shared/Modal.jsx/Modal';
import OrderSuccess from '../../Cart/OrderSuccess/OrderSuccess';
import NoCartItem from '../../Cart/NoCartItem/NoCartItem';
import {
  listingDetails,
  listingSelector,
} from '../../../store/feature/listingSlice';
import EventCartItemBox from '../../Cart/CartItemBox/EventCartItemBox';
import EventOrderSummary from '../../Cart/OrderSummary/EventOrderSummary';
import ScheduleSelect from '../../Cart/SchedulePart/ScheduleSelect';
import { getDatesArray } from '../../Shared/Constant/Constant';
import moment from 'moment';
import api from '../../../pages/api/api';

const EventCheckoutPageLayout = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');

  let dates = getDatesArray();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);

  const [scheduleArray, setScheduleArray] = useState(null);
  const [selectedScheduleTimeIndex, setSelectedScheduleTimeIndex] =
    useState(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { login, auth_key } = useSelector(authSelector);
  const { order_reference, currencies, addresses, storage_hub_addresses } =
    useSelector(cartSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  // Use Effect functions

  useEffect(() => {
    setSelectedDate(moment(dates[0]).format('YYYY-MM-DD'));
    setSelectedDateIndex(0);
    if (auth_key && router.query.event_id && selectedDate) {
      tradly.app
        .getSchedule({
          id: `${router.query.event_id}`,
          bodyParam: { days: 30, start_at: selectedDate },
          authKey: auth_key,
        })
        .then((res) => {
          if (!res.error) {
            setScheduleArray(res.data.schedules_per_day);
          }
        });
    }
  }, [setSelectedDate, auth_key, router.query.event_id, selectedDate]);

  useEffect(() => {
    if (router?.query.event_id) {
      dispatch(
        listingDetails({
          id: router?.query.event_id,
          authKey: auth_key,
        })
      );
    }
  }, [auth_key, dispatch, router?.query.event_id]);

  useEffect(() => {
    if (login) {
      if (currencies) {
        dispatch(
          cartList({
            authKey: auth_key,
            currency: currencies[0]?.code,
          })
        );
      }

      dispatch(paymentMethods({ authKey: auth_key }));
      dispatch(EphemeralKey({ authKey: auth_key }));
    } else {
      // router.push("/sign-in")
    }
  }, [auth_key, dispatch, login, router, currencies]);

  const {
    cart,
    cart_details,
    payment_methods,
    shipping_methods,
    isError,
    errorMessage,
    isFetching,
    isCheckoutFetching,
    isSuccess,
  } = useSelector(cartSelector);

  const { listing_details } = useSelector(listingSelector);

  const clickCheckOut = () => {
    if (
      listing_details?.schedules.length > 0 &&
      selectedScheduleTimeIndex === null
    ) {
      setShowError(true);
      setError_message('select one schedule time. ');
      return false;
    }

    if (paymentMethod === null) {
      setShowError(true);
      setError_message('Payment Method is required');
      return false;
    }

    let checkout_data;
    if (listing_details.schedules.length > 0) {
      checkout_data = {
        payment_method_id: paymentMethod.id,
        quantity: quantity,
        type: 'events',
        start_at: `${scheduleArray[selectedDateIndex].schedules[selectedScheduleTimeIndex].start_time}:00`,
        end_at: `${scheduleArray[selectedDateIndex].schedules[selectedScheduleTimeIndex].end_time}:00`,
      };
    } else {
      checkout_data = {
        payment_method_id: paymentMethod.id,
        quantity: quantity,
        type: 'events',
      };
    }

    if (router.query.variant_id) {
      checkout_data['variant_id'] = router.query.variant_id;
    }
    if (paymentMethod.type === 'stripe') {
      dispatch(
        directCheckout({
          authKey: auth_key,
          checkoutData: { order: checkout_data },
          id: router.query.event_id,
          currency: currencies && currencies[0]?.code,
        })
      ).then((res) => {
        if (!res.payload.code) {
          dispatch(
            paymentIntent({
              authKey: auth_key,
              sendData: {
                order_reference: res.payload.order_reference,
              },
            })
          ).then((res) => {
            if (!res.payload.code) {
              router.push('/payment');
            }
          });
        }
      });
    } else {
      dispatch(
        directCheckout({
          authKey: auth_key,
          checkoutData: { order: checkout_data },
          id: router.query.event_id,
          currency: currencies && currencies[0]?.code,
        })
      ).then((res) => {
        if (!res.payload.code) {
          setShowSuccessMessage(true);
        }
      });
    }
  };

  const closePopUP = () => {
    dispatch(clearCartState());
    setShowError(false);
    setError_message('');
  };


  return (
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
      {showSuccessMessage && (
        <Modal>
          <OutsideClickHandler
            onOutsideClick={() => {
              setShowSuccessMessage(false);
              router.push('/');
            }}
          >
            <OrderSuccess />
          </OutsideClickHandler>
        </Modal>
      )}

      <div className="   mx-auto w-full    sm:px-8 md:px-0 flex  flex-col justify-center c-md:flex-row c-md:justify-between    c-md:max-w-[824px]  lg:max-w-[1000px]  ">
        <div className="   c-md:w-[400px] lg:w-[600px] ">
          <div className="bg-[#FEFEFE] rounded-lg py-12 px-9">
            {/* <CartItemBox cart={cart} cart_details={cart_details} /> */}
            <EventCartItemBox
              listing_details={listing_details}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
          {listing_details?.schedules?.length > 0 && (
            <div className="mt-6">
              <ScheduleSelect
                dates={dates}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedDateIndex={selectedDateIndex}
                setSelectedDateIndex={setSelectedDateIndex}
                scheduleArray={scheduleArray}
                selectedScheduleTimeIndex={selectedScheduleTimeIndex}
                setSelectedScheduleTimeIndex={setSelectedScheduleTimeIndex}
              />
            </div>
          )}

          <div className="mt-6">
            <PaymentMethod
              payment_methods={payment_methods}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
        </div>
        <div className=" mt-6 c-md:mt-0 c-md:w-[400px] lg:w-[380px]">
          {/* <OrderSummary cart={cart} cart_details={cart_details} /> */}
          <EventOrderSummary
            listing_details={listing_details}
            quantity={quantity}
          />

          <div className="flex justify-center  mt-6">
            <button
              className=" w-5/6 bg-primary  rounded-full py-[12px] text-center text-base  text-white flex justify-center items-center font-semibold"
              onClick={clickCheckOut}
            >
              {isCheckoutFetching && (
                <span>
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
                </span>
              )}
              <span className=" ">Checkout</span>
            </button>
          </div>
        </div>
      </div>
      {/* ) : (
        <div>
          <NoCartItem />
        </div>
      )} */}
    </>
  );
};

export default EventCheckoutPageLayout;
