/* eslint-disable @typescript-eslint/no-var-requires */
import { Router, useRouter } from 'next/dist/client/router';
import { route } from 'next/dist/server/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../../store/feature/authSlice';
import { get_orders } from '../../../../store/feature/store_orderSlice';
import { options } from '../../../Shared/Constant/Status';
var slugify = require('slugify');

const OrdersFilter = () => {
  const dispatch = useDispatch();
  const { auth_key } = useSelector(authSelector);
  const router = useRouter();
  const accountId = router.query.store_id;

  const changeFilter = (e) => {
     const separate = e.target.value.split('-');

 
    if (separate[0] === '0') {
      router.push({
        pathname: '/a/orders',
        query: { store_id: accountId, page: router.query.page },
      });
    } else {
      router.push({
         query: {
          store_id: accountId,
          order_status: slugify(`${separate[1]}`),
          page: router.query.page,
        },
      });
    }
  };
  return (
    <div>
      <label className="flex justify-center items-center ">
        <span className="text-[#77869E]   text-sm sm:text-lg mr-4">
          Filter by :
        </span>
        <select
          className="
                    block
                      w-[150px] sm:w-[250px]
                    mt-1
                    rounded-lg
                    bg-white
                    border-transparent
                    focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50
                  "
          onChange={(e) => changeFilter(e)}
        >
          <option hidden selected disabled>
            Filter by status
          </option>
          {options?.map((item) => {
            return (
              <option
                selected={
                  router.query.order_status === slugify(item.label)
                    ? true
                    : false
                }
                key={Math.random()}
                value={`${item.id}-${item.value}`}
              >
                {item.label}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default OrdersFilter;
