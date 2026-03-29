import { safeJSONParse } from '../../components/Shared/Constant/Constant';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { refreshPage } from '../../store/feature/authSlice';
import { clearSearch } from '../../store/feature/search';
import { search_page } from '../../tradly.config';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import type { GetServerSideProps } from 'next';
import type { SearchPageProps } from '../../types';

const Search = ({ initialListings, initialTotalRecords, searchKey }: SearchPageProps) => {
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const search_key = params?.search_key as string;
  const BASE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${BASE}/api/search?search_key=${encodeURIComponent(search_key)}`);
    const data = res.ok ? await res.json() : null;
    return {
      props: {
        initialListings: data?.listings ?? null,
        initialTotalRecords: data?.total_records ?? null,
        searchKey: search_key,
      },
    };
  } catch {
    return { props: { initialListings: null, initialTotalRecords: null, searchKey: search_key } };
  }
};

export default Search;
