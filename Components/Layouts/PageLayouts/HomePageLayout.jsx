import React from "react";
import Banner from "../../Home/Banner/Banner";
import Categories from "../../Home/Categories/Categories";
import LatestEvent from "../../Home/LatestEvents/LatestEvent";
import MoreEvent from "../../Home/MoreEvents/MoreEvent";

const HomePageLayout = () => {
	return (
		<div className="">
			<div>
				<Banner />
			</div>
			<div>
				<Categories />
			</div>
			<div>
				<LatestEvent />
			</div>
			<div>
				<MoreEvent />
			</div>
		</div>
	);
};

export default HomePageLayout;
