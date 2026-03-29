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
              <li key={index} className="flex items-center cursor-pointer">
                <Link href={list.link} className="text-gray-500 hover:text-primary">
                  {list.name}
                </Link>

                {index !== Number(array?.length - 1) && (
                  <svg
                    className="h-4 w-4 fill-current text-gray-400 mx-3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                  </svg>
                )}
              </li>
            ) : (
              <li key={index} className="flex items-center cursor-text">
                <span className="text-gray-500 hover:text-primary">{list.name}</span>
              </li>
            );
          })}
        </ul>
        {/* End */}
      </div>
    </div>
  );
};

export default Breadcrumb;
