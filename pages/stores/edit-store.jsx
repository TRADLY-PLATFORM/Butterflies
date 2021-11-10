import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import EditStorePageLayout from '../../components/layouts/PageLayouts/EditStorePageLayout';
import { refreshPage } from '../../store/feature/authSlice';

const EditStore = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }, [dispatch]);

    return (
        <div>
            <MainLayout>
                <EditStorePageLayout/>
            </MainLayout>
        </div>
    );
};

export default EditStore;