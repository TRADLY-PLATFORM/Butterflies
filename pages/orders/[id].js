import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check_login } from '../../constant/check_auth';
import { refreshPage } from '../../store/feature/authSlice';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
// import { profile_order_details } from '../../tradly.config.js';
import ProductMainLayout from '../../themes/product/MainLayout';
import EventMainLayout from '../../themes/event/MainLayout';
import SaasMainLayout from '../../themes/saas/CustomLayout';

import ProductOrderDetailsPageLayout from '../../themes/product/OrderDetailsPageLayout';
import EventOrderDetailsPageLayout from '../../themes/event/OrderDetailsPageLayout';
import SaasOrderDetailsPageLayout from '../../themes/saas/OrderDetailsPageLayout';

const order_details = () => {
  const dispatch = useDispatch();
  const router = useRouter();

 useEffect(() => {
   if (localStorage.getItem('refresh_key')) {
     dispatch(
       refreshPage({
         key: localStorage.getItem('refresh_key'),
       })
     );
   }
 }, [dispatch]);

  const profile_order_details = () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductOrderDetailsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventOrderDetailsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasOrderDetailsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductOrderDetailsPageLayout />
          </ProductMainLayout>
        );
    }
  };

  return <>{check_login(router) && profile_order_details()}</>;
};

export default order_details;
