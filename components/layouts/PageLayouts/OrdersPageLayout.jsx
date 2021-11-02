import React from 'react';
import OrdersFilter from '../../orders/OrdersFilter/OrdersFilter';
import OrdersItem from '../../orders/OrdersItem/OrdersItem';
import OrdersSearchBox from '../../orders/ordersSearchBox/OrdersSearchBox';

const OrdersPageLayout = () => {
    return (
		<div className=" mt-4">
			<div className=" grid grid-cols-[50%,25%,25%]  mb-11 items-center">
				<h2 className=" text-3xl text-black leading-10">
					My Orders
				</h2>
				<div className=" flex justify-end">
					<OrdersFilter />
				</div>
				<div className=" flex justify-end">
					<OrdersSearchBox />
				</div>
			</div>
			<div>
				<OrdersItem />
			</div>
		</div>
    );
};

export default OrdersPageLayout;