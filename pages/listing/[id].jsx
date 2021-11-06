/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
 import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import MagazineLayout from "../../components/layouts/MainLayouts/MagazineLayout";
import EventDetailsPageLayout from "../../components/layouts/PageLayouts/EventDetailsPageLayout";
import { useDispatch } from "react-redux";
import { refreshPage } from "../../store/feature/authSlice";
import tradly from "tradly";

function Details(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
	}, [dispatch]);

	// seo title
	const seoTitle = (text) => {
		if (text) {
			const check = text.includes("{listing_title}");
			if (check) {
				return text.replace(
					"{listing_title}",
					listing?.title
				);
			}
			return text;
		} else {
			return listing?.title;
		}
	};

	

	const pageTitle = props.seo_text.meta_listing_title;
	const pageDescription = props.seo_text.meta_listing_description;

	return (
		<>
			<div className=" hidden md:block">
				<MagazineLayout>
					<EventDetailsPageLayout
						pageTitle={pageTitle}
						pageDescription={pageDescription}
					/>
				</MagazineLayout>
			</div>
			<div className="   md:hidden">
				<MainLayout>
					<EventDetailsPageLayout
						pageTitle={pageTitle}
						pageDescription={pageDescription}
					/>
				</MainLayout>
			</div>
		</>
	);
}

export default Details;

export async function getServerSideProps(context) {
	const response = await tradly.app.getConfigList({
		paramBody: "seo",
	});
	return {
		props: { seo_text: response?.data?.configs },
	};
}