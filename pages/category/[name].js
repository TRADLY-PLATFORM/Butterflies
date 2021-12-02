/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import { refreshPage } from "../../store/feature/authSlice";
import CategoryListingsPageLayout from "../../components/layouts/PageLayouts/CategoryListingsPageLayout";
import tradly from "tradly";
import { clearCategoryListings } from "../../store/feature/categorySlice";

const CategoryListings = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
		dispatch(clearCategoryListings());
	}, [dispatch]);

	const pageTitle = props?.seo_text?.meta_listing_category_title;
	const pageDescription = props?.seo_text?.meta_listing_description;
	return (
		<MainLayout>
			<CategoryListingsPageLayout
				pageTitle={pageTitle}
				pageDescription={pageDescription}
			/>
		</MainLayout>
	);
};

export default CategoryListings;

export async function getServerSideProps() {
	const response = await tradly.app.getConfigList({
		paramBody: "seo",
	});
	return {
		props: { seo_text: response?.data?.configs },
	};
}
