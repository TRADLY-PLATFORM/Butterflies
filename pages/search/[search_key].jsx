/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import { refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { clearSearch } from '../../store/feature/search';
import SearchPageLayout from '../../components/layouts/PageLayouts/SearchPageLayout';
import { search_page } from '../../themes/Theme1';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
import { setGeneralConfig } from '../../store/feature/configsSlice';

const Search = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSearch());
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );

    const general_configs = JSON.parse(localStorage.getItem('general_configs'));
    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);
  const pageTitle = TYPE_CONSTANT.META_TITLE;
  const pageDescription = TYPE_CONSTANT.META_DESCRIPTIONS;
  return search_page(pageTitle, pageDescription);
};

export default Search;
