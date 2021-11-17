import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { clearListings, getAllListings, listingSelector } from '../../../store/feature/listingSlice';
import Listings from '../../Listings/Listings';

const ListingsPageLayout = () => {
    const router = useRouter();

    const dispatch = useDispatch();
    const { auth_key } = useSelector(authSelector);

    useEffect(() => {
 			dispatch(
				getAllListings({
					prams: {
						page: 1,
						 
 					},
					authKey: auth_key,
				})
			);
     }, [  auth_key, dispatch]);

    // useEffect(() => {
	// 	const handleRouteChange = (url, { shallow }) => {
	// 		dispatch(clearListings());
	// 	};

	// 	router.events.on("routeChangeStart", handleRouteChange);

	// 	// If the component is unmounted, unsubscribe
	// 	// from the event with the `off` method:
	// 	return () => {
	// 		router.events.off("routeChangeStart", handleRouteChange);
	// 	};
    // }, [dispatch, router.events]);

    const {listings} =useSelector(listingSelector)
    return (
		<div>
			<Listings Products={listings} />
		</div>
    );
};

export default ListingsPageLayout;