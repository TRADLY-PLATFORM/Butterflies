/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
 import MainLayout from "../../Components/Layouts/MainLayouts/MainLayout";
import MagazineLayout from "../../Components/Layouts/MainLayouts/MagazineLayout";
import EventDetailsPageLayout from "../../Components/Layouts/PageLayouts/EventDetailsPageLayout";
import { useDispatch } from "react-redux";
import { refreshPage } from "../../store/feature/authSlice";

function Details() {
	const pageTitle = "Event Details ";
		const dispatch = useDispatch();
		useEffect(() => {
			dispatch(
				refreshPage({
					key: localStorage.getItem("refresh_key"),
				})
			);
		}, [dispatch]);

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
