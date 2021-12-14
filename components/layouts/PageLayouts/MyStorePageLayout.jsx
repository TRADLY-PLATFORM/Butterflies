import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Pagination } from 'swiper';
import { authSelector } from '../../../store/feature/authSlice';
import {
  myAccountListings,
  myStore,
  storeSelector,
} from '../../../store/feature/storeSlice';
import StoreListings from '../../MyStore/MyStoreListings/StoreListings';
import NoProducts from '../../MyStore/NoProducts/NoProducts';
import NoStore from '../../MyStore/NoStore/NoStore';
import StoreProfile from '../../MyStore/StoreProfile/StoreProfile';
import PaginationFunction from '../../Shared/Pagination/Pagination';
import ReactPaginate from 'react-paginate';


const MyStorePageLayout = () => {
  const [pageCount, setPageCount] = useState(0);

  const { auth_key, user_details } = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (auth_key) {
      dispatch(
        myStore({
          prams: {
            page: 1,
            type: 'accounts',
            user_id: user_details.id,
          },
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          dispatch(
            myAccountListings({
              prams: {
                page: router.query.page,
                per_page: 30,
                account_id: res.payload.accounts[0]?.id,
              },
              authKey: auth_key,
            })
          );
        }
      });
    }
  }, [auth_key, user_details, dispatch]);

  const moreListings = (data) => {
    dispatch(
      myAccountListings({
        prams: {
          page: Number(data.selected) + 1,
          per_page: 30,
          account_id: my_stores[0].id,
        },
        authKey: auth_key,
      })
    ).then((res) => {
      if (!res.payload.code) {
        router.push({ query: { page: Number(data.selected) + 1 } });
      }
    });
  };

  const {
    my_stores,
    my_store_listings,
    my_store_listings_page,
    my_store_listings_total_records,
  } = useSelector(storeSelector);

  useEffect(() => {
    if (my_stores?.length > 0) {
      const totalpage = Math.ceil(my_store_listings_total_records / 30);
      if (Number(my_store_listings_total_records) > 30) {
        setPageCount(totalpage);
      }
    }
  }, [my_stores, my_store_listings_total_records]);

  return (
    <div>
      {my_stores !== null &&
        (my_stores.length > 0 ? (
          <div>
            <div>
              <StoreProfile my_stores={my_stores} />
            </div>
            <div className=" mt-6">
              {my_store_listings !== null &&
                (my_store_listings.length > 0 ? (
                  <>
                    <div className=" my-5  flex justify-end">
                      <button
                        className=" px-6 py-2 bg-primary rounded-md text-white text-base "
                        onClick={() =>
                          router.push({
                            pathname: '/a/add-product',
                            query: { account_id: my_stores[0].id },
                          })
                        }
                      >
                        Add Listing
                      </button>
                    </div>
                    <div>
                      <div>
                        <StoreListings
                          my_store_listings={my_store_listings}
                          my_stores={my_stores}
                        />
                      </div>
                      <div className="mt-12 pb-12 flex justify-center ">
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
                          forcePage={my_store_listings_page - 1}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <NoProducts my_stores={my_stores} />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className=" ">
            <NoStore />
          </div>
        ))}
    </div>
  );
};

export default MyStorePageLayout;
