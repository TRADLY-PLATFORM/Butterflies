/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import { refreshPage } from '../../store/feature/authSlice';
import CategoryListingsPageLayout from '../../components/layouts/PageLayouts/CategoryListingsPageLayout';
import tradly from 'tradly';
import { clearCategoryListings } from '../../store/feature/categorySlice';
import { category_listings_page } from '../../themes/Theme1';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
import { setGeneralConfig } from '../../store/feature/configsSlice';

const CategoryListings = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    dispatch(clearCategoryListings());
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));
    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);

  const pageTitle = TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION;
  const pageDescription = TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION;
  return category_listings_page(pageTitle, pageDescription);
};

export default CategoryListings;