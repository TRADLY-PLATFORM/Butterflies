import React, { useEffect } from 'react';
import AddressBox from '../../MyStore/OrderDetails/AddressBox/AddressBox';
import CustomerDetails from '../../MyStore/OrderDetails/CustomerDetails/CustomerDetails';
import ItemsSummary from '../../MyStore/OrderDetails/ItemsSummary/ItemsSummary';
import OrderSummary from '../../MyStore/OrderDetails/OrderSummary/OrderSummary';
import TotalAmountBox from '../../MyStore/OrderDetails/TotalBox/TotalAmountBox';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { get_order_details, store_orderSelector } from '../../../store/feature/store_orderSlice';
 

const StoreOrderDetailsPageLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth_key } = useSelector(authSelector);

  useEffect(() => {
    if (auth_key) {
      dispatch(
        get_order_details({
          authKey: auth_key,
          id: router.query.id,
          bodyParam: { account_id: router.query.store_id },
        })
      );
    }
  }, [auth_key, router.query.id]);
  const { order_details } = useSelector(store_orderSelector);
  return (
    <div>
      <div className=" flex">
        <h2 className=" text-xl sm:text-3xl font-semibold text-black">
          Order Number{' '}
        </h2>
        <h2 className="  text-xl sm:text-3xl font-semibold text-primary ml-2">
          #{order_details?.id}
        </h2>
      </div>
      <div className=" grid   grid-cols-[100%]  xl:grid-cols-[60%,40%]  2xl:grid-cols-[60%,35%]   mt-6">
        <div>
          <div>
            <ItemsSummary order_details={order_details} />
          </div>
          <div className=" mt-5">
            <CustomerDetails order_details={order_details} />
          </div>
        </div>
        <div className="  mt-5 xl:mt-0 xl:ml-10">
          <div>
            <OrderSummary order_details={order_details} />
          </div>
          <div className=" mt-5">
            <TotalAmountBox order_details={order_details} />
          </div>
          <div className=" mt-5">
            <AddressBox order_details={order_details} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOrderDetailsPageLayout;
