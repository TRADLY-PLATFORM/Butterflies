import { safeJSONParse } from '../components/Shared/Constant/Constant';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { refreshPage } from '../store/feature/authSlice';
import { setGeneralConfig } from '../store/feature/configsSlice';
import { setHomeData } from '../store/feature/homeSlice';
import { home_page } from '../tradly.config';
import { wrapper } from '../store/store';

const Index = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));
    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }
    dispatch(setGeneralConfig({ general_configs }));
  }, [dispatch]);

  return home_page();
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const { getHomeData, getAppConfigs } = await import('../lib/serverData');
  const [homeData, appConfigs] = await Promise.all([getHomeData(), getAppConfigs()]);
  if (homeData) {
    store.dispatch(setHomeData(homeData));
  }
  return { props: { appConfigs } };
});

export default Index;
