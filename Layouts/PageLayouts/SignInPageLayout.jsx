import React from 'react';
import OnBoardingImage from '../../Components/OnBoardingImage/OnBoardingImage';
import SignInForm from '../../Components/SigninForm/SignInForm';

const SignInPageLayout = () => {
    return (
		<div className=" grid grid-cols-2 justify-center items-center ">
			<div className="w-full min-h-screen">
				<OnBoardingImage />
			</div>
			<div className="w-full min-h-screen bg-green-500">
				<SignInForm />
			</div>
		</div>
    );
};

export default SignInPageLayout;