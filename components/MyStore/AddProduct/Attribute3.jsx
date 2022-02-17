/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { storeSelector } from '../../../store/feature/storeSlice';

import { MultiSelect } from 'react-multi-select-component';

const Attribute3 = ({ attributeData, setAttributeData }) => {
  const { attributes } = useSelector(storeSelector);

  const { my_account_listing_details } = useSelector(storeSelector);

  // state
  const [file, setFile] = useState(null);

  // functions

  const imageUploadClick = () => {
    let fileInput = document.getElementById('attachmentClick');
    fileInput.click();
  };

  const imageUpload = async (e, attribute_id) => {
    setFile(e.target.files[0]);
    if (attributeData !== null) {
      const check = attributeData?.find((attr) => attr.id === attribute_id);
      if (check === undefined) {
        setAttributeData([
          ...attributeData,
          { values: [e.target.files[0]], id: attribute_id, uploadFile: true },
        ]);
      } else {
        const findOut = attributeData.filter(
          (attr) => attr.id !== attribute_id
        );
        setAttributeData([
          ...findOut,
          { values: [e.target.files[0]], id: attribute_id, uploadFile: true },
        ]);
      }
    } else {
      setAttributeData([
        { values: [e.target.files[0]], id: attribute_id, uploadFile: true },
      ]);
    }
  };

  console.log('====================================');
  console.log(attributeData);
  console.log('====================================');

  return (
    <>
      {attributes?.map((attr) => {
        return (
          <>
            <div>
              {/* Field type 1 */}
              {attr.field_type === 1 && (
                <div className="  mt-3 ">
                  <label className="block">
                    <span
                      className={
                        attr.optional
                          ? 'mb-3'
                          : " after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                      }
                    >
                      {' '}
                      {attr.name}
                    </span>
                    <select
                      className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                      onChange={(e) => {
                        attributeData?.length > 0
                          ? setAttributeData([
                              { values: [e.target.value], id: attr.id },
                              ...attributeData.filter(
                                (filter_att) => filter_att.id !== attr.id
                              ),
                            ])
                          : setAttributeData([
                              { values: [e.target.value], id: attr.id },
                            ]);
                      }}
                    >
                      <option selected disabled hidden>
                        Select {attr.name}{' '}
                      </option>
                      {attr.values?.map((value, index) => (
                        <option
                          key={value.id}
                          value={value.id}
                          selected={
                            attributeData?.filter(
                              (atData) => atData.id === attr.id
                            )[0]?.values[0] == value.id
                              ? true
                              : false
                          }
                        >
                          {value.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              {/* Field type 2*/}
              {attr.field_type === 2 && (
                <div className="  mt-3 ">
                  <label
                    className={
                      attr.optional
                        ? ''
                        : "after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                    }
                  >
                    {attr.name}
                  </label>
                  <MultiSelect
                    options={attr.values?.map((value, index) => {
                      return {
                        value: value.id,
                        label: value.name,
                      };
                    })}
                    value={
                      attributeData
                        ?.filter((single_at) => single_at.id == attr.id)[0]
                        ?.values?.map((vl) => {
                          return {
                            value: attr.values?.filter(
                              (a_vl) => vl == a_vl.id
                            )[0].id,
                            label: attr.values?.filter(
                              (a_vl) => vl == a_vl.id
                            )[0].name,
                          };
                        }) || []
                    }
                    onChange={(e) => {
                      attributeData?.length > 0
                        ? e.length > 0
                          ? setAttributeData([
                              {
                                id: attr.id,
                                values: e.map(
                                  (singleValue) => singleValue.value
                                ),
                              },
                              ...attributeData.filter(
                                (filter_att) => filter_att.id !== attr.id
                              ),
                            ])
                          : setAttributeData([
                              ...attributeData.filter(
                                (filter_att) => filter_att.id !== attr.id
                              ),
                            ])
                        : setAttributeData([
                            {
                              id: attr.id,
                              values: e.map((singleValue) => singleValue.value),
                            },
                          ]);
                    }}
                    labelledBy="Select"
                  />
                </div>
              )}

              {/* Field type 3 */}
              {attr.field_type === 3 && (
                <div className="  mt-3 ">
                  <label className="block">
                    <span
                      className={
                        attr.optional
                          ? ''
                          : "after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                      }
                    >
                      {' '}
                      {attr.name}
                    </span>
                    <input
                      value={
                        attributeData?.filter(
                          (atData) => atData.id === attr.id
                        )[0]?.values[0]
                      }
                      type="text"
                      className="
                    mt-0
                    block
                    w-full
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                      placeholder={'Type your' + ' ' + attr.name}
                      onChange={(e) => {
                        attributeData?.length > 0
                          ? e.target.value.replace(/ /g, '').length > 0
                            ? setAttributeData([
                                { values: [e.target.value], id: attr.id },
                                ...attributeData.filter(
                                  (filter_att) => filter_att.id !== attr.id
                                ),
                              ])
                            : setAttributeData([
                                ...attributeData.filter(
                                  (filter_att) => filter_att.id !== attr.id
                                ),
                              ])
                          : setAttributeData([
                              { values: [e.target.value], id: attr.id },
                            ]);
                      }}
                    />
                  </label>
                </div>
              )}

              {/* Field type 4*/}
              {attr.field_type === 4 && (
                <div className=" mt-3 ">
                  <label className="block">
                    <span
                      className={
                        attr.optional
                          ? ''
                          : "after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                      }
                    >
                      {' '}
                      {attr.name}
                    </span>
                    <input
                      value={attributeData
                        ?.filter((atData) => atData.id === attr.id)[0]
                        ?.values.toString()}
                      type="text"
                      className="
                    mt-0
                    block
                    w-full
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                      placeholder={'By "," you can write multiple value '}
                      onChange={(e) => {
                        attributeData?.length > 0
                          ? e.target.value.replace(/ /g, '').length > 0
                            ? setAttributeData([
                                {
                                  values: e.target.value.split(','),
                                  id: attr.id,
                                },
                                ...attributeData.filter(
                                  (filter_att) => filter_att.id !== attr.id
                                ),
                              ])
                            : setAttributeData([
                                ...attributeData.filter(
                                  (filter_att) => filter_att.id !== attr.id
                                ),
                              ])
                          : setAttributeData([
                              {
                                values: e.target.value.split(','),
                                id: attr.id,
                              },
                            ]);
                      }}
                    />
                  </label>
                </div>
              )}

              {/* Field type 5 */}
              {attr.field_type === 5 &&
                (file === null ? (
                  <div className="mt-6">
                    <div>
                      <div className=" h-0 overflow-hidden">
                        <input
                          type="file"
                          id="attachmentClick"
                          name="imageUpload"
                          accept="image/*"
                          onChange={(e) => imageUpload(e, attr.id)}
                        />
                      </div>
                      <button
                        className=" flex flex-col items-center justify-center w-full p-3 border-2 border-dashed border-primary  "
                        onClick={imageUploadClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-9 w-9"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p
                          className={
                            attr.optional
                              ? ''
                              : "after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                          }
                        >
                          Upload Attachment Image
                        </p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className=" mt-5 grid grid-cols-[20%,70%,10%;] xs:grid-cols-[10%,70%,20%] items-center px-[10px] py-[5px] border-2 border-primary rounded-md">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className=" flex flex-col text-base  ">
                      <span>{file.name}</span>
                      <span>{file.type}</span>
                    </div>
                    <div
                      className="flex justify-end cursor-pointer"
                      onClick={() => setFile(null)}
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
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Attribute3;
