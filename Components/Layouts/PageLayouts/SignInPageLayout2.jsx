import React from 'react';
import OnBoardingImage from '../../Components/OnBoardingImage/OnBoardingImage';
import SignInForm from '../../Components/SigninForm/SignInForm';

const SignInPageLayout2 = () => {
    return (
        <div className="bg-green-500   min-h-screen">
            <OnBoardingImage/>
			<SignInForm />
		</div>
    );
};

export default SignInPageLayout2;