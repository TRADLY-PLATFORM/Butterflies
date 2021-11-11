import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import { setListingConfig } from '../../store/feature/storeSlice';
import tradly from 'tradly';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import EditProductPageLayout from '../../components/layouts/PageLayouts/EditProductPageLayout';


const EditProduct = (props) => {
     const dispatch = useDispatch();
     useEffect(() => {
       dispatch(
         refreshPage({
           key: localStorage.getItem('refresh_key'),
         })
       );
       dispatch(setListingConfig(props));
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
  return {
    props: { listing_configs: response?.data?.configs },
  };
}