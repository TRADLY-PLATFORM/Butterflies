import React, { useEffect } from "react";
import PaymentCard from "../Components/PaymentCard/PaymentCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MagazineLayout from "../Components/Layouts/MainLayouts/MagazineLayout";
import MainLayout from "../Components/Layouts/MainLayouts/MainLayout";
import PaymentPageLayout from "../Components/Layouts/PageLayouts/PaymentPageLayout";
import { useDispatch } from "react-redux";
import { refreshPage } from "../store/feature/authSlice";
import { useRouter } from "next/dist/client/router";
import { useBeforeUnload } from "react-use";
import { useToggle } from "react-use";

const Payment = () => {
	const router=useRouter()
useEffect(() => {
	window.addEventListener("beforeunload", alertUser);
	return () => {
		window.removeEventListener("beforeunload", alertUser);
	};
}, []);
const alertUser = (e) => {
	e.preventDefault();
	e.returnValue = "";
};


	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
	}, [dispatch]);

	const stripePromise = loadStripe(
		" pk_test_51HPL2tIRWtZLg0gEHG08IMqnNrLeZDRd8M9fSnqQ5Sqj3NIfghpC6pMthvLb6ccwg7h8SECQUDqxlCYU35lxHexJ00qhCHpODu"
	);
	return (
		<Elements stripe={stripePromise}>
			 
			<PaymentPageLayout />
		</Elements>
	);
};

export default Payment;
