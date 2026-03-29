import { safeJSONParse } from '../components/Shared/Constant/Constant';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { refreshPage } from '../store/feature/authSlice';
import { setGeneralConfig } from '../store/feature/configsSlice';
import { setHomeData } from '../store/feature/homeSlice';
import { home_page } from '../tradly.config';
import type { GetServerSideProps } from 'next';
import type { HomePageProps } from '../types';

const Index = ({ initialHomeData, initialBanners }: HomePageProps) => {
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
  const BASE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const [homeRes, bannersRes] = await Promise.all([
      fetch(`${BASE}/api/home`),
      fetch(`${BASE}/api/banners`),
    ]);
    const homeData = homeRes.ok ? await homeRes.json() : null;
    const bannersData = bannersRes.ok ? await bannersRes.json() : null;
    return { props: { initialHomeData: homeData ?? null, initialBanners: bannersData ?? null } };
  } catch {
    return { props: { initialHomeData: null, initialBanners: null } };
  }
};

export default Index;
