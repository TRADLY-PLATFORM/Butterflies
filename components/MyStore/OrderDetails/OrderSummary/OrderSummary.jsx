/* eslint-disable react/prop-types */
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../../store/feature/authSlice';
import {
  changeOrderStatus,
  get_order_details,
} from '../../../../store/feature/store_orderSlice';

import { changeDateFormat } from '../../../Shared/Constant/Constant';
import { changeStatus, orderStatus } from '../../../Shared/Constant/Status';

const OrderSummary = ({ order_details }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth_key } = useSelector(authSelector);
  const status_change = (e, order_details) => {
    if (e.target.value !== false) {
      dispatch(
        changeOrderStatus({
          authKey: auth_key,
          id: order_details.id,
          sendData: {
            order: {
              status: Number(e.target.value),
            },
          },
        })
      ).then((res) => {
        if (!res.payload.code) {
          dispatch(
            get_order_details({
              authKey: auth_key,
              id: order_details.id,
              bodyParam: { account_id: router.query.store_id },
            })
          );
        }
      });
    }
  };
  return (
    <div className="w-full h-min-[300px] bg-white  shadow-c-sm rounded-lg p-[30px] border-opacity-40">
      <div className="flex justify-between items-center">
        <p className=" text-lg text-black font-semibold   ">Order Summary</p>
        <button className=" bg-gray-200  px-6 py-2 rounded-lg text-primary font-semibold">
          {orderStatus(order_details?.order_status)}
        </button>
      </div>
      <div>
        <div className=" flex justify-between items-center py-4  ">
          <p className=" text-sm text-black font-semibold  ">Order Created</p>
          <p className=" text-sm text-black font-semibold   text-opacity-70">
            {changeDateFormat(order_details?.created_at, 'DD/MM/YYYY')}
          </p>
        </div>
        <div className=" flex justify-between items-center py-4  ">
          <p className=" text-sm text-black font-semibold  ">Order Time</p>
          <p className=" text-sm text-black font-semibold   text-opacity-70">
            {changeDateFormat(order_details?.created_at, 'hh:mm A')}
          </p>
        </div>
        <div className=" flex justify-between items-center py-4  ">
          <p className=" text-sm text-black font-semibold  ">Subtotal</p>
          <p className=" text-sm text-black font-semibold flex items-center  ">
            <span className=" text-xs text-opacity-70 font-normal">
              {order_details?.list_total.currency}
            </span>
            <span className=" ml-[6px] text-opacity-80">
              {order_details?.list_total.amount}
            </span>
          </p>
        </div>
        <div className=" flex justify-between items-center py-4  ">
          <p className=" text-sm text-black font-semibold  ">Delivery Fee</p>
          <p className=" text-sm text-black font-semibold    text-opacity-70 flex items-center flex-wrap">
            <span className="text-xs text-opacity-70 font-normal">
              {order_details?.shipping_total.currency}
            </span>
            <span className="ml-[6px]">
              {order_details?.shipping_total.amount}
            </span>
          </p>
        </div>
      </div>
      <div className=" flex justify-center items-center mt-3">
        {/* <button className="bg-primary px-2 py-2 rounded-md text-white">
					View Order History
				</button> */}

        <select
          className="
                    block
                      w-[90%] sm:w-[80%]
                    
                    rounded-lg
                    
                    border-primary
                     text-primary
                  "
          onChange={(e) => status_change(e, order_details)}
        >
          <option value={false} selected>
            Change Status
          </option>
          {order_details?.next_status.map((status) => {
            return (
              <option key={Math.random()} value={status}>
                {changeStatus(status)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default OrderSummary;
