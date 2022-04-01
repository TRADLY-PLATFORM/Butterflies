import { useRouter } from 'next/dist/client/router';
import Error from 'next/error';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check_login } from '../../../constant/check_auth';
import { check_flavours } from '../../../constant/check_flavours';
import { refreshPage } from '../../../store/feature/authSlice';
import { account_orders } from '../../../tradly.config';

const Orders = () => {
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

  const router = useRouter();

  return check_flavours(2) ? (
    <Error statusCode={404} />
  ) : (
    check_login(router) && account_orders()
  );
};

export default Orders;
