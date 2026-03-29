import { safeJSONParse } from '../../components/Shared/Constant/Constant';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { refreshPage } from '../../store/feature/authSlice';
import { clearCategoryListings } from '../../store/feature/categorySlice';
import { category_listings_page } from '../../tradly.config';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import type { GetServerSideProps } from 'next';
import type { CategoryListingsProps } from '../../types';

const CategoryListings = ({ initialListings, initialCategories, initialTotalRecords }: CategoryListingsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }
    dispatch(clearCategoryListings());
    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));
    dispatch(setGeneralConfig({ general_configs }));
  }, [dispatch]);

  return category_listings_page();
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const name = params?.name as string;
  const BASE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${BASE}/api/lc/${name}`);
    const data = res.ok ? await res.json() : null;
    return {
      props: {
        initialListings: data?.listings ?? null,
        initialCategories: data?.categories ?? null,
        initialTotalRecords: data?.total_records ?? null,
      },
    };
  } catch {
    return { props: { initialListings: null, initialCategories: null, initialTotalRecords: null } };
  }
};

export default CategoryListings;
