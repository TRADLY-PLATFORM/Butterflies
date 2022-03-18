import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import { setAccountConfig } from '../../store/feature/configsSlice';
import { clearAccountDetails } from '../../store/feature/storeSlice';
import { useRouter } from 'next/dist/client/router';
import { edit_store_page } from '../../tradly.config';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
import { check_login } from '../../constant/check_auth';

const EditAccount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    dispatch(clearAccountDetails());

    dispatch(
      setAccountConfig({ accounts_configs: TYPE_CONSTANT.ACCOUNTS_CONFIGS })
    );
  }, [dispatch]);

  const router = useRouter();

  return check_login(router) && edit_store_page();
};

export default EditAccount;
