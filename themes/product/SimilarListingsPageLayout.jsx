import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import {
  clearListings,
  getAllListings,
  listingLike,
  listingSelector,
} from '../../store/feature/listingSlice';
import Listings from '../../components/Listings/Listings';
import ReactPaginate from 'react-paginate';
import CustomLoading from '../../components/Shared/Loading/CustomLoading';
import NewListings from '../../components/Listings/NewListings';
import Filter from '../../components/Listings/Filter/Filter';
import tradly from 'tradly';
import { check_login } from '../../components/../constant/check_auth';
import axios from 'axios';
import Listing_Filter from '../../components/Shared/Listing_Filter';

const SimilarListingsPageLayout = () => {
  const [pageCount, setPageCount] = useState(0);
  const [similar_listings, setSimilarListings] = useState(null);
  const [page, setPage] = useState(1);
  const [total_records, setTotal_records] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const { login, auth_key, first_name } = useSelector(authSelector);

  useEffect(() => {
    setIsFetching(true);
    axios.get('/api/l/similar', { params: router.query }).then((res) => {
      setIsFetching(false);
      setSimilarListings(res.data.listings);
      setPage(res.data.page);
      setTotal_records(res.data.total_records);
    });
  }, [auth_key, dispatch, router]);

  const moreListings = (data) => {
    router.push({
      query: { ...router.query, page: Number(data.selected) + 1 },
    });
  };

  useEffect(() => {
    if (total_records) {
      const totalpage = Math.ceil(total_records / 30);
      if (Number(total_records) > 30) {
        setPageCount(totalpage);
      }
    }
  }, [total_records]);

  //Like listing
  const like = (id, isLiked) => {
    if (check_login(router)) {
      setIsFetching(true);
      dispatch(
        listingLike({
          id: id,
          isLiked: isLiked,
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          axios.get('/api/l/similar', { params: router.query }).then((res) => {
            setSimilarListings(res.data.listings);
            setPage(res.data.page);
            setTotal_records(res.data.total_records);
            setIsFetching(false);
          });
        }
      });
    }
  };

  //reset_filter
  const reset_filter = () => {
    router.push({
      query: {
        id: router.query.id,
        page: router.query.page,
      },
    });
  };

  return (
    <>
      {isFetching && <CustomLoading />}
      <div>
        <div className=" mb-8 ">
          <Listing_Filter hidden_category={false} reset_filter={reset_filter} />
        </div>
        {similar_listings === null || similar_listings?.length > 0 ? (
          <div>
            <NewListings Products={similar_listings} like_listing={like} />
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
        {similar_listings !== null && (
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

export default SimilarListingsPageLayout;
