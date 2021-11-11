/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  getAddressSearch,
  storeSelector,
} from '../../../store/feature/storeSlice';

const SearchAddress = ({
  setCoordinates,
  addressSearchKey,
  setAddressSearchKey,
}) => {
  const [showAddresses, setShowAddresses] = useState(false);
  const dispatch = useDispatch();
  const { auth_key, first_name } = useSelector(authSelector);
  const onChangeSearchKey = (e) => {
    setAddressSearchKey(e.target.value);
    dispatch(
      getAddressSearch({
        searchKey: e.target.value,
        authKey: auth_key,
      })
    );
    setCoordinates(null);
    setShowAddresses(true);
  };
  const { search_addresses, addressFetching } = useSelector(storeSelector);

  return (
    <>
      <div className=" relative">
        <input
          value={addressSearchKey}
          type="text"
          className="
                    mt-0
                    block
                    w-full
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
          placeholder=" "
          onChange={(e) => onChangeSearchKey(e)}
        />
        <div className=" absolute bottom-0 right-0 mb-2 ">
          {addressSearchKey === '' ? (
            <span>
              {addressFetching ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </span>
          ) : addressFetching ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <button
              className=" flex  text-primary  items-end"
              onClick={() => {
                setAddressSearchKey('');
                setCoordinates(null);
                setShowAddresses(false);
              }}
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {showAddresses && !addressFetching && (
          <div className=" w-full h-[200px] bg-gray-200 overflow-y-scroll border  rounded-md mt-2 absolute ring ring-offset-2 ring-primary ring-opacity-60 z-10">
            {search_addresses?.length > 0 ? (
              search_addresses?.map((address) => {
                return (
                  <div
                    key={Math.random()}
                    className=" flex  text-black p-2 cursor-pointer border border-transparent rounded-md hover:border-primary mt-2 "
                    onClick={() => {
                      return (
                        setAddressSearchKey(address.formatted_address),
                        setCoordinates({
                          latitude: address.latitude,
                          longitude: address.longitude,
                        }),
                        setShowAddresses(false)
                      );
                    }}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className=" text-sm  font-normal ml-2">
                      {address.formatted_address}
                    </span>
                  </div>
                );
              })
            ) : (
              <div
                className=" bg-yellow-400   text-white px-4 py-3 rounded relative grid grid-cols-[10%,80%,10%]"
                role="alert"
              >
                <div className="flex items-center justify-center">
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
                <div>
                  <strong className="font-bold">
                    {first_name ? 'Hi' + '  ' + first_name : 'Hi Guess !'}
                  </strong>
                  <span className="  ml-2"> No address found</span>
                </div>
                <div
                  className="flex items-center justify-center"
                  onClick={() => {
                    setAddressSearchKey('');
                    setCoordinates(null);
                    setShowAddresses(false);
                  }}
                >
                  <svg
                    className="fill-current h-6 w-6 text-white"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchAddress;
