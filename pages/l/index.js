/* eslint-disable react/prop-types */
import   { useEffect } from 'react';
import { useDispatch } from 'react-redux';
  import { refreshPage } from '../../store/feature/authSlice';
 import { clearListings } from '../../store/feature/listingSlice';
import { all_listings_page } from '../../tradly.config';
import { setGeneralConfig } from '../../store/feature/configsSlice';
 
const AllListings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearListings());
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

  return all_listings_page();
};

export default AllListings;
