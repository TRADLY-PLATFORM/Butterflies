/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import { clearSearch } from '../../store/feature/search';
import { search_page } from '../../tradly.config';
import { setGeneralConfig } from '../../store/feature/configsSlice';

const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSearch());
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    const general_configs = JSON.parse(localStorage.getItem('general_configs'));
    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);

  return search_page();
};

export default Search;
