import { safeJSONParse } from '../../components/Shared/Constant/Constant';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { refreshPage } from '../../store/feature/authSlice';
import { clearListingDetails, setListingDetail } from '../../store/feature/listingSlice';
import {
  setGeneralConfig,
  setListingConfig,
} from '../../store/feature/configsSlice';
import { listing_details_page } from '../../tradly.config';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
import { wrapper } from '../../store/store';

function Details() {
  const [MARKETPLACE_MODULES, setMARKETPLACE_MODULES] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }
    dispatch(clearListingDetails());
    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));
    dispatch(setGeneralConfig({ general_configs }));
    dispatch(setListingConfig({ listing_configs: TYPE_CONSTANT.LISTINGS_CONFIGS }));
    setMARKETPLACE_MODULES(Number(localStorage.getItem('MARKETPLACE_MODULES')));
  }, [dispatch]);

  return listing_details_page();
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const { getListingDetail, getAppConfigs } = await import('../../lib/serverData');
  const id = params?.id as string;
  const [data, appConfigs] = await Promise.all([getListingDetail(id), getAppConfigs()]);
  if (data?.listing) {
    store.dispatch(setListingDetail({ listing: data.listing }));
  }
  return { props: { appConfigs } };
});

export default Details;
