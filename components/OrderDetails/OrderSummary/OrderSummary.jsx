/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  changeOrderStatus,
  get_order_details,
  orderSelector,
} from '../../../store/feature/orderSlice';
import { changeDateFormat } from '../../Shared/Constant/Constant';
import { changeStatus, orderStatus } from '../../Shared/Constant/Status';
import CustomLoading from '../../Shared/Loading/CustomLoading';

const OrderSummary = ({
  order_details,
  setShowError,
  setError_message,
  setShowSuccess,
  setSuccess_message,
}) => {
  const dispatch = useDispatch();
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
          const status = 'Status changed';
          setShowSuccess(true);
          setSuccess_message(`Order ${status}`);
          dispatch(
            get_order_details({
              authKey: auth_key,
              id: order_details.id,
            })
          );
        }
      });
    }
  };

  const { isChangeStatusFetching } = useSelector(orderSelector);

  return (
    <div>
      {isChangeStatusFetching && <CustomLoading />}
      <div className="w-full h-min-[300px] bg-white  shadow-c-sm rounded-lg p-[30px] border-opacity-40">
        <div className="flex justify-between items-center">
          <p className=" text-lg text-black font-semibold   ">Order Summary</p>
          <p className="     rounded-lg text-primary font-semibold">
            {orderStatus(order_details?.order_status)}
          </p>
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
        </div>
      </div>
      <div className="w-full h-min-[100px] bg-white  shadow-c-sm rounded-lg py-[20px] px-[30px] border-opacity-40 flex  justify-between items-center mt-5">
        <span className=" text-lg text-primary font-semibold">
          Change Status:
        </span>
        <select
          className="
                   block
                      w-[50%] sm:w-[50%]
                    
                    rounded-lg
                    
                    border-primary
                     text-primary
                  "
          onChange={(e) => status_change(e, order_details)}
        >
          <option value={false} selected hidden>
            Change Status
          </option>
          {order_details?.next_status.length > 0 ? (
            order_details?.next_status.map((status) => {
              return (
                <option key={Math.random()} value={status}>
                  {changeStatus(status)}
                </option>
              );
            })
          ) : (
            <option disabled>No status for change</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default OrderSummary;
