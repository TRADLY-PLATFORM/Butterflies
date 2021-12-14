import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import { useForm } from "react-hook-form";

import {
	cartList,
	cartSelector,
	checkout,
	clearCartState,
	EphemeralKey,
	getAddress,
	getCurrencies,
	getStorageHubAddress,
	paymentIntent,
	paymentMethods,
	saveAddress,
	save_address,
	shippingMethods,
} from "../../../store/feature/cartSlice";
import CartItemBox from "../../Cart/CartItemBox/CartItemBox";
import OrderSummary from "../../Cart/OrderSummary/OrderSummary";
import PaymentMethod from "../../Cart/PaymentMethods/PaymentMethod";
import ShippingMethod from "../../Cart/ShippingMethods/ShippingMethod";
import OutsideClickHandler from "react-outside-click-handler";
import PopUp from "../../Shared/PopUp/PopUp";
import Modal from "../../Shared/Modal.jsx/Modal";
import OrderSuccess from "../../Cart/OrderSuccess/OrderSuccess";
import NoCartItem from "../../Cart/NoCartItem/NoCartItem";
import AddressForm from "../../Cart/AddressForm/AddressForm";
import ShippingAddresses from "../../Cart/ShippingAddresses/ShippingAddresses";
import StorageHubAddresses from "../../Cart/StorageHubAddress/StorageHubAddresses";
import CustomLoading from "../../Shared/Loading/CustomLoading";

