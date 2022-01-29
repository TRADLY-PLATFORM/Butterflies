/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import CategoriesPageLayout from "../../components/layouts/PageLayouts/CategoriesPageLayout";
import { refreshPage } from "../../store/feature/authSlice";
import tradly from "tradly";
import { all_listing_categories_page } from "../../themes/Theme1";
import { TYPE_CONSTANT } from "../../constant/Web_constant";

const Categories = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
	}, [dispatch]);

	const pageTitle = TYPE_CONSTANT.META_TITLE;
	const pageDescription = TYPE_CONSTANT.META_DESCRIPTIONS;

	return (
		all_listing_categories_page(pageTitle, pageDescription)
	);
};

export default Categories;

 