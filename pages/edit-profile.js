import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import ProfilePageLayout from '../components/layouts/PageLayouts/ProfilePageLayout';
import { authSelector, refreshPage } from '../store/feature/authSlice';
import { myStore } from '../store/feature/storeSlice';
import tradly from 'tradly';
import { setGeneralConfig } from '../store/feature/configsSlice';
import EditProfilePageLayout from '../components/layouts/PageLayouts/EditProfilePageLayout';

const EditProfile = (props) => {
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    if (localStorage.getItem('auth_key')) {
      dispatch(
        myStore({
          prams: {
            page: 1,
            type: 'accounts',
            user_id: userDetails.id,
          },
          authKey: localStorage.getItem('auth_key'),
        })
      );
      dispatch(setGeneralConfig(props));
    }
  }, [localStorage.getItem('auth_key')]);

  
  return (
    <MainLayout>
      <EditProfilePageLayout />
    </MainLayout>
  );
};

export default EditProfile;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'general',
  });
  return {
    props: { general_configs: response?.data?.configs || [] },
  };
}
