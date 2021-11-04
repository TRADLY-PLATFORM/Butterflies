import React, { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import MagazineLayout from '../components/layouts/MainLayouts/MagazineLayout';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import CheckoutPageLayout from '../components/layouts/PageLayouts/CheckoutPageLayout';
import { refreshPage } from '../store/feature/authSlice';
import { getCurrencies } from '../store/feature/cartSlice';

const Checkout = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
		dispatch(
		getCurrencies({ authKey: localStorage.getItem("auth_key") })
	)
	}, [dispatch]);
    return (
		<>
			<div className=" hidden md:block">
				<MagazineLayout>
					<CheckoutPageLayout />
				</MagazineLayout>
			</div>
			<div className="   md:hidden">
				<MainLayout>
					<CheckoutPageLayout />
				</MainLayout>
			</div>
		</>
    );
};

export default Checkout;
 
