import React from "react";
import OnBoardingImage from "../../OnBoardingImage/OnBoardingImage";
import VerificationForm from "../../Verification/VerificationForm";

const VerificationPageLayout = () => {
	return (
		<div className=" grid  c-md:grid-cols-2 c-md:justify-center c-md:items-center ">
			<div className=" hidden w-full min-h-screen  c-md:flex items-center">
				<OnBoardingImage />
			</div>
			<div className="w-full min-h-screen bg-primary">
				<VerificationForm />
			</div>
		</div>
	);
};

export default VerificationPageLayout;
