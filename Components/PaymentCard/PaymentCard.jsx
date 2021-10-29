import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

 
const useOptions = () => {
 	const options = useMemo(
		() => ({
			style: {
				base: {
 					color: "#424770",
					letterSpacing: "0.025em",
					fontFamily: "Source Code Pro, monospace",
					"::placeholder": {
						color: "#aab7c4",
					},
				},
				invalid: {
					color: "#9e2146",
				},
			},
		}),
		[ ]
	);

	return options;
};

const PaymentCard = () => {
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		const payload = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});

		console.log("[PaymentMethod]", payload);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Card details
				<CardElement
					options={options}
					onReady={() => {
						console.log("CardElement [ready]");
					}}
					onChange={(event) => {
						console.log(
							"CardElement [change]",
							event
						);
					}}
					onBlur={() => {
						console.log("CardElement [blur]");
					}}
					onFocus={() => {
						console.log("CardElement [focus]");
					}}
				/>
			</label>
			<button type="submit" disabled={!stripe}>
				Pay
			</button>
		</form>
	);
};

export default PaymentCard;
