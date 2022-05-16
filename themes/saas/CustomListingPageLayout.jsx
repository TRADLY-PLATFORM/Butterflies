import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import {
  clearListings,
  getAllListings,
  listingSelector,
} from '../../store/feature/listingSlice';
import Listings from '../../components/Listings/Listings';
import ReactPaginate from 'react-paginate';
import CustomLoading from '../../components/Shared/Loading/CustomLoading';
import NewListings from '../../components/explore/NewListings';
import CustomListingsView from '../../components/explore/CustomListingsView';
import ExploreFilter from '../../components/explore/Filter/ExploreFilter';
import ListListingCard from '../../components/Shared/Cards/ListListingCard';
import ListListings from '../../components/explore/ListListings';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';
import MarkerListing from '../../components/explore/Map View/Marker';
import { configsSelector } from '../../store/feature/configsSlice';
import moment from 'moment';
import Listing_Filter from '../../components/Shared/Listing_Filter';

const CustomListingsPageLayout = () => {
  const [pageCount, setPageCount] = useState(0);
  const [selected_type, setSelected_type] = useState('gallery_view');
  const [selected_marker, setSelected_marker] = useState(null);
  const [coordinates_listings, setCoordinates_listings] = useState(null);

  const router = useRouter();

  const dispatch = useDispatch();
  const { auth_key, first_name } = useSelector(authSelector);

  const { general_configs, MARKETPLACE_MODULES } = useSelector(configsSelector);

  useEffect(() => {
    dispatch(
      getAllListings({
        prams: { ...router.query, status: 2 },
        authKey: auth_key,
      })
    );
  }, [auth_key, dispatch, router]);

  const moreListings = (data) => {
    router.push({
      query: { ...router.query, page: Number(data.selected) + 1 },
    });
  };

  const { listings, total_records, page, isFetching } =
    useSelector(listingSelector);

  useEffect(() => {
    if (listings && listings.length > 0) {
      setCoordinates_listings(
        listings.filter((listing) => listing.coordinates?.latitude != undefined)
      );
    }
  }, [listings]);

  useEffect(() => {
    if (listings && coordinates_listings?.length > 0) {
      setSelected_marker(coordinates_listings[0].coordinates.latitude);
    }
  }, [coordinates_listings]);

  useEffect(() => {
    const totalpage = Math.ceil(total_records / 30);
    if (Number(total_records) > 30) {
      setPageCount(totalpage);
    }
  }, [total_records]);

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const opened_list_view = () => {
    if (MARKETPLACE_MODULES == 2 && !router?.query?.start_at) {
      router.push({
        query: {
          ...router.query,
          start_at: `${moment(new Date()).format('YYYY-MM-DD')}T00:00:00Z`,
          end_at: `${moment(new Date())
            .add(1, 'days')
            .format('YYYY-MM-DD')}T23:59:59Z`,
        },
      });
    }
  };

  return (
    <>
      {isFetching && <CustomLoading />}
      <div>
        <div className=" mb-4 flex items-center justify-between">
          <Listing_Filter hidden_category={false} />
          <CustomListingsView
            selected_type={selected_type}
            setSelected_type={setSelected_type}
          />
        </div>
        {listings === null || listings?.length > 0 ? (
          <div>
            {selected_type == 'gallery_view' && (
              <NewListings Products={listings} />
            )}
            {selected_type == 'list_view' && (
              <>
                {!router?.query?.start_at && opened_list_view()}
                <ListListings Products={listings} />
              </>
            )}
          </div>
        ) : (
          <div className=" w-full h-[200px] mt-5 flex justify-center items-start">
            <div
              className="w-full    md:w-5/6 bg-yellow-500    text-white px-4 py-3 rounded relative grid grid-cols-[5%,80%]"
              role="alert"
            >
              <div className="flex items-center justify-center w-6 ">
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
                <span className="   md:ml-2">
                  No listings found under this page.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12   flex justify-center pb-12 ">
        {listings !== null && (
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
            onPageChange={(data) => moreListings(data)}
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
            nextClassName="relative inline-flex items-center px-2 py-2   border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            breakLinkClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            activeLinkClassName="z-10 bg-primary  border-primary text-white relative inline-flex items-center px-4 py-2 border text-md font-semibold"
            disabledLinkClassName=""
            prevPageRel="2"
            forcePage={page - 1}
          />
        )}
      </div>
    </>
  );
};

export default CustomListingsPageLayout;
