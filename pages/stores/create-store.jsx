import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import CreateStorePageLayout from "../../components/layouts/PageLayouts/CreateStorePageLayout";
 import { refreshPage } from "../../store/feature/authSlice";

const createStore = () => {
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
			 <CreateStorePageLayout/>
		</MainLayout>
	);
};

export default createStore;
