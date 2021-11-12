import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
	authSelector,
	clearState,
	signUp,
} from "../../store/feature/authSlice";
import EmailForm from "./EmailForm";
import OutsideClickHandler from "react-outside-click-handler";
import PopUp from "../Shared/PopUp/PopUp";
import * as EmailValidator from "email-validator";
import { uuid } from "uuidv4";
import { useRouter } from "next/dist/client/router";

const SignUpForm = () => {
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [reTypePassword, setReTypePassword] = useState(null);
	const [showError, setShowError] = useState(false);
	const [error_message, setError_message] = useState("");

	const dispatch = useDispatch();
	const router = useRouter();

	const { isFetching, isError, isSuccess, errorMessage } =
		useSelector(authSelector);

	const closePopUP = () => {
		dispatch(clearState());
		setShowError(false);
		setError_message("");
	};

	useEffect(() => {
		if (isSuccess) {
			router.push("/verification");
		}
	}, [isSuccess, router]);

	const createAccount = () => {
		if (firstName === null) {
			setShowError(true);
			setError_message("First Name is required");
			return false;
		}
		if (lastName === null) {
			setShowError(true);
			setError_message("Last Name is required");
			return false;
		}
		if (email === null) {
			setShowError(true);
			setError_message("Email is required");
			return false;
		}
		if (!EmailValidator.validate(email)) {
			setShowError(true);
			setError_message("Enter your valid email");
			return false;
		}

		if (password === null) {
			setShowError(true);
			setError_message("Password is required");
			return false;
		}

		if (reTypePassword === null) {
			setShowError(true);
			setError_message("Please re type your password");
			return false;
		}
		if (reTypePassword !== password) {
			setShowError(true);
			setError_message("Password not matching");
			return false;
		}

		const uUid = uuid();
		const users = {
			user: {
				uuid: uUid,
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
				type: "customer",
			},
		};
		dispatch(signUp({ prams: users }));
	};

	return (
		<div className="w-full   min-h-screen  py-36">
			{(showError || isError) && (
				<OutsideClickHandler
					onOutsideClick={() => {
						(showError || isError) &&
							(setShowError(false),
							setError_message(""),
							dispatch(clearState()));
					}}
				>
					<div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
						<div className="w-full  xs:w-[500px] mx-auto">
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

			<h2 className=" px-[34px]  md:px-24  text-center text-white text-[30px] md:text-[40px] font-semibold mb-4">
				Welcome to Tradly Event
			</h2>
			<p className=" px-[34px]  md:px-24  text-center text-white text-xl  font-semibold ">
				Create your account
			</p>
			<div className=" mt-24 px-[34px]  ">
				<div>
					<EmailForm
						setFirstName={setFirstName}
						setLastName={setLastName}
						setEmail={setEmail}
						setPassword={setPassword}
						setReTypePassword={setReTypePassword}
					/>
				</div>
				<div className=" mt-12 flex flex-col justify-center items-center">
					{isFetching ? (
						<button className=" mb-8  w-full  xs:w-72 h-12 flex justify-center items-center bg-white rounded-[48px] text-primary font-semibold  text-base ">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
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
							Create an Account
						</button>
					) : (
						<button
							className=" mb-8  w-full  xs:w-72 h-12 flex justify-center items-center bg-white rounded-[48px] text-primary font-semibold  text-base"
							onClick={createAccount}
						>
							Create an Account
						</button>
					)}
				</div>
				<div className=" mt-[68px] flex justify-center items-center">
					<Link href={"/sign-in"} passHref>
						<button className=" w-full md:w-96 h-6 flex justify-center items-center bg-transparent   text-white  font-medium text-base  xs:text-xl">
							Already have an account?
							<span className="font-semibold ml-2" >
								Login
							</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
