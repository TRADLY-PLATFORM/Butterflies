/* eslint-disable react/prop-types */
import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({ lists }) => {
  return (
    <div className="  py-2   rounded-sm">
      <div className=" ">
        {/* Start */}
        <ul className="inline-flex flex-wrap text-sm font-medium">
          {lists?.map((list, index, array) => {
            console.log(array);
            return index !== Number(array?.length - 1) ? (
              <Link href={list.link} key={index}>
                <li className="flex items-center cursor-pointer">
                  <a
                    className="text-gray-500 hover:text-primary"
                    href={list.link}
                  >
                    {list.name}
                  </a>

                  {index !== Number(array?.length - 1) && (
                    <svg
                      className="h-4 w-4 fill-current text-gray-400 mx-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                    </svg>
                  )}
                </li>
              </Link>
            ) : (
              <li className="flex items-center cursor-text">
                <a className="text-gray-500 hover:text-primary">{list.name}</a>
              </li>
            );
          })}
          {/* <li className="flex items-center">
            <a className="text-gray-500 hover:text-indigo-500" href="#0">
              Home
            </a>
            <svg
              className="h-4 w-4 fill-current text-gray-400 mx-3"
              viewBox="0 0 16 16"
            >
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          </li>
          <li className="flex items-center">
            <a className="text-gray-500 hover:text-indigo-500" href="#0">
              Settings
            </a>
            <svg
              className="h-4 w-4 fill-current text-gray-400 mx-3"
              viewBox="0 0 16 16"
            >
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          </li>
          <li className="flex items-center">
            <a className="text-gray-500 hover:text-indigo-500" href="#0">
              Notifications
            </a>
          </li> */}
        </ul>
        {/* End */}
      </div>
    </div>
  );
};

export default Breadcrumb;
