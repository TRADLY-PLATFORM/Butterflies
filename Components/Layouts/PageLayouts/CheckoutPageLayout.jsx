import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import {
	cartList,
	cartSelector,
	checkout,
	clearCartState,
	getAddress,
	paymentMethods,
	shippingMethods,
} from "../../../store/feature/cartSlice";
import CartItemBox from "../../Cart/CartItemBox/CartItemBox";
import OrderSummary from "../../Cart/OrderSummary/OrderSummary";
import PaymentMethod from "../../Cart/PaymentMethods/PaymentMethod";
import ShippingMethod from "../../Cart/ShippingMethods/ShippingMethod";
import AddressForm from "../../Cart/AddressForm/AddressForm";
import OutsideClickHandler from "react-outside-click-handler";
import PopUp from "../../Shared/PopUp/PopUp";
import Modal from "../../Shared/Modal.jsx/Modal";
import OrderSuccess from "../../Cart/OrderSuccess/OrderSuccess";

const CheckoutPageLayout = () => {
	const [paymentMethod, setPaymentMethod] = useState(null);
	const [shippingMethod, setShippingMethod] = useState(null);

	const [showError, setShowError] = useState(false);
	const [error_message, setError_message] = useState("");

	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const { login, auth_key } = useSelector(authSelector);
	const dispatch = useDispatch();
	const router = useRouter();
	useEffect(() => {
		if (login) {
			dispatch(cartList({ authKey: auth_key }));
			dispatch(shippingMethods({ authKey: auth_key }));
			dispatch(paymentMethods({ authKey: auth_key }));
			dispatch(
				getAddress({
					bodyParam:"type=delivery",
					authKey: auth_key,
				})
			);
		} else {
			// router.push("/sign-in")
		}
	}, [auth_key, dispatch, login, router]);

	const {
		cart,
		cart_details,
		payment_methods,
		shipping_methods,
		isError,
		errorMessage,
		isFetching,
		isCheckoutFetching,
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
					shipping_address_id: selectShippingAddress,
				},
			};
		} else {
			checkout_data = {
				order: {
					payment_method_id: paymentMethod.id,
					shipping_method_id: shippingMethod.id,
				},
			};
		}
		if (paymentMethod.type !== "stripe") {
			dispatch(
				checkout({
					authKey: auth_key,
					checkoutData: checkout_data,
				})
			).then((res) => {
				if (!res.payload.code) {
					setShowSuccessMessage(true);
				}
			});
		} else {
			dispatch(
				actions.clickCheckout(
					data,
					() => history.push(`/card`),
					"stripe"
				)
			);
		}
	};

	const closePopUP = () => {
		dispatch(clearCartState());
		setShowError(false);
		setError_message("");
	};

	return (
		<>
			{(showError || isError) && (
				<OutsideClickHandler
					onOutsideClick={() => {
						(showError || isError) &&
							(setShowError(false),
							setError_message(""),
							dispatch(clearCartState()));
					}}
				>
					<div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
						<div className="w-ful  xs:w-[500px] mx-auto">
							<PopUp
								message={
									error_message ||
									errorMessage
								}
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
							router.push("/");
						}}
					>
						<OrderSuccess />
					</OutsideClickHandler>
				</Modal>
			)}
			{/* <Modal>
				<OutsideClickHandler
					onOutsideClick={() => {
						setShowSuccessMessage(false);
					}}
				>
					<AddressForm />
				</OutsideClickHandler>
			</Modal> */}

			<div className=" mt-7 mx-auto w-full    sm:px-8 md:px-0 flex  flex-col justify-center c-md:flex-row c-md:justify-between    c-md:max-w-[824px]  lg:max-w-[1000px]  ">
				<div className="   c-md:w-[400px] lg:w-[600px] ">
					<div className="bg-[#FEFEFE] rounded-lg py-12 px-9">
						<CartItemBox
							cart_details={cart_details}
						/>
					</div>
					<div className="mt-6">
						<ShippingMethod
							shipping_methods={
								shipping_methods
							}
							shippingMethod={shippingMethod}
							setShippingMethod={
								setShippingMethod
							}
						/>
					</div>
					{shippingMethod?.type === "delivery" && (
						<div className="mt-6  w-full min-h-[100px] bg-[#FEFEFE] rounded-lg p-[31px]">
							<div>
								<button className=" bg-primary rounded-lg px-4 py-2 text-white text-base font-semibold">
									Add New Address
								</button>
							</div>
						</div>
					)}
					<div className="mt-6">
						<PaymentMethod
							payment_methods={
								payment_methods
							}
							paymentMethod={paymentMethod}
							setPaymentMethod={
								setPaymentMethod
							}
						/>
					</div>
				</div>
				<div className=" mt-6 c-md:mt-0 c-md:w-[400px] lg:w-[380px]">
					<OrderSummary
						cart={cart}
						cart_details={cart_details}
					/>
					{cart && (
						<div className="flex justify-center  mt-6">
							<button
								className=" w-5/6 bg-primary  rounded-full py-[12px] text-center text-base font-medium text-white flex justify-center items-center"
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
								<span>Checkout</span>
								<span className="ml-3">
									{
										cart
											?.grand_total
											.formatted
									}
								</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CheckoutPageLayout;
