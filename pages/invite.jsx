import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../store/feature/authSlice';
import { Invite_page } from '../tradly.config';
import { setGeneralConfig } from '../store/feature/configsSlice';

const Invite = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);

  return Invite_page();
};

export default Invite;
