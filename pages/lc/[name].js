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

const CategoryListings = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(clearCategoryListings());
  }, [dispatch]);

  const pageTitle = TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION;
  const pageDescription = TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION;
  return category_listings_page(pageTitle, pageDescription);
};

export default CategoryListings;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'seo',
  });
  return {
    props: { seo_text: response?.data?.configs },
  };
}
