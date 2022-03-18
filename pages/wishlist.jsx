/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../store/feature/authSlice';
import { wishlist_page } from '../tradly.config';
import { clearWishState } from '../store/feature/wishSlice';
import { check_login } from '../constant/check_auth';

const WishList = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearWishState());
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }
  }, [dispatch]);

  return check_login(router) && wishlist_page();
};

export default WishList;
