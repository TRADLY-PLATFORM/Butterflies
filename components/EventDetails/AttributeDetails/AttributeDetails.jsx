/* eslint-disable react/prop-types */
import React from 'react';

const AttributeDetails = ({ attributes }) => {
  return (
    <div className=" bg-white rounded  w-full min-h-[66px]    p-[16px]     ">
      <p className="text-[#121212] text-sm  font-semibold leading-4 ">
        Details
      </p>
      <div className="  mt-3 flex flex-col ">
        {attributes?.map((attr) => {
          return (
            <div className="grid grid-cols-2  my-2 " key={attr.id}>
              <p className="ml-2  text-base font-medium text-black">
                {attr.name}
              </p>
              <p className="text-base font-medium text-secondary">
                {attr.values
                  .map((item) => {
                    if (attr.field_type === 1 || attr.field_type === 2) {
                      return item.name;
                    } else if (attr.field_type === 3 || attr.field_type === 4) {
                      return item;
                    }
                  })
                  .join(', ')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttributeDetails;
