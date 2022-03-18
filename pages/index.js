/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../store/feature/authSlice';
import { setGeneralConfig } from '../store/feature/configsSlice';
import { home_page } from '../tradly.config';

const Index = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }

    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);

  return home_page();
};

export default Index;
