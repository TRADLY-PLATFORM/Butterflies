/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import {
	categoryListings,
	categorySelector,
	clearCategoryListings,
} from "../../../store/feature/categorySlice";
import Products from "../../ProductsByCategory/Products";
import Head from "next/head";

const CategoryListingsPageLayout = ({ pageTitle, pageDescription }) => {
	const router = useRouter();

	const dispatch = useDispatch();
	const { auth_key,first_name } = useSelector(authSelector);
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

	// useEffect(() => {
	// 	const handleRouteChange = (url, { shallow }) => {
	// 		dispatch(clearCategoryListings());
	// 	};

	// 	router.events.on("routeChangeStart", handleRouteChange);

	// 	// If the component is unmounted, unsubscribe
	// 	// from the event with the `off` method:
	// 	return () => {
	// 		router.events.off("routeChangeStart", handleRouteChange);
	// 	};
	// }, [dispatch, router.events]);

	// seo title
	const seoTitle = (text) => {
		if (text) {
			const check = text.includes("{listing_category}");
			if (check) {
				return text.replace("{listing_category}", router.query.name);
			}
			return text;
		}
	};

	// Seo description
	const seoDescription = (text) => {
		if (text) {
			const check = text.includes(
				"{listing_category_description}"
			);
			if (check) {
				return text.replace(
					"{listing_category_description}",
					router.query.name
				);
			}
			return text;
		}
	};

	const { category_listings } = useSelector(categorySelector);
	return (
    <>
      <Head>
        <title>{seoTitle(pageTitle)}</title>
        <meta
          name="description"
          content={`${seoDescription(pageDescription)}`}
        />
        <meta
          property="og:title"
          content={`${seoTitle(pageTitle)}`}
          key="title"
        />
      </Head>
      {category_listings === null || category_listings?.length > 0 ? (
        <div>
          <Products Products={category_listings} />
        </div>
      ) : (
        <div className=" w-full h-[200px] mt-5 flex justify-center items-start">
          <div
            className="w-full    md:w-5/6 bg-yellow-500    text-white px-4 py-3 rounded relative grid grid-cols-[5%,80%]"
            role="alert"
          >
            <div className="flex items-center justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div className="ml-5">
              <strong className="font-bold">
                {first_name ? 'Hi' + '  ' + first_name : 'Hi Guess !'}, Oops!
              </strong>
              <span className="  ml-2">
                No listings found under this category.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryListingsPageLayout;
