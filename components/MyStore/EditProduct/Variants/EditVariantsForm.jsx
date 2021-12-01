/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { storeSelector } from '../../../../store/feature/storeSlice';
import { configsSelector } from '../../../../store/feature/configsSlice';
import { stock_text } from '../../../Shared/Constant/TextConstant/addlistingConstant';

const EditVariantsForm = ({
  editVariantData,
  variantsType,
  variantsObject,
  setVariantsObject,
  EditVariantClick,
  setShowError,
  setError_message,
  editvariantLoading,
}) => {
  const [imagePath, setImagePath] = useState(null);
  const [files, setFiles] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(null);

  const { currencies, listing_configs } = useSelector(storeSelector);
    const { genral_configs, marketplace_type, marketplace_module } =
      useSelector(configsSelector);

  const clickAddButton = () => {
    if (variantsObject.images === null) {
      setShowError(true);
      setError_message('Image is required');
      return false;
    }
    if (variantsObject.variant_type === null) {
      setShowError(true);
      setError_message('Variant type is required');
      return false;
    }
    if (variantsObject.variant_type_value === null) {
      setShowError(true);
      setError_message('Variant value type is required');
      return false;
    }
    if (variantsObject.title === null) {
      setShowError(true);
      setError_message('Title is required');
      return false;
    }
    if (variantsObject.description === null) {
      setShowError(true);
      setError_message('Description is required');
      return false;
    }
    if (variantsObject.list_price === null) {
      setShowError(true);
      setError_message('Price is required');
      return false;
    }

    EditVariantClick();
  };
  useEffect(() => {
    setImagePath({
      id: 1,
      path: editVariantData.images[0],
    });
    setSelectedVariantIndex(
      variantsType.findIndex(
        (item) => item.id === editVariantData.variant_values[0].variant_type_id
      )
    );
    setVariantsObject({
      variant_type: editVariantData.variant_values[0].variant_type_id,
      variant_type_value:
        editVariantData.variant_values[0].variant_type_value_id,
      images: editVariantData.images[0],
      title: editVariantData.title,
      description: editVariantData.description,
      list_price: Number(editVariantData.list_price.amount),
      offer_percent: Number(editVariantData.offer_percent),
      stock: Number(editVariantData.stock),
    });
  }, [editVariantData]);

  return (
    <div className=" bg-white w-full px-[20px] py-[30px] mt-4 grid grid-cols-1 gap-6">
      <h3 className=" text-center font-semibold text-xl text-primary mb-4">
        {` Edit ${editVariantData.title} Variant`}
      </h3>
      <div className="block">
        <span className="text-gray-700">Variant Image</span>
        <input
          id="imageButton"
          type="file"
          className=" hidden"
          accept=".png , .jpg"
          placeholder=""
          onChange={(e) => {
            return (
              e.target.files.length > 0 &&
                (setImagePath({
                  id: e.target.files[0].name,
                  path: URL.createObjectURL(e.target.files[0]),
                }),
                setFiles(e.target.files[0])),
              setVariantsObject({
                ...variantsObject,
                images: e.target.files[0],
              })
            );
          }}
        />
        <div>
          {imagePath !== null ? (
            <div className=" relative w-[100px] mt-4">
              <Image
                src={imagePath.path}
                alt="account image"
                width={100}
                height={100}
                objectFit="cover"
              />
              <button
                className=" absolute -top-2 -right-2 text-primary "
                onClick={() => {
                  return (
                    setImagePath(null),
                    setFiles(null),
                    setVariantsObject({
                      ...variantsObject,
                      images: null,
                    })
                  );
                }}
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
              </button>
            </div>
          ) : (
            <button
              className=" w-[100px]  h-[100px] flex justify-center items-center  mt-3  bg-gray-100 text-sm rounded "
              onClick={() => document.getElementById('imageButton').click()}
            >
              Add Image
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="text-gray-700 ">Variant type</span>
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
              setSelectedVariantIndex(Number(e.target.value)),
                setVariantsObject({
                  ...variantsObject,
                  variant_type: variantsType[Number(e.target.value)].id,
                });
            }}
          >
            {variantsType?.map((variant, index) => (
              <option
                key={variant.id}
                value={index}
                selected={
                  editVariantData.variant_values[0].variant_type_id ===
                  variant.id
                    ? true
                    : false
                }
              >
                {variant.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700 ">Variant Value</span>

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
              setVariantsObject({
                ...variantsObject,
                variant_type_value: Number(e.target.value),
              });
            }}
          >
            <option hidden>Select value</option>
            {variantsType[selectedVariantIndex]?.values?.map((value) => (
              <option
                key={value.id}
                value={value.id}
                selected={
                  editVariantData.variant_values[0].variant_type_value_id ===
                  value.id
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
      <label className="block">
        <span className="text-gray-700">Variant Title</span>
        <input
          value={variantsObject.title}
          type="text"
          className="
                    mt-0
                    block
                    w-full
                    h-[27px]
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
          placeholder="Enter your title"
          onChange={(e) => {
            setVariantsObject({
              ...variantsObject,
              title: e.target.value,
            });
          }}
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Variant Description</span>
        <textarea
          value={variantsObject.description}
          className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
          rows="3"
          onChange={(e) => {
            setVariantsObject({
              ...variantsObject,
              description: e.target.value,
            });
          }}
        ></textarea>
      </label>

      <label className="block relative">
        <span className="text-gray-700">Selling Price</span>
        <input
          value={variantsObject.list_price}
          type="number"
          className="
                    mt-0
                    block
                    w-full
                    px-0.5
                     border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
          placeholder="1"
          onChange={(e) => {
            setVariantsObject({
              ...variantsObject,
              list_price: e.target.value,
            });
          }}
        />
      </label>
      <div className="grid grid-cols-2 gap-2">
        {listing_configs?.hide_offer_percent && (
          <label className="block">
            <span className="text-gray-700">Offer percent</span>
            <input
              value={variantsObject.offer_percent}
              type="number"
              className="
                    mt-0
                    block
                    w-full
                    h-[27px]
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
              placeholder="1"
              onChange={(e) => {
                setVariantsObject({
                  ...variantsObject,
                  offer_percent: e.target.value,
                });
              }}
            />
          </label>
        )}
        <label className="block">
          <span className="text-gray-700">{ stock_text(marketplace_type)}</span>
          <input
            value={variantsObject.stock}
            type="number"
            className="
                    mt-0
                    block
                    w-full
                    h-[27px]
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
            placeholder="1"
            onChange={(e) => {
              setVariantsObject({
                ...variantsObject,
                stock: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div className=" flex justify-end">
        <button
          className=" bg-primary px-4 py-2 rounded-md text-white flex items-center"
          onClick={() => clickAddButton()}
        >
          {editvariantLoading&&<svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>}
          Edit Variant
        </button>
      </div>
    </div>
  );
};

export default EditVariantsForm;
