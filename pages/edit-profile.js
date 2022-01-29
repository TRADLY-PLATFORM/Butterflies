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
import { edit_profile_page } from '../themes/Theme1';
import axios from 'axios';

const EditProfile = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(setGeneralConfig({ general_configs: general_configs }));
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
    }
  }, [localStorage.getItem('auth_key')]);

  return edit_profile_page();
};

export default EditProfile;

 