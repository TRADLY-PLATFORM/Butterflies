/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import DescriptionPart from '../../components/ListingDetails/DescriptionPart/DescriptionPart';
import ImagePart from '../../components/ListingDetails/ImagePart/ImagePart';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import {
  clearListingState,
  getListingReviews,
  listingDetails,
  listingLike,
  listingSelector,
} from '../../store/feature/listingSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUp from '../../components/Shared/PopUp/PopUp';
import AttributeDetails from '../../components/ListingDetails/AttributeDetails/AttributeDetails';
import Head from 'next/head';
import AddressBox from '../../components/ListingDetails/AddressBox/AddressBox';
import Variants from '../../components/ListingDetails/Variants/Variants';
import ProductButtons from '../../components/ListingDetails/ProductButtons/ProductButtons';
import StoreNameBox from '../../components/ListingDetails/StoreNameBox/StoreNameBox';
import RatingBox from '../../components/ListingDetails/RatingBox/RatingBox';
import ReviewBox from '../../components/ListingDetails/ReviewBox/ReviewBox';
import ReactPaginate from 'react-paginate';
import RelatedListings from '../../components/ListingDetails/RelatedListing/RelatedListings';
import { check_login } from '../../constant/check_auth';
import Breadcrumb from '../../components/Shared/Breadcrumb';

// Garden detail narrative: photo → story → care facts → grower → reviews.
// Same slices and thunks as every other theme; only the markup is new.
const DetailsPageLayout = () => {
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { auth_key } = useSelector(authSelector);

  useEffect(() => {
    if (router?.query.id) {
      dispatch(listingDetails({ id: router?.query.id, authKey: auth_key }));
    }
  }, [auth_key, dispatch, router?.query.id]);

  const {
    listing_details,
    rating_data,
    errorMessage,
    isError,
    reviews,
    review_page,
    review_total_records,
  } = useSelector(listingSelector);

  useEffect(() => {
    if (listing_details) {
      dispatch(
        getListingReviews({
          authKey: auth_key,
          params: { type: 'listings', id: listing_details.id, page: 1 },
        })
      );
    }
  }, [listing_details, auth_key, dispatch]);

  const like = (id, isLiked) => {
    if (check_login(router)) {
      dispatch(listingLike({ id, isLiked, authKey: auth_key }));
    }
  };

  const closePopUP = () => {
    dispatch(clearListingState());
    setShowError(false);
    setError_message('');
  };

  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    const totalpage = Math.ceil(review_total_records / 30);
    if (Number(review_total_records) > 30) setPageCount(totalpage);
  }, [review_total_records]);

  const moreReviews = (data) => {
    dispatch(
      getListingReviews({
        authKey: auth_key,
        params: { type: 'listings', id: listing_details.id, page: data.selected + 1 },
      })
    );
  };

  return (
    <>
      {listing_details && (
        <Head>
          <title>{listing_details.meta_title || listing_details.title}</title>
          <meta
            name="description"
            content={listing_details.meta_description || listing_details.description}
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
          <div className="fixed z-50 top-0 left-0 w-screen mt-5">
            <div className="w-full xs:w-[500px] mx-auto">
              <PopUp message={error_message || errorMessage} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}

      <div className="max-w-[1024px] mx-auto">
        {listing_details && (
          <Breadcrumb
            lists={[
              { name: 'Home', link: '/' },
              { name: 'Categories', link: '/lc' },
              { name: listing_details?.title, link: '' },
            ]}
          />
        )}

        {/* Photo + buy card */}
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="w-full md:w-[55%]">
            <div className="rounded-3xl overflow-hidden bg-white shadow-c-sm">
              <ImagePart images={listing_details?.images} />
            </div>
          </div>
          <div className="w-full md:w-[45%]">
            <div className="bg-white rounded-3xl p-6 shadow-c-sm md:sticky md:top-24">
              <p className="text-xs tracking-[0.2em] uppercase text-garden-moss font-semibold">
                {listing_details?.categories?.[0]?.name || 'Plant'}
              </p>
              <h1 className="font-garden-serif text-3xl text-garden-pine mt-2 leading-tight">
                {listing_details?.title}
              </h1>
              <p className="mt-3 text-2xl font-semibold text-garden-leaf">
                {listing_details?.list_price?.formatted}
              </p>
              <div className="mt-5">
                <ProductButtons
                  listing_details={listing_details}
                  selectedVariant={selectedVariant}
                  setError_message={setError_message}
                  setShowError={setShowError}
                />
              </div>
              {listing_details?.account && (
                <div className="mt-5 pt-5 border-t border-garden-moss/15">
                  <p className="text-xs uppercase tracking-widest text-garden-soil/60 mb-2">
                    Grown by
                  </p>
                  <StoreNameBox account={listing_details?.account} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Story */}
        {listing_details?.description && (
          <div className="mt-6 bg-white rounded-3xl p-6 md:p-8 shadow-c-sm">
            <h2 className="font-garden-serif text-2xl text-garden-pine">
              The story
            </h2>
            <div className="mt-3">
              <DescriptionPart description={listing_details?.description} />
            </div>
          </div>
        )}

        {/* Care facts */}
        {listing_details?.attributes?.length > 0 && (
          <div className="mt-6 bg-garden-pine text-white rounded-3xl p-6 md:p-8 shadow-c-sm">
            <h2 className="font-garden-serif text-2xl">Plant care</h2>
            <div className="mt-3">
              <AttributeDetails attributes={listing_details?.attributes} />
            </div>
          </div>
        )}
        {listing_details?.location &&
          Object.keys(listing_details?.location).length > 0 && (
            <div className="mt-6">
              <AddressBox location={listing_details?.location} />
            </div>
          )}
        {listing_details?.variants?.length > 0 && (
          <div className="mt-6 bg-white rounded-3xl p-6 shadow-c-sm">
            <Variants
              variants={listing_details.variants}
              setSelectedVariant={setSelectedVariant}
              selectedVariant={selectedVariant}
              listing_details={listing_details}
            />
          </div>
        )}

        {/* Ratings + reviews */}
        {Object.keys(rating_data || {})?.length > 0 && (
          <div className="mt-6">
            <RatingBox rating_data={rating_data} />
          </div>
        )}
        {reviews && reviews?.length > 0 && (
          <div className="mt-6 bg-white rounded-3xl p-6 md:p-8 shadow-c-sm">
            <h2 className="font-garden-serif text-2xl text-garden-pine mb-4">
              From fellow growers
            </h2>
            <ReviewBox
              listing_details={listing_details}
              rating_data={rating_data}
              reviews={reviews}
              review_page={review_page}
            />
            {!pageCount === 0 && (
              <div className="mt-6 flex justify-center">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next"
                  onPageChange={moreReviews}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="prev"
                />
              </div>
            )}
          </div>
        )}

        {/* Related */}
        <div className="mt-6">
          <RelatedListings listing_details={listing_details} />
        </div>
      </div>
    </>
  );
};

export default DetailsPageLayout;
