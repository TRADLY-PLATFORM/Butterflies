import React from 'react';
import { useSelector } from 'react-redux';
import { configsSelector } from '../../store/feature/configsSlice';
import OnBoardingImage from '../../components/OnBoardingImage/OnBoardingImage';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

const SignUpPageLayout = () => {
  const { general_configs } = useSelector(configsSelector);

  return (
    <div className=" grid  c-md:grid-cols-2 c-md:justify-center c-md:items-center ">
      <div className=" hidden w-full min-h-screen  c-md:flex items-center">
        <OnBoardingImage />
      </div>
      <div className="w-full min-h-screen bg-primary">
        <SignUpForm general_configs={general_configs} />
      </div>
    </div>
  );
};

export default SignUpPageLayout;
