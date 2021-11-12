import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  callExpressLogin,
  callStripeConnect,
  payoutSelector,
} from '../../../store/feature/payout';
import { storeSelector } from '../../../store/feature/storeSlice';
import PayoutScreen from '../../payout/PayoutScreen';

const PayoutPageLayout = () => {
  const dispatch = useDispatch();
  const { my_stores } = useSelector(storeSelector);
  const { auth_key } = useSelector(authSelector);


  useEffect(() => {
    if (my_stores !== null) {
      if (my_stores?.length > 0) {
        dispatch(callStripeConnect({ id: my_stores[0].id, authKey: auth_key }));
        dispatch(
          callExpressLogin({
            authKey: auth_key,
            sendData: { account_id: my_stores[0].id },
          })
        );
      }
    }
  }, [my_stores]);
    
      const{stripe_connect}=useSelector(payoutSelector)


    return (
      <div>
        {stripe_connect && <PayoutScreen stripe_connect={stripe_connect} />}
      </div>
    );
};

export default PayoutPageLayout;

// export async function getServerSideProps() {
//   const response = await tradly.app.getConfigList({
//     paramBody: 'seo',
//   });
//   return {
//     props: { seo_text: response?.data?.configs },
//   };
// }
