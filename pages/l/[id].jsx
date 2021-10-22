/* eslint-disable react/jsx-filename-extension */
import React from "react";
 import MainLayout from "../../Components/Layouts/MainLayouts/MainLayout";
import MagazineLayout from "../../Components/Layouts/MainLayouts/MagazineLayout";
import EventDetailsPageLayout from "../../Components/Layouts/PageLayouts/EventDetailsPageLayout";

function Details() {
	const pageTitle = "Event Details ";

	return (
		<>
			<div className=" hidden md:block">
				<MagazineLayout>
					<EventDetailsPageLayout />
				</MagazineLayout>
			</div>
			<div className="   md:hidden">
				<MainLayout>
					<EventDetailsPageLayout />
				</MainLayout>
			</div>
		</>
	);
}

export default Details;
