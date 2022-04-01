import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../store/feature/authSlice';
import { payout_page } from '../tradly.config';
import { myStore } from '../store/feature/storeSlice';
import { check_login } from '../constant/check_auth';
import { useRouter } from 'next/router';
import { check_flavours } from '../constant/check_flavours';
import Error from 'next/error';

const Payout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }
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
  return check_flavours(2) ? (
    <Error statusCode={404} />
  ) : (
    check_login(router) && payout_page()
  );
};

export default Payout;
