/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import { clearCategoryListings } from '../../store/feature/categorySlice';
import { category_listings_page } from '../../tradly.config';
import { setGeneralConfig } from '../../store/feature/configsSlice';

const CategoryListings = ( ) => {
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

  return category_listings_page();
};

export default CategoryListings;
