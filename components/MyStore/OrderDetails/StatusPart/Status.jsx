/* eslint-disable react/prop-types */
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../store/feature/authSlice';
import { changeOrderStatus, get_order_details, store_orderSelector } from '../../../../store/feature/store_orderSlice';
import { changeStatus } from '../../../Shared/Constant/Status';
import CustomLoading from '../../../Shared/Loading/CustomLoading';

const Status = ({
  order_details,
  setShowError,
  setError_message,
  setShowSuccess,
  setSuccess_message,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth_key } = useSelector(authSelector);
  const status_change = (e, order_details) => {
    if (e.target.value !== false) {
      if (Number(e.target.value) !== 17) {
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
                bodyParam: { account_id: router.query.store_id },
              })
            );
          }
        });
      } else {
        if (Object.keys(order_details?.pickup_address).length === 0) {
          setShowError(true);
          setError_message('Set a pickup Address');
        } else {
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
                  bodyParam: { account_id: router.query.store_id },
                })
              );
            }
          });
        }
      }
    }
  };
  const { isChangeStatusFetching } = useSelector(store_orderSelector);
  return (
    <div>
      {isChangeStatusFetching && <CustomLoading />}
      <div className="w-full h-min-[100px] bg-white  shadow-c-sm rounded-lg py-5 px-[30px] border-opacity-40 flex justify-between items-center mt-5">
        <span className=" text-lg text-primary font-semibold">
          Change Order Status:
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

export default Status;