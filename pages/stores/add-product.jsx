/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import AddProductPageLayout from '../../components/layouts/PageLayouts/AddProductPageLayout';
import { refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { setListingConfig } from '../../store/feature/storeSlice';
import AddEventPageLayout from '../../components/layouts/PageLayouts/AddEventPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';


const AddProduct = (props) => {
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(
          refreshPage({
            key: localStorage.getItem('refresh_key'),
          })
        );
        dispatch(setListingConfig(props));
         dispatch(setGeneralConfig(props));
      }, [dispatch]);
    
  
    return (
        <MainLayout>
        {/* <AddProductPageLayout/> */}
        <AddEventPageLayout/>
        </MainLayout>
    );
};

export default AddProduct;


export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'listings',
  });
   const response2 = await tradly.app.getConfigList({
     paramBody: 'general',
   });
  return {
    props: {
      listing_configs: response?.data?.configs ||[],
      general_configs: response2?.data?.configs || [],
    },
  };
}