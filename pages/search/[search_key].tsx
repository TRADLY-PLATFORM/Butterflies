import { safeJSONParse } from '../../components/Shared/Constant/Constant';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { refreshPage } from '../../store/feature/authSlice';
import { clearSearch, setSearchData } from '../../store/feature/search';
import { search_page } from '../../tradly.config';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { wrapper } from '../../store/store';

const Search = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearSearch());
    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }
    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));
    dispatch(setGeneralConfig({ general_configs }));
  }, [dispatch]);

  return search_page();
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const { getSearchListings, getAppConfigs } = await import('../../lib/serverData');
  const search_key = params?.search_key as string;
  const [data, appConfigs] = await Promise.all([getSearchListings({ search_key }), getAppConfigs()]);
  if (data) {
    store.dispatch(setSearchData({ listings: data.listings, total_records: data.total_records }));
  }
  return { props: { appConfigs } };
});

export default Search;
