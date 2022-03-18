/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SignUpPageLayout from '../themes/common_layouts/SignUpPageLayout';
import tradly from 'tradly';
import { setGeneralConfig } from '../store/feature/configsSlice';
import axios from 'axios';

const SignUp = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);

  return (
    <div>
      <SignUpPageLayout />
    </div>
  );
};

export default SignUp;
