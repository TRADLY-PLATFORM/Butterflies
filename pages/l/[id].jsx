/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
 import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import MagazineLayout from "../../components/layouts/MainLayouts/MagazineLayout";
import EventDetailsPageLayout from "../../components/layouts/PageLayouts/EventDetailsPageLayout";
import { useDispatch } from "react-redux";
import { refreshPage } from "../../store/feature/authSlice";

function Details() {
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
