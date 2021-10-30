import React, { useState, useEffect } from "react";
import AddressBox from "../../EventDetails/AddressBox/AddressBox";
import DescriptionPart from "../../EventDetails/DescriptionPart/DescriptionPart";
import ImagePart from "../../EventDetails/ImagePart/ImagePart";
import MainBox from "../../EventDetails/MainBox/MainBox";
import RelatedEvents from "../../EventDetails/RelatedEventsPart/RelatedEvents";
import Schedule from "../../EventDetails/SchedulePart/Schedule ";
import ShareButtons from "../../EventDetails/ShareButtons/ShareButtons";
import StoreNameBox from "../../EventDetails/StoreNameBox/StoreNameBox";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import {
	clearListingDetails,
	clearListingState,
	listingDetails,
	listingLike,
	listingSelector,
} from "../../../store/feature/listingSlice";
import OutsideClickHandler from "react-outside-click-handler";
import PopUp from "../../Shared/PopUp/PopUp";
import AttributeDetails from "../../EventDetails/AttributeDetails/AttributeDetails";

const EventDetailsPageLayout = () => {
	const [showError, setShowError] = useState(false);
	const [error_message, setError_message] = useState("");

	const router = useRouter();

	const dispatch = useDispatch();
	const { auth_key, login } = useSelector(authSelector);
	useEffect(() => {
		dispatch(
			listingDetails({ id: router?.query.id, authKey: auth_key })
		);
	}, [auth_key, dispatch, router?.query.id]);

	const {
		isSuccess,
		listing_details,
		rating_data,
		errorMessage,
		isError,
	} = useSelector(listingSelector);
	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			 
			dispatch(clearListingDetails());
		};

		router.events.on("routeChangeStart", handleRouteChange);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [dispatch, router.events]);

	// Button Handle
	const like = (id, isLiked) => {
		if (login) {
			dispatch(
				listingLike({
					id: id,
					isLiked: isLiked,
					authKey: auth_key,
				})
			).then((res) => {
				if (!res.payload.code) {
					dispatch(
						listingDetails({
							id: router?.query.id,
							authKey: auth_key,
						})
					);
				}
			});
		} else {
			router.push("/sign-in");
		}
	};

	const closePopUP = () => {
		dispatch(clearListingState());
		setShowError(false);
		setError_message("");
	};

	return (
		<>
			{(showError || isError) && (
				<OutsideClickHandler
					onOutsideClick={() => {
						(showError || isError) &&
							(setShowError(false),
							setError_message(""),
							dispatch(clearListingState()));
					}}
				>
					<div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
						<div className="w-ful  xs:w-[500px] mx-auto">
							<PopUp
								message={
									error_message ||
									errorMessage
								}
								closePopUP={closePopUP}
							/>
						</div>
					</div>
				</OutsideClickHandler>
			)}
			{
				<div className="flex flex-col justify-center items-center c-md:flex-row  c-md:justify-between c-md:items-start  c-md:mx-auto  pt-16 pb-20   c-md:max-w-[824px]   lg:max-w-[1024px]  xl:max-w-[1224px] ">
					<div className=" w-[400px] lg:w-[500px] xl:w-[600px]">
						<div>
							<ImagePart
								images={
									listing_details?.images
								}
							/>
						</div>
						<div className="mt-6">
							<DescriptionPart
								description={
									listing_details?.description
								}
							/>
						</div>
						{/* <div className=" mt-6">
							<RelatedEvents />
						</div> */}
					</div>
					<div className=" w-[400px] lg:w-[500px] xl:w-[600px] mt-6 c-md:mt-0">
						<div>
							<MainBox
								listing_details={
									listing_details
								}
								rating_data={
									rating_data
								}
								like={like}
							/>
						</div>
						<div className="mt-6">
							<Schedule />
						</div>
						{listing_details?.attributes && (
							<div className="mt-6">
								<AttributeDetails
									attributes={
										listing_details?.attributes
									}
								/>
							</div>
						)}
						{/* <div>
							<AddressBox
								location={
									listing_details?.location
								}
							/>
						</div> */}
						{/* <div className="mt-6">
							<StoreNameBox
								account={
									listing_details?.account
								}
							/>
						</div> */}
						<div className="mt-6">
							<ShareButtons />
						</div>
					</div>
				</div>
			}
		</>
	);
};

export default EventDetailsPageLayout;
