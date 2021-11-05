import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import {
	AllPromoBanners,
	homeCollections,
	homeSelector,
} from "../../../store/feature/homeSlice";
import Banner from "../../home/Banner/Banner";
import Categories from "../../home/Categories/Categories";
import LatestEvent from "../../home/LatestEvents/LatestEvent";
 
const HomePageLayout = () => {
	const dispatch = useDispatch();
	const { auth_key } = useSelector(authSelector);

	useEffect(() => {
		dispatch(
			homeCollections({
				authKey: localStorage.getItem("auth_key"),
			})
		);
		dispatch(
			AllPromoBanners({
				authKey: localStorage.getItem("auth_key"),
				bodyParam: { placement :"home_body"},
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
		page_promo_banners,
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
							<LatestEvent
								products={collection}
							/>
						</div>
					);
				}
			})}
			<div>
				<Banner banners={page_promo_banners} />
			</div>
		</div>
	);
};

export default HomePageLayout;
