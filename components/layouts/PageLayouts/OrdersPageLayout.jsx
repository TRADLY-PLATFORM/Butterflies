import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { get_orders, orderSelector } from '../../../store/feature/orderSlice';
import NoOrdersItem from '../../orders/NoOrdersItem/NoOrdersItem';
import OrdersFilter from '../../orders/OrdersFilter/OrdersFilter';
import OrdersItem from '../../orders/OrdersItem/OrdersItem';
import { filter_id, filter_name } from '../../Shared/Constant/Status';
import CustomLoading from '../../Shared/Loading/CustomLoading';

const OrdersPageLayout = () => {
  const [pageCount, setPageCount] = useState(0);

  const dispatch = useDispatch();
  const { auth_key } = useSelector(authSelector);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('auth_key')) {
      if (router.query.order_status) {
        dispatch(
          get_orders({
            authKey: auth_key,
            bodyParam: {
              page: router.query.page,
              per_page: 30,
              order_status: filter_id(router.query.order_status),
            },
          })
        );
      } else {
        dispatch(
          get_orders({
            authKey: auth_key,
            bodyParam: {
              page: router.query.page,
              per_page: 30,
            },
          })
        );
      }
    } else {
      router.push('/');
    }
  }, [auth_key, router.query]);
  const { orders, total_records, page, isFetching } =
    useSelector(orderSelector);

  useEffect(() => {
    const totalpage = Math.ceil(total_records / 30);
    if (page === 1 && total_records === 0) {
      setPageCount(total_records);
    }
    if (Number(total_records) > 30) {
      setPageCount(totalpage);
    }
  }, [total_records]);

  const moreOrders = (data) => {
    if (router.query.order_status) {
      router.push({
        query: {
          page: Number(data.selected) + 1,
          order_status: filter_name(router.query.order_status),
        },
      });
    } else {
      router.push({
        query: {
          page: Number(data.selected) + 1,
        },
      });
    }
  };

  return (
    <div className=" mt-4">
      {isFetching && <CustomLoading />}
      <div className=" grid  grid-cols-[25%,75%]   sm:grid-cols-[35%,65%] xl:grid-cols-[50%,50%] 2xl:grid-cols-[50%,50%]  mb-11 items-center">
        <h2 className="  text-xl sm:text-3xl   font-bold text-[#042C5C] leading-10">
          Orders
        </h2>
        <div className=" flex justify-end">
          <OrdersFilter />
        </div>
        {/* <div className=" hidden  xl:flex justify-end">
					<OrdersSearchBox />
				</div> */}
      </div>
      {orders === null || orders.length > 0 ? (
        <div>
          <OrdersItem orders={orders} />
        </div>
      ) : (
        <div>
          <NoOrdersItem />
        </div>
      )}
      <div className="mt-12   flex justify-center pb-12 ">
        {orders !== null && (
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
            onPageChange={(data) => moreOrders(data)}
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
  );
};

export default OrdersPageLayout;
