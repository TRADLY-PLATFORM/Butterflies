import React, { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import MagazineLayout from '../Components/Layouts/MainLayouts/MagazineLayout';
import MainLayout from '../Components/Layouts/MainLayouts/MainLayout';
import CheckoutPageLayout from '../Components/Layouts/PageLayouts/CheckoutPageLayout';
import { refreshPage } from '../store/feature/authSlice';

const Checkout = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
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