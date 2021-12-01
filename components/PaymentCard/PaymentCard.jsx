import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";
import BillingDetailsForm from "./BillingDetailsForm";
import OutsideClickHandler from "react-outside-click-handler";
import PopUp from "../Shared/PopUp/PopUp";
import { useSelector } from "react-redux";
import { cartSelector } from "../../store/feature/cartSlice";
import Modal from "../Shared/Modal.jsx/Modal";
import OrderSuccess from "../Cart/OrderSuccess/OrderSuccess";
import { useRouter } from "next/dist/client/router";
 

//  import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
// import SubmitButton from "./prebuilt/SubmitButton";
// import CheckoutError from "./prebuilt/CheckoutError";

const CardElementContainer = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	border: 1px solid;
	border-radius: 0.375rem;
	--tw-border-opacity: 1;
	border-color: rgba(212, 212, 212, var(--tw-border-opacity));
	--tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
		var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

	& .StripeElement {
		width: 100%;
		padding: 10px;
	}
`;

const PaymentCard = () => {
	const [isProcessing, setProcessingTo] = useState(false);
	const [checkoutError, setCheckoutError] = useState();

	const [showError, setShowError] = useState(false);
	const [error_message, setError_message] = useState("");

	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const router = useRouter();

	const [email, setEmail] = useState(null);
	const [name, setName] = useState(null);
	const [address, setAddress] = useState(null);
	const [city, setCity] = useState(null);
	const [zip, setZip] = useState(null);
	const [state, setState] = useState(null);

	const stripe = useStripe();
	const elements = useElements();
 
	const{client_secret}=useSelector(cartSelector)
 

	const handleCardDetailsChange = (ev) => {
		ev.error
			? setCheckoutError(ev.error.message)
			: setCheckoutError();
	};

	const handleFormSubmit = async (ev) => {
		ev.preventDefault();
		if (!client_secret) {
			setShowError(true);
			setError_message("No product in cart list .");
			return false;
		}
			if (name === null) {
				setShowError(true);
				setError_message("Enter  your Name");
				return false;
			}
		if (email === null) {
			setShowError(true);
			setError_message("Enter  your email");
			return false;
		}
		if (address === null) {
			setShowError(true);
			setError_message("Enter  your Address");
			return false;
		}
		if (city === null) {
			setShowError(true);
			setError_message("Enter  your city name");
			return false;
		}
		if (state === null) {
			setShowError(true);
			setError_message("Enter  your State");
			return false;
		}
		if (zip === null) {
			setShowError(true);
			setError_message("Enter  your ZIP code");
			return false;
		}

		const billingDetails = {
			name: name,
			email: email,
			address: {
				city: city,
				line1: address,
				state: state,
				postal_code: zip,
			},
		};

		setProcessingTo(true);

		const cardElement = elements.getElement("card");

		try {
			const paymentMethodReq = await stripe.createPaymentMethod({
				type: "card",
				card: cardElement,
				billing_details: billingDetails,
			});

			if (paymentMethodReq.error) {
				setShowError(true);
				setError_message(paymentMethodReq.error.message);
				setProcessingTo(false);
				return false;
			}

			const { error } = await stripe.confirmCardPayment(
				client_secret,
				{
					payment_method:
						paymentMethodReq.paymentMethod.id,
				}
			);

			if (error) {
				setShowError(true);
				setError_message(error.message);
				setProcessingTo(false);
				return false;
			}

			setShowSuccessMessage(true);
			setProcessingTo(false);
		} catch (err) {
			setShowError(true);
			setError_message(err.message);
		}
	};

	const closePopUP = () => {
 		setShowError(false);
		setError_message("");
	};

	const iframeStyles = {
		base: {
			color: "black",
			fontSize: "16px",
			iconColor: "primary",
			width: "100%",
			border: "1px",
			borderRadius: "0.375rem",
			twBorderOpacity: 1,
			borderColor:
				"rgba(212, 212, 212, var(--tw-border-opacity))",

			"::placeholder": {
				color: "gray",
			},
		},
		invalid: {
			iconColor: "red",
			color: "red",
		},
		complete: {
			iconColor: "#15B790",
		},
	};

	const cardElementOpts = {
		iconStyle: "solid",
		style: iframeStyles,
		hidePostalCode: true,
	};


	return (
		<>
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
			<div className="h-full    flex  justify-center  ">
				{showError && (
					<OutsideClickHandler
						onOutsideClick={() => {
							(showError || isError) &&
								(setShowError(false),
								setError_message(""));
						}}
					>
						<div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
							<div className="w-ful  xs:w-[500px] mx-auto">
								<PopUp
									message={
										error_message
									}
									closePopUP={
										closePopUP
									}
								/>
							</div>
						</div>
					</OutsideClickHandler>
				)}
				<div className="  w-full  md:px-[30px] py-2   sm:w-[421px]">
					<form onSubmit={handleFormSubmit}>
						<div>
							<BillingDetailsForm
								setEmail={setEmail}
								setName={setName}
								setAddress={setAddress}
								setCity={setCity}
								setZip={setZip}
								setState={setState}
							/>
						</div>
						<div>
							<label>
								<span className="text-gray-700 mb-2">
									Card
								</span>
								<CardElementContainer>
									<CardElement
										id="card"
										options={
											cardElementOpts
										}
										onChange={
											handleCardDetailsChange
										}
									/>
								</CardElementContainer>
							</label>
						</div>

						<div className="flex justify-center mt-6">
							<button
								type="submit"
								className=" w-5/6 bg-primary rounded-md text-center py-3  text-white text-base font-semibold flex justify-center items-center "
							>
								{isProcessing && (
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
								<span>Pay</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default PaymentCard;
