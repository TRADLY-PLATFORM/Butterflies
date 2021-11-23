/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import icon from '../../../../assets/Images/Home/pexels-photo-789812 1.png';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../store/feature/authSlice';
import tradly from 'tradly';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUp from '../../../Shared/PopUp/PopUp';
import {
  myAccountListingDetails,
  storeSelector,
} from '../../../../store/feature/storeSlice';
import EditVariantsForm from './EditVariantsForm';
import {
  addNewVariant,
  deleteVariant,
  editVariantButton,
} from './variantButton';
import { useRouter } from 'next/dist/client/router';
import { getThumbnailImage } from '../../../Shared/Constant/Constant';
import Modal from '../../../Shared/Modal.jsx/Modal';
import VariantSuccess from './VariantSuccess/VariantSuccess';
import AddVariantsForm from './AddVariantsForm';

const EditVariantsPart = () => {
  const {
    listing_configs,
    isError,
    errorMessage,
    currencies,
    listing_categories,
    my_account_listing_details,
  } = useSelector(storeSelector);
  const { auth_key } = useSelector(authSelector);

  const dispatch = useDispatch();

  const router = useRouter();
  const accountId = router.query.account_id;
  const productId = router.query.product_id;

  const [showVariantForm, setShowVariantForm] = useState(false);
  const [isEditVariant, setIsEditVariant] = useState(false);
  const [editVariantData, setEditVariantData] = useState(null);
  const [editvariantLoading, setEditVariantLoading] = useState(false);
  const [addvariantLoading, setAddVariantLoading] = useState(false);

  const [variantsType, setVariantsType] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [variantsObject, setVariantsObject] = useState({
    variant_type: null,
    variant_type_value: null,
    images: null,
    title: null,
    description: null,
    list_price: null,
    offer_percent: 0,
    stock: 0,
  });

  const EditVariantClick = () => {
    const check = my_account_listing_details.variants?.find(
      (item) =>
        item.variant_values[0].variant_type_id ===
          variantsObject.variant_type &&
        item.variant_values[0].variant_type_value_id ===
          variantsObject.variant_type_value
    );
    if (check === undefined) {
      const variantId = editVariantData.id;
      editVariantButton(
        variantsObject,
        setShowVariantForm,
        setIsEditVariant,
        setEditVariantData,
        setError_message,
        setShowError,
        auth_key,
        variantId,
        productId,
        setShowSuccessMessage,
        setEditVariantLoading
      );
    } else {
      setShowError(true);
      setError_message('Same variant already added');
      setShowVariantForm(false);
      setIsEditVariant(false);
      setEditVariantData(null);
      setVariantsObject({
        variant_type: null,
        variant_type_value: null,
        images: null,
        title: null,
        description: null,
        list_price: null,
        offer_percent: 0,
        stock: 0,
      });
      return false;
    }
  };

  const addVariantClick = () => {
    const check = my_account_listing_details.variants?.find(
      (item) =>
        item.variant_values[0].variant_type_id ===
          variantsObject.variant_type &&
        item.variant_values[0].variant_type_value_id ===
          variantsObject.variant_type_value
    );

    if (check === undefined) {
      const variantId = '';
      addNewVariant(
        variantsObject,
        setShowVariantForm,
        setIsEditVariant,
        setEditVariantData,
        setError_message,
        setShowError,
        auth_key,
        variantId,
        productId,
        setShowSuccessMessage,
        setAddVariantLoading
      );
    } else {
      setShowError(true);
      setError_message('Same variant already added');
      setShowVariantForm(false);
      setIsEditVariant(false);
      setEditVariantData(null);
      setVariantsObject({
        variant_type: null,
        variant_type_value: null,
        images: null,
        title: null,
        description: null,
        list_price: null,
        offer_percent: 0,
        stock: 0,
      });
      return false;
    }
  };

  useEffect(() => {
    tradly.app.getVariantTypes({ authKey: auth_key }).then((res) => {
      if (!res.error) {
        setVariantsType(res.data.variant_types);
      }
    });
  }, [auth_key]);

  const closePopUP = () => {
    setShowError(false);
    setError_message('');
  };
  return (
    <>
      {showError && (
        <OutsideClickHandler
          onOutsideClick={() => {
            showError && (setShowError(false), setError_message(''));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp message={error_message} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}

      {showSuccessMessage && (
        <Modal>
          <OutsideClickHandler
            onOutsideClick={() => {
              setShowSuccessMessage(false);
              dispatch(
                myAccountListingDetails({ id: productId, authKey: auth_key })
              );
            }}
          >
            <VariantSuccess
              message={'Your variants updated successfully'}
              setShowSuccessMessage={setShowSuccessMessage}
              dispatch={dispatch}
              productId={productId}
              auth_key={auth_key}
            />
          </OutsideClickHandler>
        </Modal>
      )}

      <div className="bg-white p-5  rounded-lg shadow-c-sm">
        <h3 className=" text-center font-semibold text-2xl text-primary mb-4">
          Edit Variant
        </h3>
        {my_account_listing_details?.variants?.length > 0 ? (
          <div>
            {my_account_listing_details?.variants.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={
                    'w-full min-h-[90px] relative rounded-md overflow-hidden  flex items-center my-4 shadow-c-sm  border border-transparent cursor-pointer'
                  }
                >
                  <div className="h-[90px] w-[90px] relative">
                    <Image
                      src={getThumbnailImage(item.images[0])}
                      layout="fill"
                    />
                  </div>
                  <div className=" ml-4 w-4/6">
                    <p className=" text-sm text-primary font-normal">
                      {' '}
                      {item.stock} tickets left
                    </p>
                    <p className="text-gray-700 font-semibold">{item.title}</p>
                    <p className=" flex items-center  ">
                      <span className=" text-secondary font-normal  text-xs">
                        {item.offer_price.currency}{' '}
                      </span>
                      <span className=" ml-2">{item.offer_price.amount} </span>
                    </p>
                    <p className=" flex items-center  text-xs ">
                      <span className=" line-through text-secondary font-normal">
                        {item.list_price.formatted}
                      </span>
                      <span className=" font-medium ml-2">
                        -{item.offer_percent}%
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      deleteVariant(item.id, productId, auth_key, dispatch);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  <button
                    className="ml-5"
                    onClick={() => {
                      setIsEditVariant(true);
                      setShowVariantForm(true);
                      setEditVariantData(item);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className=" w-full     flex justify-center items-center">
            <div
              className="   w-full bg-yellow-500    text-white   py-3 rounded relative grid grid-cols-[20%,80%]"
              role="alert"
            >
              <div className="flex items-center justify-center">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div>
                {/* <strong className="font-bold">
                {first_name ? 'Oops' + '  ' + first_name : 'Hi Guess !'}
              </strong> */}
                <span className="  ml-2">No Variants available.</span>
              </div>
            </div>
          </div>
        )}
        {!showVariantForm && (
          <button
            className="border  border-primary rounded-md text-primary text-center px-6 py-1 mt-9"
            onClick={() => setShowVariantForm(true)}
          >
            + Add new variant
          </button>
        )}
      </div>
      {showVariantForm && isEditVariant && editVariantData !== null && (
        <div className="  bg-white w-full min-h-[300px] mt-4 relative">
          <button
            className="absolute top  right-0 text-primary font-semibold text-xl mt-5 mr-5"
            onClick={() => {
              setShowVariantForm(false),
                setIsEditVariant(false),
                setEditVariantData(null);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <EditVariantsForm
            editVariantData={editVariantData}
            variantsType={variantsType}
            variantsObject={variantsObject}
            setVariantsObject={setVariantsObject}
            EditVariantClick={EditVariantClick}
            setError_message={setError_message}
            setShowError={setShowError}
            editvariantLoading={editvariantLoading}
          />
        </div>
      )}
      {showVariantForm && !isEditVariant && (
        <div className="  bg-white w-full min-h-[300px] mt-4 relative">
          <button
            className="absolute top  right-0 text-primary font-semibold text-xl mt-5 mr-5"
            onClick={() => setShowVariantForm(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <AddVariantsForm
            variantsType={variantsType}
            variantsObject={variantsObject}
            setVariantsObject={setVariantsObject}
            addVariantClick={addVariantClick}
            setShowError={setShowError}
            setError_message={setError_message}
            addvariantLoading={addvariantLoading}
          />
        </div>
      )}
    </>
  );
};

export default EditVariantsPart;
