import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SignUpPageLayout from '../components/layouts/PageLayouts/SignUpPageLayout';
 import tradly from 'tradly';
import { setGeneralConfig } from '../store/feature/configsSlice';

const SignUp = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGeneralConfig(props));
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
    props: { general_configs: response?.data?.configs||[] },
  };
}
