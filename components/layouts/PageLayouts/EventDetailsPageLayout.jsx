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
  clearListingDetails,
  clearListingState,
  listingDetails,
  listingLike,
  listingSelector,
} from '../../../store/feature/listingSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUp from '../../Shared/PopUp/PopUp';
import AttributeDetails from '../../ListingDetails/AttributeDetails/AttributeDetails';
import EventButtons from '../../ListingDetails/EventsButtons/EventButtons';
import Head from 'next/head';
import Schedule from '../../ListingDetails/SchedulePart/Schedule ';
import AddressBox from '../../ListingDetails/AddressBox/AddressBox';
import Variants from '../../ListingDetails/Variants/Variants';

const EventDetailsPageLayout = ({ pageTitle, pageDescription }) => {
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
          id: router?.query.id.split("-")[0],
          authKey: auth_key,
        })
      );
    }
  }, [auth_key, dispatch, router?.query.id]);

  const { isSuccess, listing_details, rating_data, errorMessage, isError } =
    useSelector(listingSelector);

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
            <div className="w-ful  xs:w-[500px] mx-auto">
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
                  listing_details={listing_details}
                />
              </div>
            )}
            <div className=" fixed bottom-0 w-full left-0 right-0 bg-white sm:relative sm:bg-transparent z-30 md:mt-6">
              <EventButtons
                listing_details={listing_details}
                selectedVariant={selectedVariant}
              />
            </div>
            {listing_details?.schedules?.length > 0 && (
              <div className="mt-6">
                <Schedule schedules={listing_details?.schedules} />
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

            {/* <div className="mt-6">
							<StoreNameBox
								account={
									listing_details?.account
								}
							/>
						</div> */}
            {/* <div className="mt-6">
							<ShareButtons />
						</div> */}
          </div>
        </div>
      }
    </>
  );
};

export default EventDetailsPageLayout;
