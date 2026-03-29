import { safeJSONParse } from '../components/Shared/Constant/Constant';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { refreshPage } from '../store/feature/authSlice';
import { setGeneralConfig } from '../store/feature/configsSlice';
import { setHomeData } from '../store/feature/homeSlice';
import { home_page } from '../tradly.config';
import { getHomeData } from '../lib/serverData';
import type { GetServerSideProps } from 'next';
import type { HomePageProps } from '../types';

const Index = ({ initialHomeData }: HomePageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));
    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }
    dispatch(setGeneralConfig({ general_configs }));
    if (initialHomeData) {
      dispatch(setHomeData(initialHomeData));
    }
  }, [dispatch, initialHomeData]);

  return home_page();
};

export const getServerSideProps: GetServerSideProps = async () => {
  const homeData = await getHomeData();
  return { props: { initialHomeData: homeData ?? null } };
};

export default Index;
