/* eslint-disable react/prop-types */
import React from 'react';

const AttributeDetails = ({ attributes }) => {
  return (
    <div className=" bg-white rounded  w-full min-h-[66px]    p-[16px] shadow-c-sm  ">
      <p className="text-[#121212] text-sm  font-semibold leading-4 ">
        Details
      </p>
      <div className="  mt-3 flex flex-col ">
        {attributes?.map((attr) => {
          return (
            attr.field_type !== 11 && (
              <div className="grid grid-cols-2  my-2 " key={attr.id}>
                <p className="   text-base font-medium text-black">
                  {attr.name}
                </p>
                <p className="  whitespace-pre-line text-base font-medium text-default_gra overflow-auto">
                  {attr.values
                    .map((item) => {
                      if (attr.field_type === 1 || attr.field_type === 2) {
                        return item.name;
                      } else if (
                        attr.field_type === 3 ||
                        attr.field_type === 4
                      ) {
                        return item;
                      }
                      // else if (attr.field_type === 11) {
                      //   return JSON.stringify(item).length > 50
                      //     ? JSON.stringify(item).substring(0, 50) + '...' +
                      //       (
                      //         <button
                      //           onClick={() => {
                      //             /* Copy the text inside the text field */
                      //             navigator.clipboard.writeText(
                      //               JSON.stringify(item)
                      //             );

                      //             /* Alert the copied text */
                      //             alert('Copied the value');
                      //           }}
                      //           className="text-primary text-sm"
                      //         >
                      //           Copy Value
                      //         </button>
                      //       )
                      //     : JSON.stringify(item);
                      // }
                      else if (attr.field_type === 12) {
                        return `latitude:${item?.latitude}, longitude:${item?.longitude}`;
                      } else {
                        return item;
                      }
                    })
                    .join(', ')}
                </p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default AttributeDetails;
