import React  from "react";
  import MainLayout from "../Components/Layouts/MainLayouts/MainLayout";
import HomePageLayout from "../Components/Layouts/PageLayouts/HomePageLayout";
   
const Index = () => {
		 
	
	return (
		<div>
			<MainLayout>
				<HomePageLayout/>
			</MainLayout>
		</div>
	);
};

export default Index;
