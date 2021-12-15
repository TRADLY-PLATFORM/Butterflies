/* eslint-disable react/prop-types */
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignInPageLayout from '../components/layouts/PageLayouts/SignInPageLayout';
import { authSelector } from '../store/feature/authSlice';
import tradly from 'tradly';
import { useDispatch } from 'react-redux';
import { setGeneralConfig } from '../store/feature/configsSlice';

const SignIn = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = useSelector(authSelector);
  useEffect(() => {
    if (login) {
      router.push('/');
    } else {
      const general_configs = JSON.parse(
        localStorage.getItem('general_configs')
      );
      if (props.general_configs !== null) {
        dispatch(setGeneralConfig(props));
      } else {
        dispatch(setGeneralConfig({ general_configs: general_configs }));
      }
    }
  }, [login, router]);
  return (
    <div>
      <SignInPageLayout />
    </div>
  );
};

export default SignIn;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'general',
  });
  return {
    props: { general_configs: response?.data?.configs || null },
  };
}
