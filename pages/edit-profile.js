import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../store/feature/authSlice';
import { myStore } from '../store/feature/storeSlice';
import { setGeneralConfig } from '../store/feature/configsSlice';
import { edit_profile_page } from '../tradly.config';
import { check_login } from '../constant/check_auth';
import { useRouter } from 'next/router';

const EditProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    if (localStorage.getItem('auth_key')) {
      dispatch(
        myStore({
          prams: {
            page: 1,
            type: 'accounts',
            user_id: userDetails.id,
          },
          authKey: localStorage.getItem('auth_key'),
        })
      );
    }
  }, [localStorage.getItem('auth_key')]);

  return check_login(router) && edit_profile_page();
};

export default EditProfile;
