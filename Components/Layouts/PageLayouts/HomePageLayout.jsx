import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import {
	homeCollections,
	homeSelector,
} from "../../../store/feature/homeSlice";
import Banner from "../../Home/Banner/Banner";
import Categories from "../../Home/Categories/Categories";
import LatestEvent from "../../Home/LatestEvents/LatestEvent";
import MoreEvent from "../../Home/MoreEvents/MoreEvent";

const HomePageLayout = () => {
	const dispatch = useDispatch();
	const{auth_key}=useSelector(authSelector)

	useEffect(() => {
		 
		dispatch(
			homeCollections({
				authKey: localStorage.getItem("auth_key"),
			})
		);
	 
	}, [auth_key, dispatch]);

	const {
		collections,
		isFetching,
		isSuccess,
		errorMessage,
		categories,
		promo_banners,
	} = useSelector(homeSelector);
 

	return (
		<div className="">
			<div>
				<Banner banners={promo_banners} />
			</div>
			<div>
				<Categories categories={categories} />
			</div>
			{collections?.map((collection) => {
				const scope_type = collection.scope_type;
				if (scope_type === 4) {
					return (
						<div key={Math.random()}>
							<LatestEvent products={collection} />
						</div>
					);
				}
			})}
		</div>
	);
};

export default HomePageLayout;