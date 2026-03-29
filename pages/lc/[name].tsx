import { safeJSONParse } from '../../components/Shared/Constant/Constant';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { refreshPage } from '../../store/feature/authSlice';
import { clearCategoryListings, setCategoryListings } from '../../store/feature/categorySlice';
import { category_listings_page } from '../../tradly.config';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { wrapper } from '../../store/store';

const CategoryListings = () => {
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const { getCategoryListings, getAppConfigs } = await import('../../lib/serverData');
  const name = params?.name as string;
  const [data, appConfigs] = await Promise.all([getCategoryListings({ category_id: name }), getAppConfigs()]);
  if (data) {
    store.dispatch(setCategoryListings({ listings: data.listings, total_records: data.total_records }));
  }
  return { props: { appConfigs } };
});

export default CategoryListings;
