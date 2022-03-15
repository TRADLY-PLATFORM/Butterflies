import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import { setListingConfig } from '../../store/feature/storeSlice';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';
import { edit_listing_page } from '../../tradly.config';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
import { check_login } from '../../constant/check_auth';

const EditListing = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    dispatch(setGeneralConfig({ general_configs: general_configs }));

    dispatch(
      setListingConfig({ listing_configs: TYPE_CONSTANT.LISTINGS_CONFIGS })
    );
  }, [dispatch]);

  return check_login(router) && edit_listing_page();
};

export default EditListing;
