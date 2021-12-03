import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import EditStorePageLayout from '../../components/layouts/PageLayouts/EditStorePageLayout';
import { refreshPage } from '../../store/feature/authSlice';
import { setAccountConfig } from '../../store/feature/configsSlice';
import tradly from 'tradly';

const EditStore = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
      dispatch(setAccountConfig(props));
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

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'accounts',
  });
  return {
    props: { accounts_configs: response?.data?.configs||[] },
  };
}