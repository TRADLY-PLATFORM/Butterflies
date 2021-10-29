import React from 'react'; 
import MagazineLayout from '../Components/Layouts/MainLayouts/MagazineLayout';
import MainLayout from '../Components/Layouts/MainLayouts/MainLayout';
import CheckoutPageLayout from '../Components/Layouts/PageLayouts/CheckoutPageLayout';

const checkout = () => {
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

export default checkout;