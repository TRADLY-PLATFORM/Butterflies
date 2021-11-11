import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { get_orders, store_orderSelector } from '../../../store/feature/store_orderSlice';
import NoOrdersItem from '../../MyStore/orders/NoOrdersItem/NoOrdersItem';
import OrdersFilter from '../../MyStore/orders/OrdersFilter/OrdersFilter';
import OrdersItem from '../../MyStore/orders/OrdersItem/OrdersItem';
    
const StoreOrdersPageLayout = () => {
  const dispatch = useDispatch();
  const { auth_key } = useSelector(authSelector);
    const router = useRouter();
    const accountId = router.query.store_id;

  useEffect(() => {
    if (localStorage.getItem('auth_key')) {
      dispatch(
         get_orders({
          authKey: auth_key,
          bodyParam: { page: 1, account_id: accountId },
        })
      );
    router.push({
      pathname: '/stores/orders',
      query: { store_id: accountId },
    });
    }  
  }, [auth_key]);
    const { orders } = useSelector(store_orderSelector);
 
  return (
    <div className=" mt-4">
      <div className=" grid  grid-cols-[25%,75%]   sm:grid-cols-[35%,65%] xl:grid-cols-[50%,50%] 2xl:grid-cols-[50%,50%]  mb-11 items-center">
        <h2 className="  text-xl sm:text-3xl   font-bold text-[#042C5C] leading-10">
          Orders
        </h2>
        <div className=" flex justify-end">
          <OrdersFilter />
        </div>
        {/* <div className=" hidden  xl:flex justify-end">
					<OrdersSearchBox />
				</div> */}
      </div>
      {orders === null || orders.length > 0 ? (
        <div>
          <OrdersItem orders={orders} accountId={accountId} />
        </div>
      ) : (
        <div>
          <NoOrdersItem />
        </div>
      )}
    </div>
  );
};

export default StoreOrdersPageLayout;
