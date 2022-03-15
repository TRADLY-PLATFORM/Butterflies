import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check_login } from '../../constant/check_auth';
import { refreshPage } from '../../store/feature/authSlice';
import { orders } from '../../tradly.config';

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

  return check_login(router) && orders();
};

export default Orders;
