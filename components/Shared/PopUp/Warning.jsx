/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';

const Warning = ({ message, closePopUP }) => {
  const { first_name } = useSelector(authSelector);
  const type = [
    { error: ' bg-red-100  border-red-400 text-red-500' },
    { success: 'bg-green-100  border-green-400 text-green-500' },
  ];
  return (
    <div
      className=" bg-yellow-500    text-white px-4 py-3 rounded relative grid grid-cols-[10%,80%,10%]"
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
        <span className="  ml-2">{message}</span>
      </div>
      <div className="flex items-center justify-center" onClick={closePopUP}>
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
  );
};

export default Warning;
