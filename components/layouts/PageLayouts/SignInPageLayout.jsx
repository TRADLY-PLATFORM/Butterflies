 import React  from "react";
  import { useDispatch } from "react-redux";
 import OnBoardingImage from "../../OnBoardingImage/OnBoardingImage"
import SignInForm from "../../SigninForm/SignInForm";
 
 
const SignInPageLayout = () => {
       return (
		<div className=" grid  c-md:grid-cols-2 c-md:justify-center c-md:items-center ">
			<div className=" hidden w-full min-h-screen  c-md:flex items-center">
				<OnBoardingImage />
			</div>
			<div className="w-full min-h-screen bg-primary">
				<SignInForm />
			</div>
		</div>
      );
};

export default SignInPageLayout;