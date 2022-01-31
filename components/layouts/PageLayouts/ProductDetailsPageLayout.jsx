/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import DescriptionPart from '../../ListingDetails/DescriptionPart/DescriptionPart';
import ImagePart from '../../ListingDetails/ImagePart/ImagePart';
import MainBox from '../../ListingDetails/MainBox/MainBox';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  clearListingState,
  getListingReviews,
  listingDetails,
  listingLike,
  listingSelector,
} from '../../../store/feature/listingSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUp from '../../Shared/PopUp/PopUp';
import AttributeDetails from '../../ListingDetails/AttributeDetails/AttributeDetails';
import Head from 'next/head';
import AddressBox from '../../ListingDetails/AddressBox/AddressBox';
import Variants from '../../ListingDetails/Variants/Variants';
import ProductButtons from '../../ListingDetails/ProductButtons/ProductButtons';
import StoreNameBox from '../../ListingDetails/StoreNameBox/StoreNameBox';
import RatingBox from '../../ListingDetails/RatingBox/RatingBox';
import ReviewBox from '../../ListingDetails/ReviewBox/ReviewBox';
import ReactPaginate from 'react-paginate';

const ProductDetailsPageLayout = ({ pageTitle, pageDescription }) => {
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');

  const [selectedVariant, setSelectedVariant] = useState(null);

  const router = useRouter();

  const dispatch = useDispatch();
  const { auth_key, login } = useSelector(authSelector);
  useEffect(() => {
    if (router?.query.id) {
      dispatch(
        listingDetails({
          id: router?.query.id.split('-')[0],
          authKey: auth_key,
        })
      );
      dispatch(
        getListingReviews({
          authKey: auth_key,
          params: {
            type: 'listings',
            id: router?.query.id.split('-')[0],
            page: 1,
          },
        })
      );
    }
  }, [auth_key, dispatch, router?.query.id]);

  const {
    isSuccess,
    listing_details,
    rating_data,
    errorMessage,
    isError,
    reviews,
    my_review,
    review_page,
    review_total_records,
  } = useSelector(listingSelector);

  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     dispatch(clearListingDetails());
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   // return () => {
  //   //   router.events.off('routeChangeStart', handleRouteChange);
  //   // };
  // }, [dispatch, router.events]);

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
              id: router?.query.id.split('-')[0],
              authKey: auth_key,
            })
          );
        }
      });
    } else {
      router.push('/sign-in');
    }
  };

  const closePopUP = () => {
    dispatch(clearListingState());
    setShowError(false);
    setError_message('');
  };

  // seo title
  const seoTitle = (text) => {
    if (text) {
      const check = text.includes('{listing_title}');
      if (check) {
        return text.replace('{listing_title}', listing_details?.title);
      }
      return text;
    } else {
      return listing_details?.title;
    }
  };

  // Seo description
  const seoDescription = (text) => {
    if (text) {
      const check = text.includes('{listing_description}');
      if (check) {
        return text.replace(
          '{listing_description}',
          listing_details?.description
        );
      }
      return text;
    } else {
      return listing_details?.description;
    }
  };

  // 
   const [pageCount, setPageCount] = useState(0);
   useEffect(() => {
     const totalpage = Math.ceil(review_total_records / 30);
     if (Number(review_total_records) > 30) {
       setPageCount(totalpage);
     }
   }, [review_total_records]);

   //
   const moreReviews = (data) => {
     dispatch(
       getListingReviews({
         authKey: auth_key,
         params: {
           type: 'listings',
           id: router?.query.id.split('-')[0],
           page: Number(data.selected) + 1,
           per_page: 30,
         },
       })
     );
   };


  return (
    <>
      {listing_details && (
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
      )}
      {(showError || isError) && (
        <OutsideClickHandler
          onOutsideClick={() => {
            (showError || isError) &&
              (setShowError(false),
              setError_message(''),
              dispatch(clearListingState()));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp
                message={error_message || errorMessage}
                closePopUP={closePopUP}
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      {
        <div className="flex flex-col justify-center items-center c-md:flex-row  c-md:justify-between c-md:items-start  c-md:mx-auto  md:pt-[20px] pb-20   c-md:max-w-[824px]   lg:max-w-[1024px]  xl:max-w-[1224px] ">
          <div className=" w-[100vw] ms:w-[400px] lg:w-[500px] xl:w-[600px]">
            <div>
              <ImagePart images={listing_details?.images} />
            </div>
            {listing_details?.description !== '' && (
              <div className="mt-6 hidden md:block">
                <DescriptionPart description={listing_details?.description} />
              </div>
            )}
            {/* <div className=" mt-6">
							<RelatedEvents />
						</div> */}
          </div>
          <div className="  w-[100vw] ms:w-[400px] lg:w-[500px] xl:w-[600px] mt-6 c-md:mt-0">
            <div>
              <MainBox
                listing_details={listing_details}
                rating_data={rating_data}
                like={like}
              />
            </div>
            {listing_details?.variants?.length > 0 && (
              <div className="mt-6">
                <Variants
                  variants={listing_details.variants}
                  setSelectedVariant={setSelectedVariant}
                  selectedVariant={selectedVariant}
                />
              </div>
            )}

            <div className=" fixed bottom-0 w-full left-0 right-0 bg-white sm:relative md:bg-transparent z-30 md:mt-6">
              <ProductButtons
                listing_details={listing_details}
                selectedVariant={selectedVariant}
              />
            </div>
            {listing_details?.account && (
              <div className="mt-6">
                <StoreNameBox account={listing_details?.account} />
              </div>
            )}

            {listing_details?.location &&
              Object.keys(listing_details?.location).length > 0 && (
                <div className="mt-6">
                  <AddressBox location={listing_details?.location} />
                </div>
              )}
            {listing_details?.attributes &&
              listing_details?.attributes.length > 0 && (
                <div className="mt-6">
                  <AttributeDetails attributes={listing_details?.attributes} />
                </div>
              )}
            {listing_details?.description !== '' && (
              <div className="mt-6 md:hidden">
                <DescriptionPart description={listing_details?.description} />
              </div>
            )}

            {Object.keys(rating_data)?.length > 0 && (
              <div className="mt-6">
                <RatingBox rating_data={rating_data} />
              </div>
            )}
            {reviews && reviews?.length > 0 && (
              <div className="mt-6">
                <ReviewBox
                  rating_data={rating_data}
                  reviews={reviews}
                  review_page={review_page}
                />
                <div className="mt-5 pb-12 flex justify-center ">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    onPageChange={(data) => moreReviews(data)}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    renderOnZeroPageCount={null}
                    containerClassName=""
                    className="relative z-0 inline-flex flex-wrap justify-center rounded-md shadow-sm -space-x-px "
                    pageClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center text-sm font-medium"
                    pageLinkClassName="px-4 py-2 border"
                    previousClassName="relative inline-flex items-center px-2 py-2   border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    nextClassName="relative inline-flex items-center px-2 py-2 r border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    breakLinkClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    activeLinkClassName="z-10 bg-primary  border-primary text-white relative inline-flex items-center px-4 py-2 border text-md font-semibold"
                    disabledLinkClassName=""
                    prevPageRel="2"
                    forcePage={review_page - 1}
                  />
                </div>
              </div>
            )}
            {/* <div className="mt-6">
							<ShareButtons />
						</div> */}
          </div>
        </div>
      }
    </>
  );
};

export default ProductDetailsPageLayout;
