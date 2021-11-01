import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../components/layouts/MainLayouts/MainLayout";
import HomePageLayout from "../components/layouts/PageLayouts/HomePageLayout";
import { refreshPage } from "../store/feature/authSlice";

const Index = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			refreshPage({ key: localStorage.getItem("refresh_key") })
		);
	}, [dispatch]);

	return (
 			<MainLayout>
				<HomePageLayout />
			</MainLayout>
 	);
};

export default Index;
