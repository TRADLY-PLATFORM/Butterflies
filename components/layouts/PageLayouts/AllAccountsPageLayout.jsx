import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  get_all_accounts,
  storeSelector,
} from '../../../store/feature/storeSlice';
import Accounts from '../../AllAccounts/Accounts/Accounts';
import CustomLoading from '../../Shared/Loading/CustomLoading';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/dist/client/router';

const AllAccountsPageLayout = () => {
  const [pageCount, setPageCount] = useState(0);

  const router = useRouter();

  const dispatch = useDispatch();
  const { login, auth_key } = useSelector(authSelector);

  useEffect(() => {
    dispatch(
      get_all_accounts({
        bodyParam: { page: router.query.page, type: 'accounts', per_page: 30 },
        authKey: auth_key,
      })
    );
  }, [auth_key]);

  const moreAccounts = (data) => {
    dispatch(
      get_all_accounts({
        bodyParam: {
          page: Number(data.selected) + 1,
          type: 'accounts',
          per_page: 30,
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
    all_accounts,
    isAllAccountsFetching,
    all_accounts_page,
    all_accounts_total_records,
  } = useSelector(storeSelector);

  useEffect(() => {
    const totalpage = Math.ceil(all_accounts_total_records / 30);
    if (Number(all_accounts_total_records) > 30) {
      setPageCount(totalpage);
    }
  }, [all_accounts_total_records]);

  return (
    <div>
      {isAllAccountsFetching && <CustomLoading />}
      <div>
        {all_accounts?.length > 0 && <Accounts accounts={all_accounts} />}
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
          onPageChange={(data) => moreAccounts(data)}
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
          forcePage={all_accounts_page - 1}
        />
      </div>
    </div>
  );
};

export default AllAccountsPageLayout;
