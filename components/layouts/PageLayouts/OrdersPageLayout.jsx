import {   useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { get_orders, orderSelector } from '../../../store/feature/orderSlice';
import OrdersFilter from '../../orders/OrdersFilter/OrdersFilter';
import OrdersItem from '../../orders/OrdersItem/OrdersItem';
import OrdersSearchBox from '../../orders/ordersSearchBox/OrdersSearchBox';

const OrdersPageLayout = () => {
	const dispatch = useDispatch();
	const { auth_key } = useSelector(authSelector)
	const router = useRouter()

	useEffect(() => {
		if (localStorage.getItem('auth_key')) {
			dispatch(get_orders({ authKey: auth_key, bodyParam:{page:1} }));
		} else {
			router.push("/sign-in")
		}
	}, [auth_key])
	const{orders}=useSelector(orderSelector)
    return (
		<div className=" mt-4">
			<div className=" grid  grid-cols-[25%,75%]   sm:grid-cols-[35%,65%] xl:grid-cols-[30%,30%,40%] 2xl:grid-cols-[50%,25%,25%]  mb-11 items-center">
				<h2 className="  text-xl sm:text-3xl   font-bold text-[#042C5C] leading-10">
					Orders
				</h2>
				<div className=" flex justify-end">
					<OrdersFilter />
				</div>
				<div className=" hidden  xl:flex justify-end">
					<OrdersSearchBox />
				</div>
			</div>
			<div>
				<OrdersItem orders={orders} />
			</div>
		</div>
    );
};

export default OrdersPageLayout;