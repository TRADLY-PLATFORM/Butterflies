/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SearchAddress from './SearchAddress';
import { useDispatch } from 'react-redux';
import {
  accountAttribute,
  categories,
  clearStoreState,
  storeSelector,
} from '../../../store/feature/storeSlice';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import Attribute from './Attribute';
import PopUp from '../../Shared/PopUp/PopUp';
import OutsideClickHandler from 'react-outside-click-handler';
import { create_store_click } from './createButton';
import { useRouter } from 'next/dist/client/router';
import { route } from 'next/dist/server/router';

const CustomCreateStoreForm = ({ accounts_configs }) => {
  const [imagePath, setImagePath] = useState(null);
  const [files, setFiles] = useState(null);
  const [name, setName] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [category, setCategory] = useState(null);
  const [attributeData, setAttributeData] = useState(null);
  const [description, setDescription] = useState(null);

  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');

  const [createStoreLoading, setCreateStoreLoading] = useState(false);
  const router = useRouter();

  const { auth_key } = useSelector(authSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categories({ prams: { parent: 0, type: 'accounts' } }));
  }, [0]);

  useEffect(() => {
    if (category) {
      dispatch(
        accountAttribute({
          prams: { category_id: category, type: 'accounts' },
          authKey: auth_key,
        })
      );
    }
  }, [category]);

  const { isError, errorMessage, account_categories } =
    useSelector(storeSelector);

  const closePopUP = () => {
    dispatch(clearStoreState());
    setShowError(false);
    setError_message('');
  };

  return (
    <div className=" w-full">
      {(showError || isError) && (
        <OutsideClickHandler
          onOutsideClick={() => {
            (showError || isError) &&
              (setShowError(false),
              setError_message(''),
              dispatch(clearStoreState()));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp
                message={error_message || errorMessage}
                closePopUP={closePopUP}
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      <h3 className=" text-center font-semibold text-2xl text-primary mb-4">
        Create Your Account
      </h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="block">
          <span className="text-gray-700">Account Image</span>
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
                setFiles(e.target.files[0]))
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
                    return setImagePath(null), setFiles(null);
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
        {account_categories?.length > 0 && (
          <label className="block">
            <span className="text-gray-700 ">Categories</span>
            <select
              className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
              onChange={(e) => setCategory(e.target.value)}
            >
              <option hidden selected>
                Select Category
              </option>
              {account_categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="block">
          <span className="text-gray-700">Account name</span>
          <input
            type="text"
            className="
                    mt-0
                    block
                    w-full
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
            placeholder=""
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            placeholder="Write your description .."
            className="
            
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        {accounts_configs?.account_address_enabled && (
          <label className="block ">
            <span className="text-gray-700">Account Address</span>
            <SearchAddress setCoordinates={setCoordinates} />
          </label>
        )}

        <div>
          <Attribute
            attributeData={attributeData}
            setAttributeData={setAttributeData}
          />
        </div>
      </div>
      <div className=" mt-9 flex justify-center ">
        <button
          className="text-white px-7 py-2 rounded-md bg-primary  flex items-center justify-center "
          onClick={() =>
            create_store_click(
              files,
              name,
              description,
              coordinates,
              category,
              attributeData,
              setShowError,
              setError_message,
              auth_key,
              dispatch,
              setCreateStoreLoading,
              router,
              accounts_configs,
              account_categories
            )
          }
        >
          {createStoreLoading && (
            <svg
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
            </svg>
          )}
          Create Account
        </button>
      </div>
    </div>
  );
};

export default CustomCreateStoreForm;
