import React, { useState } from 'react';
import EmailForm from './EmailForm';
import PhoneForm from './PhoneForm';
import { uuid } from "uuidv4";
import tradly from "tradly"
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/feature/authSlice';

 

const SignInForm = () => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const dispatch=useDispatch()
	
	const clickSignIn = () => {
		const uUid = uuid();
		const users = {
			user: {
				uuid: uUid,
				email: email,
				password: password,
				type: "customer",
			},
		};
		
		 dispatch(signIn({prams:users,key:"abncg"}));
	}


    return (
		<div className="w-full   min-h-screen  py-36">
			<h2 className=" px-[34px]  md:px-24  text-center text-white text-[30px] md:text-[40px] font-semibold mb-4">
				Welcome to Tradly Event
			</h2>
			<p className=" px-[34px]  md:px-24  text-center text-white text-xl  font-semibold ">
				Login to your account
			</p>
			<div className=" mt-24 px-[34px]  ">
				<div>
					<EmailForm
						setEmail={setEmail}
						setPassword={setPassword}
					/>
				</div>
				<div className=" mt-12 flex flex-col justify-center items-center">
					<button
						className=" mb-8  w-full  xs:w-72 h-12 flex justify-center items-center bg-white rounded-[48px] text-primary font-semibold  text-base"
						onClick={clickSignIn}
					>
						Log in
					</button>
					<button className=" w-full md:w-96 h-6 flex justify-center items-center bg-transparent   text-white  font-medium  text-xl">
						Forgot your password?
					</button>
				</div>
				<div className=" mt-32 flex justify-center items-center">
					<button className=" w-full md:w-96 h-6 flex justify-center items-center bg-transparent   text-white  font-medium text-base  xs:text-xl">
						Don’t have an account,
						<span className="font-semibold">
							Sign up{" "}
						</span>
					</button>
				</div>
			</div>
		</div>
    );           
};

export default SignInForm;