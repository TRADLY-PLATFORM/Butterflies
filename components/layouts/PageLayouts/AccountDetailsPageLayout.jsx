import { Router, useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import tradly from 'tradly';
import { authSelector } from '../../../store/feature/authSlice';
import AccountDescription from '../../AccountDetails/AccountDescription/AccountDescription';
import AccountListingsItem from '../../AccountDetails/AccountListings/AccountListingsItem';
import AccountProfile from '../../AccountDetails/AccountProfile/AccountProfile';
import CustomLoading from '../../Shared/Loading/CustomLoading';

const AccountDetailsPageLayout = () => {
  const [account_details, setAccount_details] = useState(null);
  const [listings, setListings] = useState(null);
  const [page, setPage] = useState(null);
  const [total_records, setTotal_records] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState();

  const router = useRouter();
  const { auth_key } = useSelector(authSelector);

  useEffect(() => {
    tradly.app
      .commonFuntion({
        path: `/v1/accounts/${router.query.id.split('-')[0]}`,
        bodyParam: '',
        authKey: auth_key,
        Method: 'Get',
      })
      .then((res) => {
        if (!res.error) {
          setAccount_details(res.data.account);
        }
      });
  }, [router.query]);

  useEffect(() => {
    if (account_details?.id) {
      tradly.app
        .getListings({
          bodyParam: { page: 1, per_page: 30, account_id: account_details.id },
          authKey: auth_key,
        })
        .then((res) => {
          if (!res.error) {
            setListings(res.data.listings);
            setPage(res.data.page);
            setTotal_records(res.data.total_records);
          }
        });
    }
  }, [account_details]);

  const moreListings = (data) => {
    router.push(
      {
        query: { id: router.query.id, page: Number(data.selected) + 1 },
      },
      { shallow: true }
    );

    useEffect(() => {
      const totalpage = Math.ceil(total_records / 30);
      if (page === 1 && total_records === 0) {
        setPageCount(total_records);
      }
      if (Number(total_records) > 30) {
        setPageCount(totalpage);
      }
    }, [total_records]);
  };

  return (
    <div>
      {isDataLoading && <CustomLoading />}
      {account_details !== null && (
        <div>
          <div>
            <AccountProfile
              account_details={account_details}
              setAccount_details={setAccount_details}
              setIsDataLoading={setIsDataLoading}
            />
          </div>
          <div>
            <AccountDescription account_details={account_details} />
          </div>

          <div className="py-5">
            {listings === null || listings?.length > 0 ? (
              <div>
                <AccountListingsItem
                  Products={listings}
                  setAccount_details={setAccount_details}
                  setIsDataLoading={setIsDataLoading}
                />
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
                    <span className="  ml-2">
                      No listings found under this page.
                    </span>
                  </div>
                </div>
              </div>
            )}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetailsPageLayout;
