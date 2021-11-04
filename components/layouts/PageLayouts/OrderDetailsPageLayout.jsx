import React, { useEffect } from "react";
import AddressBox from "../../OrderDetails/AddressBox/AddressBox";
import CustomerDetails from "../../OrderDetails/CustomerDetails/CustomerDetails";
import ItemsSummary from "../../OrderDetails/ItemsSummary/ItemsSummary";
import OrderSummary from "../../OrderDetails/OrderSummary/OrderSummary";
import TotalAmountBox from "../../OrderDetails/TotalBox/TotalAmountBox";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import { get_order_details, orderSelector } from "../../../store/feature/orderSlice";

const OrderDetailsPageLayout = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	const { auth_key } = useSelector(authSelector)
	
	useEffect(() => {
		if (auth_key) {
			dispatch(get_order_details({authKey:auth_key, id:router.query.id}));
		}
	}, [auth_key, router.query.id]);
	const{order_details}=useSelector(orderSelector)
	return (
		<div>
			<div className=" flex">
				<h2 className=" text-xl sm:text-3xl font-semibold text-black">
					Order Number{" "}
				</h2>
 				<h2 className="  text-xl sm:text-3xl font-semibold text-primary ml-2">
					#{order_details?.id}
				</h2>
			</div>
			<div className=" grid   grid-cols-[100%]  xl:grid-cols-[60%,40%]  2xl:grid-cols-[60%,35%]   mt-6">
				<div>
					<div>
						<ItemsSummary
							order_details={order_details}
						/>
					</div>
					<div className=" mt-5">
						<CustomerDetails
							order_details={order_details}
						/>
					</div>
				</div>
				<div className="  mt-5 xl:mt-0 xl:ml-10">
					<div>
						<OrderSummary
							order_details={order_details}
						/>
					</div>
					<div className=" mt-5">
						<TotalAmountBox
							order_details={order_details}
						/>
					</div>
					<div className=" mt-5">
						<AddressBox
							order_details={order_details}
						/>
 					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailsPageLayout;
