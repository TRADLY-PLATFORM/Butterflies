import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tradly from 'tradly';
import ForgotPasswordPageLayout from '../../components/layouts/PageLayouts/ForgotPasswordPageLayout';
import SetPasswordPageLayout from '../../components/layouts/PageLayouts/SetPasswordPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);

  return (
    <div>
      <SetPasswordPageLayout/>
     </div>
  );
};

export default ForgotPassword;

 