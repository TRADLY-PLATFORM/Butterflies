/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import MyStorePageLayout from '../../components/layouts/PageLayouts/MyStorePageLayout';
import { refreshPage } from '../../store/feature/authSlice';

const MyStore = () => {
    const dispatch = useDispatch()
    useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
    }, [dispatch]);

  
    return (
        <MainLayout>
            <MyStorePageLayout/>
         </MainLayout>
    );
};

export default MyStore;
