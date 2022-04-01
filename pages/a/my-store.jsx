/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/dist/client/router';
import Error from 'next/error';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { check_login } from '../../constant/check_auth';
import { check_flavours } from '../../constant/check_flavours';
import { refreshPage } from '../../store/feature/authSlice';
import { my_store_page } from '../../tradly.config';

const MyStore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      if (localStorage.getItem('refresh_key')) {
        dispatch(
          refreshPage({
            key: localStorage.getItem('refresh_key'),
          })
        );
      }
    }
  }, [dispatch]);

  const router = useRouter();

  return check_flavours(2) ? (
    <Error statusCode={404} />
  ) : (
    check_login(router) && my_store_page()
  );
};

export default MyStore;
