/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import CategoriesPageLayout from "../../components/layouts/PageLayouts/CategoriesPageLayout";
import { refreshPage } from "../../store/feature/authSlice";
import tradly from "tradly";

const Categories = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
	}, [dispatch]);

	const pageTitle = props?.seo_text?.meta_title;
	const pageDescription = props?.seo_text?.meta_description;

	return (
		<MainLayout
			pageTitle={pageTitle}
			pageDescription={pageDescription}
		>
			<CategoriesPageLayout />
		</MainLayout>
	);
};

export default Categories;

export async function getServerSideProps() {
	const response = await tradly.app.getConfigList({
		paramBody: "seo",
	});
	return {
		props: { seo_text: response?.data?.configs },
	};
}
