/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { storeSelector } from '../../../store/feature/storeSlice';

import { MultiSelect } from 'react-multi-select-component';
import Editor from 'rich-markdown-editor';
import debounce from 'lodash/debounce';

const Attribute3 = ({ attributeData, setAttributeData }) => {
  const { attributes } = useSelector(storeSelector);

  const { my_account_listing_details } = useSelector(storeSelector);

  // state
  const [file, setFile] = useState(null);

  // functions

  const imageUploadClick = (id) => {
    let fileInput = document.getElementById(`attachmentClick-${id}`);
    fileInput.click();
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
                <div className="  mt-6 ">
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
                              { values: [e.target.value], id: attr?.id },
                              ...attributeData?.filter(
                                (filter_att) => filter_att?.id !== attr?.id
                              ),
                            ])
                          : setAttributeData([
                              { values: [e.target.value], id: attr?.id },
                            ]);
                      }}
                    >
                      <option selected disabled hidden>
                        Select {attr.name}{' '}
                      </option>
                      {attr.values?.map((value, index) => (
                        <option
                          key={value?.id}
                          value={value?.id}
                          selected={
                            attributeData?.filter(
                              (atData) => atData?.id === attr?.id
                            )[0]?.values[0] == value?.id
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
                <div className="  mt-6 ">
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
                        value: value?.id,
                        label: value.name,
                      };
                    })}
                    value={
                      attributeData
                        ?.filter((single_at) => single_at?.id == attr?.id)[0]
                        ?.values?.map((vl) => {
                          return {
                            value: attr.values?.filter(
                              (a_vl) => vl == a_vl?.id
                            )[0]?.id,
                            label: attr.values?.filter(
                              (a_vl) => vl == a_vl?.id
                            )[0].name,
                          };
                        }) || []
                    }
                    onChange={(e) => {
                      attributeData?.length > 0
                        ? e.length > 0
                          ? setAttributeData([
                              {
                                id: attr?.id,
                                values: e.map(
                                  (singleValue) => singleValue.value
                                ),
                              },
                              ...attributeData?.filter(
                                (filter_att) => filter_att?.id !== attr?.id
                              ),
                            ])
                          : setAttributeData([
                              ...attributeData?.filter(
                                (filter_att) => filter_att?.id !== attr?.id
                              ),
                            ])
                        : setAttributeData([
                            {
                              id: attr?.id,
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
                <div className="  mt-6 ">
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
                          (atData) => atData?.id === attr?.id
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
                                { values: [e.target.value], id: attr?.id },
                                ...attributeData?.filter(
                                  (filter_att) => filter_att?.id !== attr?.id
                                ),
                              ])
                            : setAttributeData([
                                ...attributeData?.filter(
                                  (filter_att) => filter_att?.id !== attr?.id
                                ),
                              ])
                          : setAttributeData([
                              { values: [e.target.value], id: attr?.id },
                            ]);
                      }}
                    />
                  </label>
                </div>
              )}

              {/* Field type 4*/}
              {attr.field_type === 4 && (
                <div className=" mt-6 ">
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
                        ?.filter((atData) => atData?.id === attr?.id)[0]
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
                                  id: attr?.id,
                                },
                                ...attributeData?.filter(
                                  (filter_att) => filter_att?.id !== attr?.id
                                ),
                              ])
                            : setAttributeData([
                                ...attributeData?.filter(
                                  (filter_att) => filter_att?.id !== attr?.id
                                ),
                              ])
                          : setAttributeData([
                              {
                                values: e.target.value.split(','),
                                id: attr?.id,
                              },
                            ]);
                      }}
                    />
                  </label>
                </div>
              )}

              {/* Field type 5 */}
              {attr.field_type === 5 && (
                <>
                  <label className="block mt-6">
                    <span
                      className={
                        attr.optional
                          ? ''
                          : "after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                      }
                    >
                      {attr.name}
                    </span>{' '}
                  </label>{' '}
                  {!attributeData?.filter(
                    (at_filter) => attr?.id == at_filter?.id
                  ).length > 0 ? (
                    <div className="mt-2">
                      <div>
                        <div className=" h-0 overflow-hidden">
                          <input
                            type="file"
                            id={`attachmentClick-${attr?.id}`}
                            name="imageUpload"
                            accept="image/*"
                            onChange={(e) => {
                              attributeData?.length > 0
                                ? setAttributeData([
                                    {
                                      values: [e.target.files[0]],
                                      id: attr?.id,
                                      uploadFile: true,
                                    },
                                    ...attributeData?.filter(
                                      (filter_att) =>
                                        filter_att?.id !== attr?.id
                                    ),
                                  ])
                                : setAttributeData([
                                    {
                                      values: [e.target.files[0]],
                                      id: attr?.id,
                                      uploadFile: true,
                                    },
                                  ]);
                            }}
                          />
                        </div>
                        <button
                          className=" flex flex-col items-center justify-center w-full p-3 border-2 border-dashed border-primary  "
                          onClick={() => imageUploadClick(attr?.id)}
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
                            Upload Attachment
                          </p>
                        </button>
                      </div>
                    </div>
                  ) : attributeData?.filter(
                      (at_filter) => attr?.id == at_filter?.id
                    )[0].uploadFile ? (
                    <div className=" mt-2  flex flex-col items-center px-[10px] py-[5px] border-2 border-dashed border-primary rounded-md">
                      <div className=" flex flex-col text-base  ">
                        <span>
                          {
                            attributeData?.filter(
                              (at_filter) => attr?.id == at_filter?.id
                            )[0].values[0].name
                          }
                        </span>
                      </div>
                      <div
                        className="flex justify-end cursor-pointer text-red-500 mt-2"
                        onClick={() =>
                          setAttributeData([
                            ...attributeData?.filter(
                              (filter_att) => filter_att?.id !== attr?.id
                            ),
                          ])
                        }
                      >
                        Cancel
                      </div>
                    </div>
                  ) : (
                    <div className=" mt-2  flex flex-col items-center px-[10px] py-[5px] border-2 border-dashed border-primary rounded-md">
                      <div className=" flex flex-col text-base  ">
                        <span>
                          {
                            attributeData
                              ?.filter(
                                (at_filter) => attr?.id == at_filter?.id
                              )[0]
                              .values[0].split('/')
                              .reverse()[0]
                          }
                        </span>
                      </div>
                      <div
                        className="flex justify-end cursor-pointer text-red-500 mt-2"
                        onClick={() =>
                          setAttributeData([
                            ...attributeData?.filter(
                              (filter_att) => filter_att?.id !== attr?.id
                            ),
                          ])
                        }
                      >
                        Cancel
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Field type 6 */}
              {attr.field_type === 6 && (
                <label className="block mt-6">
                  <span
                    className={
                      attr.optional
                        ? ''
                        : "after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                    }
                  >
                    {attr.name}
                  </span>
                  <article className="prose  prose-red	">
                    <Editor
                      className="event
                    relative mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    hover:ring-0 hover:border-primary

                  "
                      defaultValue={
                        attributeData?.filter(
                          (atData) => atData?.id === attr?.id
                        )[0]?.values[0] || ''
                      }
                      onChange={debounce((value) => {
                        const text = value();
                        attributeData?.length > 0
                          ? text.replace(/ /g, '').length > 0
                            ? setAttributeData([
                                { values: [text], id: attr?.id },
                                ...attributeData?.filter(
                                  (filter_att) => filter_att?.id !== attr?.id
                                ),
                              ])
                            : setAttributeData([
                                ...attributeData?.filter(
                                  (filter_att) => filter_att?.id !== attr?.id
                                ),
                              ])
                          : setAttributeData([
                              { values: [text], id: attr?.id },
                            ]);
                      }, 250)}
                      tooltip={'right'}
                      placeholder="Write from here"
                      style={{
                        height: '150px',
                        overflow: 'auto',
                        justifyContent: 'start',
                      }}
                    />
                  </article>
                </label>
              )}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Attribute3;
