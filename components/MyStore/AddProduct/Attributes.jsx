/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storeSelector } from '../../../store/feature/storeSlice';
import Markdown_Editor from '../../Shared/MarkdownEditor';
import { MultiSelect } from 'react-multi-select-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Switch } from '@headlessui/react';
import { SketchPicker, PhotoshopPicker } from 'react-color';
import OutsideClickHandler from 'react-outside-click-handler';
import Address_search from '../../Shared/Address_search';

const Attributes = ({ attributeData, setAttributeData }) => {
  const { attributes } = useSelector(storeSelector);

  const [displayColorPicker, setdisplayColorPicker] = useState(null);
  const [displayMap, setdisplayMap] = useState(null);

  // functions

  const fileUploadClick = (id) => {
    let fileInput = document.getElementById(`fileUploadClick-${id}`);
    fileInput.click();
  };

  //const containerStyle for map

  const containerStyle = {
    width: '100%',
    height: '100%',
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
                    (at_filter) => attr.id == at_filter.id
                  ).length > 0 ? (
                    <div className="mt-2">
                      <div>
                        <div className=" h-0 overflow-hidden">
                          <input
                            type="file"
                            id={`fileUploadClick-${attr.id}`}
                            name="imageUpload"
                            onChange={(e) => {
                              attributeData?.length > 0
                                ? setAttributeData([
                                    {
                                      values: [e.target.files[0]],
                                      id: attr.id,
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
                                      id: attr.id,
                                      uploadFile: true,
                                    },
                                  ]);
                            }}
                          />
                        </div>
                        <button
                          className=" flex flex-col items-center justify-center w-full p-3 border-2 border-dashed border-primary  "
                          onClick={() => fileUploadClick(attr.id)}
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
                      (at_filter) => attr.id == at_filter.id
                    )[0].uploadFile ? (
                    <div className=" mt-2  flex flex-col items-center px-[10px] py-[5px] border-2 border-dashed border-primary rounded-md">
                      <div className=" flex flex-col text-base  ">
                        <span>
                          {
                            attributeData?.filter(
                              (at_filter) => attr.id == at_filter.id
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
                                (at_filter) => attr.id == at_filter.id
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
                  <Markdown_Editor
                    oldValue={
                      attributeData?.filter(
                        (atData) => atData?.id === attr?.id
                      )[0]?.values[0] || ' '
                    }
                    setMarkdownValue={(text) => {
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
                        : setAttributeData([{ values: [text], id: attr?.id }]);
                    }}
                  />
                </label>
              )}

              {/* Field type 7 */}
              {attr.field_type === 7 && (
                <div className="  mt-6 ">
                  <label className="block">
                    <span
                      className={
                        attr.optional
                          ? 'mb-3'
                          : " after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                      }
                    >
                      {attr.name}
                    </span>
                    <DatePicker
                      selected={
                        attributeData
                          ?.filter((atData) => atData?.id === attr?.id)[0]
                          ?.values.toString()
                          ? moment(
                              attributeData
                                ?.filter((atData) => atData?.id === attr?.id)[0]
                                ?.values.toString()
                            ).toDate()
                          : null
                      }
                      placeholderText="Set date and time"
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm:ss"
                      showTimeInput={true}
                      className="
                    mt-0
                    block
                    w-full
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                      onChange={(date) => {
                        attributeData?.length > 0
                          ? date
                            ? setAttributeData([
                                {
                                  values: [
                                    moment(date).format('yyyy-MM-DD HH:mm:ss'),
                                  ],
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
                                values: [
                                  moment(date).format('yyyy-MM-DD HH:mm:ss'),
                                ],
                                id: attr?.id,
                              },
                            ]);
                      }}
                    />
                  </label>
                </div>
              )}

              {/* Field type 8 */}

              {attr.field_type === 8 && (
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
                      type="number"
                      className="
                    mt-0
                    block
                    w-full
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                      placeholder={'1234'}
                      onChange={(e) => {
                        attributeData?.length > 0
                          ? e.target.value.replace(/ /g, '').length > 0
                            ? setAttributeData([
                                {
                                  values: [e.target.value],
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
                                values: [e.target.value],
                                id: attr?.id,
                              },
                            ]);
                      }}
                    />
                  </label>
                </div>
              )}

              {/* Field type 9*/}

              {attr.field_type === 9 && (
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
                    <div className="mt-2">
                      <Switch
                        checked={
                          attributeData?.filter(
                            (atData) => atData?.id === attr?.id
                          )[0]?.values[0]
                        }
                        onChange={(value) => {
                          attributeData?.length > 0
                            ? value === true
                              ? setAttributeData([
                                  {
                                    values: [value],
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
                            : value === true &&
                              setAttributeData([
                                {
                                  values: [value],
                                  id: attr?.id,
                                },
                              ]);
                        }}
                        className={`${
                          attributeData?.filter(
                            (atData) => atData?.id === attr?.id
                          )[0]?.values[0]
                            ? 'bg-primary'
                            : 'bg-gray-400'
                        }
          relative inline-flex flex-shrink-0 h-[28px] w-[64px] border-2 border-primary rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span
                          aria-hidden="true"
                          className={`${
                            attributeData?.filter(
                              (atData) => atData?.id === attr?.id
                            )[0]?.values[0]
                              ? 'translate-x-9'
                              : 'translate-x-0'
                          }
            pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                        />
                      </Switch>
                    </div>
                  </label>
                </div>
              )}

              {/* Field type 10*/}
              {attr.field_type === 10 && (
                <div className=" mt-6 ">
                  <label className="block">
                    <span
                      className={
                        attr.optional
                          ? '  '
                          : " after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                      }
                    >
                      {attr.name}
                    </span>

                    <div className="mt-3">
                      <button
                        id="primary_color"
                        className="w-full grid grid-cols-2 h-12 border  border-gray-500 rounded-md "
                        onClick={() =>
                          setdisplayColorPicker({
                            [`color_attribute_${attr?.id}`]: true,
                          })
                        }
                      >
                        <div className="h-full flex items-center justify-center  ">
                          {attributeData?.filter(
                            (atData) => atData?.id === attr?.id
                          )[0]?.values[0] || 'Select color'}
                        </div>
                        <div
                          style={{
                            backgroundColor:
                              attributeData?.filter(
                                (atData) => atData?.id === attr?.id
                              )[0]?.values[0] || '#000',
                          }}
                          className={' w-full h-full'}
                        ></div>
                      </button>
                      {displayColorPicker?.[`color_attribute_${attr?.id}`] && (
                        <OutsideClickHandler
                          onOutsideClick={() => {
                            setdisplayColorPicker(null);
                          }}
                        >
                          <div className="absolute z-[50]">
                            <SketchPicker
                              color={
                                attributeData?.filter(
                                  (atData) => atData?.id === attr?.id
                                )[0]?.values[0] || '#000'
                              }
                              onChange={(color) =>
                                attributeData?.length > 0
                                  ? color.hex
                                    ? setAttributeData([
                                        {
                                          values: [color.hex],
                                          id: attr?.id,
                                        },
                                        ...attributeData?.filter(
                                          (filter_att) =>
                                            filter_att?.id !== attr?.id
                                        ),
                                      ])
                                    : setAttributeData([
                                        ...attributeData?.filter(
                                          (filter_att) =>
                                            filter_att?.id !== attr?.id
                                        ),
                                      ])
                                  : setAttributeData([
                                      {
                                        values: [color.hex],
                                        id: attr?.id,
                                      },
                                    ])
                              }
                            />
                          </div>
                        </OutsideClickHandler>
                      )}
                    </div>
                  </label>
                </div>
              )}

              {/* Field type 11 */}
              {attr.field_type === 11 && (
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
                    (at_filter) => attr.id == at_filter.id
                  ).length > 0 ? (
                    <div className="mt-2">
                      <div>
                        <div className=" h-0 overflow-hidden">
                          <input
                            type="file"
                            id={`fileUploadClick-${attr.id}`}
                            name="imageUpload"
                            accept=".json"
                            onChange={(e) => {
                              const file_name = e.target.files[0].name;

                              if (
                                file_name.split('.')[
                                  file_name.split('.').length - 1
                                ] === 'json'
                              ) {
                                const fileReader = new FileReader();
                                fileReader.readAsText(
                                  e.target.files[0],
                                  'UTF-8'
                                );
                                fileReader.onload = (e) => {
                                  attributeData?.length > 0
                                    ? setAttributeData([
                                        {
                                          values: [JSON.parse(e.target.result)],
                                          id: attr.id,
                                        },
                                        ...attributeData?.filter(
                                          (filter_att) =>
                                            filter_att?.id !== attr?.id
                                        ),
                                      ])
                                    : setAttributeData([
                                        {
                                          values: [JSON.parse(e.target.result)],
                                          id: attr.id,
                                        },
                                      ]);
                                };
                              }
                            }}
                          />
                        </div>
                        <button
                          className=" flex flex-col items-center justify-center w-full p-3 border-2 border-dashed border-primary  "
                          onClick={() => fileUploadClick(attr.id)}
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
                            Upload Json File
                          </p>
                        </button>
                      </div>
                    </div>
                  ) : attributeData?.filter(
                      (at_filter) => attr.id == at_filter.id
                    )[0].uploadFile ? (
                    <div className=" mt-2  flex flex-col items-center px-[10px] py-[5px] border-2 border-dashed border-primary rounded-md">
                      <div className=" flex flex-col text-base  ">
                        <span>
                          {
                            attributeData?.filter(
                              (at_filter) => attr.id == at_filter.id
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
                          {JSON.stringify(
                            attributeData?.filter(
                              (at_filter) => attr.id == at_filter.id
                            )[0]
                          ).length > 50 ? (
                            <>
                              {JSON.stringify(
                                attributeData?.filter(
                                  (at_filter) => attr.id == at_filter.id
                                )[0]
                              ).substring(0, 50) + '...'}
                              <button
                                onClick={() => {
                                  /* Copy the text inside the text field */
                                  navigator.clipboard.writeText(
                                    JSON.stringify(
                                      attributeData?.filter(
                                        (at_filter) => attr.id == at_filter.id
                                      )[0]
                                    )
                                  );

                                  /* Alert the copied text */
                                  alert('Copied the value');
                                }}
                                className="text-primary text-sm"
                              >
                                Copy Value
                              </button>
                            </>
                          ) : (
                            JSON.stringify(
                              attributeData?.filter(
                                (at_filter) => attr.id == at_filter.id
                              )[0]
                            )
                          )}
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
              {/* Field type 12 */}
              {attr.field_type === 12 && (
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
                  <div className="">
                    <Address_search
                      coordinates={
                        attributeData?.filter(
                          (atData) => atData?.id === attr?.id
                        )[0]?.values[0]
                      }
                      setCoordinates={(coordinate) => {
                        if (coordinate !== null) {
                          attributeData?.length > 0
                            ? coordinate.latitude
                              ? setAttributeData([
                                  {
                                    values: [
                                      {
                                        latitude: coordinate.latitude,
                                        longitude: coordinate.longitude,
                                      },
                                    ],
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
                                  values: [
                                    {
                                      latitude: coordinate.latitude,
                                      longitude: coordinate.longitude,
                                    },
                                  ],
                                  id: attr?.id,
                                },
                              ]);
                        } else {
                          attributeData?.length > 0 &&
                            setAttributeData([
                              ...attributeData?.filter(
                                (filter_att) => filter_att?.id !== attr?.id
                              ),
                            ]);
                        }
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Attributes;
