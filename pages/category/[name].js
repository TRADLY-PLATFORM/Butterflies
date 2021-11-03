/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
import { useDispatch    } from "react-redux";
import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import {   refreshPage } from "../../store/feature/authSlice";
 import CategoryListingsPageLayout from "../../components/layouts/PageLayouts/CategoryListingsPageLayout";
 
const CategoryListings = () => {
  const dispatch = useDispatch();
 
	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
	}, [dispatch]);

	return (
		<MainLayout>
			<CategoryListingsPageLayout />
		</MainLayout>
	);
};

export default CategoryListings;

 
