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
  const { getCategoryListings } = await import('../../lib/serverData');
  const name = params?.name as string;
  const data = await getCategoryListings({ category_id: name });
  return {
    props: {
      initialListings: data?.listings ?? null,
      initialTotalRecords: data?.total_records ?? null,
      initialCategories: null,
    },
  };
};

export default CategoryListings;
