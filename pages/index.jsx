import React, { useEffect }  from "react";
import { useDispatch } from "react-redux";
  import MainLayout from "../Components/Layouts/MainLayouts/MainLayout";
import HomePageLayout from "../Components/Layouts/PageLayouts/HomePageLayout";
import { refreshPage } from "../store/feature/authSlice";
   
const Index = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(
			refreshPage({ key: localStorage.getItem("refresh_key") })
		);
	},[dispatch])
	
	return (
		<div>
			<MainLayout>
				<HomePageLayout/>
			</MainLayout>
		</div>
	);
};

export default Index;
