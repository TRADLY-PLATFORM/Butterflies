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

const Search = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSearch());
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
  }, [dispatch]);
  const pageTitle = TYPE_CONSTANT.META_TITLE;
  const pageDescription = TYPE_CONSTANT.META_DESCRIPTIONS;
  return search_page(pageTitle, pageDescription);
};

export default Search;
