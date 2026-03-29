import { safeJSONParse } from '../../components/Shared/Constant/Constant';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { refreshPage } from '../../store/feature/authSlice';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { setAccountDetail } from '../../store/feature/storeSlice';
import { accounts_details_page } from '../../tradly.config';
import { wrapper } from '../../store/store';

const StoreDetails = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));
    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }
    dispatch(setGeneralConfig({ general_configs }));
  }, [dispatch]);

  return accounts_details_page();
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const { getAccountDetail, getAppConfigs } = await import('../../lib/serverData');
  const id = params?.id as string;
  const [data, appConfigs] = await Promise.all([getAccountDetail(id), getAppConfigs()]);
  if (data?.account) {
    store.dispatch(setAccountDetail({ account: data.account, listings: data.listings }));
  }
  return { props: { appConfigs } };
});

export default StoreDetails;
