/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MagazineLayout from "../components/layouts/MainLayouts/MagazineLayout";
import MainLayout from "../components/layouts/MainLayouts/MainLayout";
import CheckoutPageLayout from "../components/layouts/PageLayouts/CheckoutPageLayout";
import { refreshPage } from "../store/feature/authSlice";
import { getCurrencies } from "../store/feature/cartSlice";
import tradly from "tradly";
import EventCheckoutPageLayout from "../components/layouts/PageLayouts/EventCheckoutPageLayout";

const Checkout = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
		dispatch(
			getCurrencies({
				authKey: localStorage.getItem("auth_key"),
			})
		);
	}, [dispatch]);
	const pageTitle = props?.seo_text?.meta_title;
	const pageDescription = props?.seo_text?.meta_description;
	return (
    <>
      <div className=" hidden md:block">
        <MagazineLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          {/* <CheckoutPageLayout /> */}
          <EventCheckoutPageLayout />
        </MagazineLayout>
      </div>
      <div className="   md:hidden">
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          {/* <CheckoutPageLayout /> */}
          <EventCheckoutPageLayout />
        </MainLayout>
      </div>
    </>
  );
};

export default Checkout;

export async function getServerSideProps() {
	const response = await tradly.app.getConfigList({
		paramBody: "seo",
	});
	return {
		props: { seo_text: response?.data?.configs },
	};
}
