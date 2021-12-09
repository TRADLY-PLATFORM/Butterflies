/* eslint-disable react/prop-types */
import React from 'react';

const AccountDescription = ({ account_details }) => {
  const data = [
    // {
    //   title: 'Description',
    //   value: account_details?.description,
    //   extra_style: true,
    // },
    {
      title: 'Categories',
      value: account_details?.categories[0].name,
      extra_style: true,
    },
    {
      title: 'Location',
      value: account_details?.location?.formatted_address || 'N/A',
      extra_style: true,
    },
    { title: 'Total Followers', value: account_details?.total_followers },
    {
      title: 'Total Listings',
      value: account_details?.total_listings,
      extra_style: false,
    },
  ];

  return (
    <div className=" bg-white p-[15px] sm:p-[40px] mt-5 rounded-xl shadow-c-xsm ">
      {data.map((item) => {
        return (
          <div
            key={Math.random()}
            className={[
              ' mb-3',
              item.extra_style
                ? ' xs:flex  xs:items-start'
                : 'flex  items-start',
            ].join(' ')}
          >
            <p className={[" text-gray-900 text-base font-semibold flex items-center"].join(' ')}>
              <p className={item.extra_style?" w-[100px]  xs:w-[200px]":" w-[130px] xs:w-[200px]"}>{item.title}</p>
              <span className="">:</span>
            </p>
            <p className={item.extra_style?" mt-2 ml-8 px-2 xs:ml-4 xs:mt-0  xs:px-0":" text-base ml-4"}>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AccountDescription;
