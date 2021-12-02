import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tradly from 'tradly';
import ForgotPasswordPageLayout from '../../components/layouts/PageLayouts/ForgotPasswordPageLayout';
import SetPasswordPageLayout from '../../components/layouts/PageLayouts/SetPasswordPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGeneralConfig(props));
  }, [dispatch]);

  return (
    <div>
      <SetPasswordPageLayout/>
     </div>
  );
};

export default ForgotPassword;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'general',
  });
  return {
    props: { general_configs: response?.data?.configs||[] },
  };
}
