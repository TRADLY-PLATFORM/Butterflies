import   { useEffect } from 'react';
import { useDispatch   } from 'react-redux';
 import {    refreshPage } from '../../store/feature/authSlice';
 import { setAccountConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';
import { create_store_page } from '../../tradly.config';
 import { TYPE_CONSTANT } from '../../constant/Web_constant';

import { check_login } from '../../constant/check_auth';
import { check_flavours } from '../../constant/check_flavours';
import Error from 'next/error';

const CreateAccount = ( ) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    dispatch(
      setAccountConfig({ accounts_configs: TYPE_CONSTANT.ACCOUNTS_CONFIGS })
    );
  }, [dispatch]);

  const router = useRouter();

  return check_flavours(2) ? (
    <Error statusCode={404} />
  ) : (
    check_login(router) && create_store_page()
  );
};

export default CreateAccount;
