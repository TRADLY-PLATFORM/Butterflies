/* eslint-disable camelcase */
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { categoryListings, categorySelector, clearCategoryListings } from '../../../store/feature/categorySlice';
import Products from '../../ProductsByCategory/Products';

const CategoryListingsPageLayout = () => {
    const router = useRouter();
 
    const dispatch = useDispatch();
    const { auth_key } = useSelector(authSelector)
    useEffect(() => {
		if (router.query.id) {
			dispatch(
				categoryListings({
					prams: {
						page: 1,
						per_page: 20,
						category_id: router.query.id,
					},
					authKey: auth_key,
				})
			);
		}
	}, [router.query.id, auth_key, dispatch]);

	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			dispatch(clearCategoryListings());
		};

		router.events.on("routeChangeStart", handleRouteChange);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [dispatch, router.events]);

    const { category_listings } = useSelector(categorySelector);
    return (
        <div>
            <Products Products={category_listings}/>
        </div>
    );
};

export default CategoryListingsPageLayout;