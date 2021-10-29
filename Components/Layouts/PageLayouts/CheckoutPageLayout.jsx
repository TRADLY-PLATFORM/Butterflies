import React from 'react';
import CartItemBox from '../../Cart/CartItemBox/CartItemBox';
import OrderSummary from '../../Cart/OrderSummary/OrderSummary';
import PaymentMethod from '../../Cart/PaymentMethods/PaymentMethod';
import ShippingMethod from '../../Cart/ShippingMethods/ShippingMethod';

const CheckoutPageLayout = () => {
    return (
		<div className=" mt-16 mx-auto w-full    sm:px-8 md:px-0 flex  flex-col justify-center c-md:flex-row c-md:justify-between    c-md:max-w-[824px]  lg:max-w-[1000px]  ">
			<div className="   c-md:w-[400px] lg:w-[600px] ">
				<div className="bg-[#FEFEFE] rounded-lg py-12 px-9">
					<CartItemBox />
				</div>
				<div className="mt-6">
					<ShippingMethod />
				</div>
				<div className="mt-6">
					<PaymentMethod />
				</div>
			</div>
			<div className=" mt-6 c-md:mt-0 c-md:w-[400px] lg:w-[380px]">
				<OrderSummary />
			</div>
		</div>
    );
};

export default CheckoutPageLayout;