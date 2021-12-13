/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SignUpPageLayout from '../components/layouts/PageLayouts/SignUpPageLayout';
import tradly from 'tradly';
import { setGeneralConfig } from '../store/feature/configsSlice';

const SignUp = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));
    if (props.general_configs !== null) {
      dispatch(setGeneralConfig(props));
    } else {
      dispatch(setGeneralConfig({ general_configs: general_configs }));
    }
  }, [dispatch]);

  return (
    <div>
      <SignUpPageLayout />
    </div>
  );
};

export default SignUp;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'general',
  });
  return {
    props: { general_configs: response?.data?.configs || null },
  };
}
