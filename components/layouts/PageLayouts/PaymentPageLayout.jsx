 import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import { cartSelector } from "../../../store/feature/cartSlice";
import { get_orders, orderSelector } from "../../../store/feature/orderSlice";
import OrdersItem from "../../PaymentCard/OrdersItem";
 import PaymentCard from "../../PaymentCard/PaymentCard";
import MagazineLayout from "../MainLayouts/MagazineLayout";
 
const PaymentPageLayout = () => {
	const dispatch = useDispatch();
	const { login, auth_key } = useSelector(authSelector);
	const {order_reference,cart,cart_details}=useSelector(cartSelector)

	useEffect(() => {
		if (login) {
			dispatch(
				get_orders({
					authKey: auth_key,
					bodyParam: {
						order_reference: order_reference,
						page: 1,
					},
				})
			);
		}
	}, [auth_key, dispatch, login, order_reference]);

	const { orders } = useSelector(orderSelector)
	

	return (
		<>
			<div className="">
				<MagazineLayout>
					<div className="w-screen min-h-screen   grid grid-col-[100%]   c-md:grid-cols-1  justify-center">
						{/* <div className=" hidden   min-h-[500px]  bg-[white] c-md:flex justify-center items-center">
							<OrdersItem
								cart={cart}
								cart_details={
									cart_details
								}
							/>
						</div> */}
						<div className="min-h-[500px] bg-[#ffffff] shadow-lg ">
							<PaymentCard />
						</div>
					</div>
				</MagazineLayout>
			</div>
		</>
	);
};

export default PaymentPageLayout;
