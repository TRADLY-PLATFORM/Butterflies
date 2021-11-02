import React from "react";
import AddressBox from "../../OrderDetails/AddressBox/AddressBox";
import CustomerDetails from "../../OrderDetails/CustomerDetails/CustomerDetails";
import ItemsSummary from "../../OrderDetails/ItemsSummary/ItemsSummary";
import OrderSummary from "../../OrderDetails/OrderSummary/OrderSummary";
import TotalAmountBox from "../../OrderDetails/TotalBox/TotalAmountBox";

const OrderDetailsPageLayout = () => {
	return (
		<div>
			<div className=" flex">
				<h2 className=" text-3xl font-semibold text-black">
					Order Number{" "}
				</h2>
				<h2 className=" text-3xl font-semibold text-primary ml-2">
					#1234{" "}
				</h2>
			</div>
			<div className=" grid grid-cols-[60%,35%]   mt-6">
				<div>
					<div>
						<ItemsSummary />
					</div>
					<div className=" mt-5">
						<CustomerDetails />
					</div>
				</div>
				<div className=" ml-10">
					<div>
						<OrderSummary />
					</div>
					<div className=" mt-5">
						<TotalAmountBox />
					</div>
					<div className=" mt-5">
						<AddressBox />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailsPageLayout;
