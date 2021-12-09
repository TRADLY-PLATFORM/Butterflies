import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import { setListingConfig } from '../../store/feature/storeSlice';
import tradly from 'tradly';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import EditProductPageLayout from '../../components/layouts/PageLayouts/EditProductPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';


const EditProduct = (props) => {
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
            <EditProductPageLayout/>
         </MainLayout>
    );
};

export default EditProduct;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'listings',
  });
   const response2 = await tradly.app.getConfigList({
     paramBody: 'general',
   });
  return {
    props: {
      listing_configs: response?.data?.configs || [],
      general_configs: response2?.data?.configs || [],
    },
  };
}