const CheckoutPageLayout = () => {
	const [paymentMethod, setPaymentMethod] = useState(null);
	const [shippingMethod, setShippingMethod] = useState(null);

	const [showError, setShowError] = useState(false);
	const [error_message, setError_message] = useState("");

	const [showShippingAddressForm, setShowShippingAddressForm] =
		useState(false);
	const [selectShippingAddress, setSelectShippingAddress] = useState(null);
	const [isNewAddress, setIsNewAddress] = useState(false);

	const [selectStorageHubAddress, setSelectStorageHubAddress] =
			useState(null);

	const {
		register,
		handleSubmit,
  	} = useForm();

	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const { login, auth_key } = useSelector(authSelector);
	const { order_reference, currencies, addresses, storage_hub_addresses } =
		useSelector(cartSelector);
	const dispatch = useDispatch();
	const router = useRouter();
 

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

			dispatch(shippingMethods({ authKey: auth_key }));
			dispatch(paymentMethods({ authKey: auth_key }));
			dispatch(EphemeralKey({ authKey: auth_key }));
			dispatch(
				getAddress({
					bodyParam: { type: "delivery" },
					authKey: auth_key,
				})
			);
			dispatch(
				getStorageHubAddress({
					bodyParam: { type: "storage_hub" },
					authKey: auth_key,
				})
			);
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

	const clickCheckOut = () => {
		if (shippingMethod === null) {
			setShowError(true);
			setError_message("Shipping Method is required");
			return false;
		}
		if (shippingMethod.type === "delivery") {
			if (selectShippingAddress === null) {
				setShowError(true);
				setError_message(
					"Select Your One shipping Address"
				);
				return false;
			}
		}
		if (shippingMethod.type === "storage_hub") {
			if (selectStorageHubAddress === null) {
				setShowError(true);
				setError_message(
					`Select Your One ${shippingMethod.name}  Address`
				);
				return false;
			}
		}
		if (paymentMethod === null) {
			setShowError(true);
			setError_message("Payment Method is required");
			return false;
		}

		let checkout_data;
		if (shippingMethod.type === "delivery") {
			checkout_data = {
				order: {
					payment_method_id: paymentMethod.id,
					shipping_method_id: shippingMethod.id,
					shipping_address_id:
						selectShippingAddress.id,
				},
			};
		}
		else if (shippingMethod.type === "storage_hub") {
			checkout_data = {
				order: {
					payment_method_id: paymentMethod.id,
					shipping_method_id: shippingMethod.id,
					shipping_address_id:
						selectStorageHubAddress.id,
				},
			};
		}
		
		else {
			checkout_data = {
				order: {
					payment_method_id: paymentMethod.id,
					shipping_method_id: shippingMethod.id,
				},
			};
		}
		if (paymentMethod.type === "stripe") {
			dispatch(
				checkout({
					authKey: auth_key,
					checkoutData: checkout_data,
					currency: currencies && currencies[0]?.code,
				})
			).then((res) => {
				if (!res.payload.code) {
					dispatch(
						paymentIntent({
							authKey: auth_key,
							sendData: {
								order_reference:
									res.payload
										.order_reference,
							},
						})
					).then((res) => {
						if (!res.payload.code) {
							router.push("/payment");
						}
					});
				}
			});
		} else {
			dispatch(
				checkout({
					authKey: auth_key,
					checkoutData: checkout_data,
					currency: currencies && currencies[0]?.code,
				})
			).then((res) => {
				if (!res.payload.code) {
					setShowSuccessMessage(true);
				}
			});
		}
	};

	const onSubmit = (data) => {
		const id = !isNewAddress ? selectShippingAddress.id : "";
		dispatch(
			save_address({
				 id,
				addressData: {
					address: { ...data, type: "delivery" },
				},
				authKey: auth_key,
			})
		).then((res) => {
			if (!res.payload.code) {
				dispatch(
					getAddress({
						bodyParam: { type: "delivery" },
						authKey: auth_key,
					})
				);
				setShowShippingAddressForm(false);
			}
		});
	};

	const closePopUP = () => {
		dispatch(clearCartState());
		setShowError(false);
		setError_message("");
	};

	return (
    <>
      {isFetching&& <CustomLoading/>}
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
      {showShippingAddressForm && (
        <Modal>
          <OutsideClickHandler
            onOutsideClick={() => {
              setShowShippingAddressForm(false);
            }}
          >
            <AddressForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              setShowShippingAddressForm={setShowShippingAddressForm}
            />
          </OutsideClickHandler>
        </Modal>
      )}

      {cart_details === null || cart_details.length > 0 ? (
        <div className="  mx-auto w-full    sm:px-8 md:px-0 flex  flex-col justify-center c-md:flex-row c-md:justify-between    c-md:max-w-[824px]  lg:max-w-[1000px]  ">
          <div className="   c-md:w-[400px] lg:w-[600px] ">
            <div className="bg-[#FEFEFE] rounded-lg py-12 px-9">
              <CartItemBox cart={cart} cart_details={cart_details} />
            </div>
            <div className="mt-6">
              <ShippingMethod
                shipping_methods={shipping_methods}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
              />
            </div>
            {shippingMethod?.type === 'delivery' && (
              <div className="mt-6  w-full min-h-[100px] bg-[#FEFEFE] rounded-lg p-[31px]">
                <p className="text-primary text-xl leading-6 font-medium ">
                  {shippingMethod.name} Address
                </p>
                <div className="mt-6">
                  <ShippingAddresses
                    addresses={addresses}
                    selectShippingAddress={selectShippingAddress}
                    setSelectShippingAddress={setSelectShippingAddress}
                  />
                </div>
                <div className="mt-5 flex justify-start flex-wrap">
                  <button
                    className=" bg-primary rounded-lg px-4 py-2 text-white text-sm  hover:bg-opacity-80"
                    onClick={() => {
                      setShowShippingAddressForm(true), setIsNewAddress(true);
                    }}
                  >
                    Add New Address
                  </button>
                  {selectShippingAddress && (
                    <button
                      className=" bg-primary rounded-lg px-4 py-2 text-white text-sm  hover:bg-opacity-80 ml-5"
                      onClick={() => {
                        setShowShippingAddressForm(true),
                          setIsNewAddress(false);
                      }}
                    >
                      Change Address
                    </button>
                  )}
                </div>
              </div>
            )}
            {shippingMethod?.type === 'storage_hub' && (
              <div className="mt-6  w-full min-h-[100px] bg-[#FEFEFE] rounded-lg p-[31px]">
                <p className="text-primary text-xl leading-6 font-medium ">
                  {shippingMethod.name}
                  Address
                </p>
                <div className="mt-6">
                  <StorageHubAddresses
                    addresses={storage_hub_addresses}
                    selectStorageHubAddress={selectStorageHubAddress}
                    setSelectStorageHubAddress={setSelectStorageHubAddress}
                  />
                </div>
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
            <OrderSummary cart={cart} cart_details={cart_details} />
            {cart && (
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
            )}
          </div>
        </div>
      ) : (
        <div>
          <NoCartItem />
        </div>
      )}
    </>
  );
};

export default CheckoutPageLayout;
