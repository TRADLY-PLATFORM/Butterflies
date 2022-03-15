/* eslint-disable react/prop-types */
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignInPageLayout from '../themes/common_layouts/SignInPageLayout';
import { authSelector } from '../store/feature/authSlice';
import { useDispatch } from 'react-redux';
import { setGeneralConfig } from '../store/feature/configsSlice';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = useSelector(authSelector);
  useEffect(() => {
    if (login) {
      if (router.query.to) {
        router.push(router.query.to);
      } else {
        router.push('/');
      }
    } else {
      const general_configs = JSON.parse(
        localStorage.getItem('general_configs')
      );

      dispatch(setGeneralConfig({ general_configs: general_configs }));
    }
  }, [login, router]);
  return (
    <div>
      <SignInPageLayout />
    </div>
  );
};

export default SignIn;
