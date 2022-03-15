/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';

import { setGeneralConfig } from '../../store/feature/configsSlice';
import { all_accounts_page } from '../../tradly.config';

const Stores = () => {
  const [MARKETPLACE_FLAVOURS, setMARKETPLACE_FLAVOURS] = useState(null);

  const dispatch = useDispatch();
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
    setMARKETPLACE_FLAVOURS(
      Number(localStorage.getItem('MARKETPLACE_FLAVOURS'))
    );
  }, [dispatch]);

  return all_accounts_page();
};

export default Stores;
