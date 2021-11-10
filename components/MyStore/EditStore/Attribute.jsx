/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
 import Select from 'react-select';
 import CreatableSelect from 'react-select/creatable';
import { storeSelector } from '../../../store/feature/storeSlice';
 
const Attribute = ({ attributeData, setAttributeData }) => {

    const{attributes}=useSelector(storeSelector)

  // statte
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

  const handleChange = (
    newValue,
    actionMeta,
    attribute_id,
    attribute_field_type
  ) => {
    if (attribute_field_type === 1 || attribute_field_type === 3) {
      if (attributeData !== null) {
        const check = attributeData?.find((attr) => attr.id === attribute_id);
        if (check === undefined) {
          if (attribute_field_type === 1) {
            setAttributeData([
              ...attributeData,
              { values: [newValue.id], id: attribute_id },
            ]);
          } else if (attribute_field_type === 3) {
            setAttributeData([
              ...attributeData,
              { values: [newValue.value], id: attribute_id },
            ]);
          }
        } else {
          const findOut = attributeData.filter(
            (attr) => attr.id !== attribute_id
          );
          if (attribute_field_type === 1) {
            setAttributeData([
              ...findOut,
              { values: [newValue.id], id: attribute_id },
            ]);
          } else if (attribute_field_type === 3) {
            setAttributeData([
              ...findOut,
              { values: [newValue.value], id: attribute_id },
            ]);
          }
        }
      } else {
        if (attribute_field_type === 1) {
          setAttributeData([{ values: [newValue.id], id: attribute_id }]);
        } else if (attribute_field_type === 3) {
          setAttributeData([{ values: [newValue.value], id: attribute_id }]);
        }
      }
    } else if (attribute_field_type === 2 || attribute_field_type === 4) {
      if (attributeData !== null) {
        if (actionMeta.action !== 'remove-value' || 'clear') {
          const check = attributeData.find((attr) => attr.id === attribute_id);
          if (check === undefined) {
            if (attribute_field_type === 2) {
              setAttributeData([
                ...attributeData,
                {
                  values: newValue.map((singleValue) => singleValue.id),
                  id: attribute_id,
                },
              ]);
            } else if (attribute_field_type === 4) {
              setAttributeData([
                ...attributeData,
                {
                  values: newValue.map((singleValue) => singleValue.value),
                  id: attribute_id,
                },
              ]);
            }
          } else {
            const findOut = attributeData.filter(
              (attr) => attr.id !== attribute_id
            );
            if (attribute_field_type === 2) {
              setAttributeData([
                ...findOut,
                {
                  values: newValue.map((singleValue) => singleValue.id),
                  id: attribute_id,
                },
              ]);
            } else if (attribute_field_type === 4) {
              setAttributeData([
                ...findOut,
                {
                  values: newValue.map((singleValue) => singleValue.value),
                  id: attribute_id,
                },
              ]);
            }
          }
        } else {
          if (newValue.length) {
            const findOut = attributeData.filter(
              (attr) => attr.id !== attribute_id
            );
            if (attribute_field_type === 2) {
              setAttributeData([
                ...findOut,
                {
                  values: newValue.map((singleValue) => singleValue.id),
                  id: attribute_id,
                },
              ]);
            } else if (attribute_field_type === 4) {
              setAttributeData([
                ...findOut,
                {
                  values: newValue.map((singleValue) => singleValue.value),
                  id: attribute_id,
                },
              ]);
            }
          } else {
            const findOut = attributeData.filter(
              (attr) => attr.id !== attribute_id
            );
            if (attribute_field_type === 2) {
              setAttributeData([...findOut]);
            } else if (attribute_field_type === 4) {
              setAttributeData([...findOut]);
            }
          }
        }
      } else {
        if (attribute_field_type === 2) {
          setAttributeData([
            {
              values: newValue.map((singleValue) => singleValue.id),
              id: attribute_id,
            },
          ]);
        } else if (attribute_field_type === 4) {
          setAttributeData([
            {
              values: newValue.map((singleValue) => singleValue.value),
              id: attribute_id,
            },
          ]);
        }
      }
    }
  };

  return (
    <>
      {attributes?.map((attr) => {
        // Data
        let options;
        if (attr.field_type === 1 || attr.field_type === 2) {
          options = attr.values?.map((value) => {
            return { value: value.name, label: value.name, id: value.id };
          });
        }
        return (
          <>
            <div>
              {attr.field_type === 1 && (
                <div className="  mt-3 ">
                  <label
                    className={
                      attr.optional
                        ? 'mb-3'
                        : " after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                    }
                  >
                    {attr.name}
                  </label>
                  <Select
                    className=" mt-3"
                    onChange={(newValue, actionMeta) =>
                      handleChange(
                        newValue,
                        actionMeta,
                        attr.id,
                        attr.field_type
                      )
                    }
                    placeholder={'Select your' + ' ' + attr.name}
                    options={options}
                  />
                </div>
              )}
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
                  <Select
                    placeholder={'Select your' + ' ' + attr.name}
                    isMulti
                    name="colors"
                    options={options}
                    onChange={(newValue, actionMeta) =>
                      handleChange(
                        newValue,
                        actionMeta,
                        attr.id,
                        attr.field_type
                      )
                    }
                    className="basic-multi-select mt-3"
                    classNamePrefix="select"
                  />
                </div>
              )}
              {attr.field_type === 3 && (
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
                  <CreatableSelect
                    className="mt-3"
                    placeholder={'Type your' + ' ' + attr.name}
                    onChange={(newValue, actionMeta) =>
                      handleChange(
                        newValue,
                        actionMeta,
                        attr.id,
                        attr.field_type
                      )
                    }
                  />
                </div>
              )}
              {attr.field_type === 4 && (
                <div className=" mt-3 ">
                  <label
                    className={
                      attr.optional
                        ? ''
                        : "after:content-['*'] text-red-500 after:-top-[5px] after:-right-[10px] "
                    }
                  >
                    {attr.name}
                  </label>
                  <CreatableSelect
                    placeholder={'Type your' + ' ' + attr.name}
                    isMulti
                    onChange={(newValue, actionMeta) =>
                      handleChange(
                        newValue,
                        actionMeta,
                        attr.id,
                        attr.field_type
                      )
                    }
                    className="basic-multi-select mt-3"
                    classNamePrefix="select"
                  />
                </div>
              )}
              {attr.field_type === 5 &&
                (file === null ? (
                  <div>
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
                        <p>Upload Attachment Image</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className=" grid grid-cols-[20%,70%,10%;] xs:grid-cols-[10%,70%,20%] items-center px-[10px] py-[5px] border-2 border-primary rounded-md">
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

export default Attribute;
