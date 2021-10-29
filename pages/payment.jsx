import React from "react";
import PaymentCard from "../Components/PaymentCard/PaymentCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const payment = () => {
	const stripePromise = loadStripe(
		 "pk_live_51HPL2tIRWtZLg0gEweEutqoNl644fPiGpnu0oKo5Vd3xHI3PT7MAJ3fkOKzWI8nh3IEhyTveQItawczNH22zK9OH00rcfT0fBU"
	);
	return (
		<Elements stripe={stripePromise}>
			<PaymentCard />
		</Elements>
	);
};

export default payment;
