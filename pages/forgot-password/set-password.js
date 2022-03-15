import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
  import SetPasswordPageLayout from '../../themes/common_layouts/SetPasswordPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';

const ForgotPassword = ( ) => {
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

 