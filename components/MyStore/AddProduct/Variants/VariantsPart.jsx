/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import icon from '../../../../assets/Images/Home/pexels-photo-789812 1.png';
import Image from 'next/image';
import AddVariantsForm from './AddVariantsForm';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../store/feature/authSlice';
import tradly from 'tradly';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUp from '../../../Shared/PopUp/PopUp';
import { storeSelector } from '../../../../store/feature/storeSlice';
import { configsSelector } from '../../../../store/feature/configsSlice';
import { stock_card_text } from '../../../Shared/Constant/TextConstant/addlistingConstant';

const VariantsPart = ({ variantsArray, setVariantsArray, currency }) => {
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [variantsType, setVariantsType] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');

  const { currencies } = useSelector(storeSelector);

   const { genral_configs, marketplace_type, marketplace_module } =
     useSelector(configsSelector);

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

  const addVariantClick = () => {
    if (variantsArray === null) {
      setVariantsArray([variantsObject]);
    } else {
      const check = variantsArray?.find(
        (item) =>
          item.variant_type === variantsObject.variant_type &&
          item.variant_type_value === variantsObject.variant_type_value
      );
      if (check === undefined) {
        setVariantsArray([...variantsArray, variantsObject]);
      } else {
        setShowError(true);
        setError_message('Same variant already added');
        setShowVariantForm(false);
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
    }
    setShowVariantForm(false);
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
  };

  const { auth_key } = useSelector(authSelector);
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
      <div className="bg-white p-5  rounded-lg shadow-c-sm">
        {!variantsArray === null || variantsArray?.length > 0 ? (
          <div>
            {variantsArray.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={
                    'w-full min-h-[90px] relative rounded-md overflow-hidden  flex items-center my-4 shadow-c-sm  border border-transparent cursor-pointer'
                  }
                >
                  <div className="h-[90px] w-[90px] relative">
                    <Image
                      src={URL.createObjectURL(item.images)}
                      layout="fill"
                    />
                  </div>
                  <div className=" ml-6 w-3/6 md:w-4/6">
                    <p className=" text-sm text-primary font-normal">
                      {' '}
                      {stock_card_text(marketplace_type, item.stock)}
                    </p>
                    <p className="text-black font-semibold">{item.title}</p>
                    <p className=" flex items-center  ">
                      <span className=" text-secondary font-normal  text-xs">
                        {currency
                          ? currencies.map((item) => {
                              if (item.id === currency) {
                                return item.code;
                              }
                            })
                          : currencies[0].code}
                      </span>
                      <span className=" ml-2">{item.list_price} </span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const filter = variantsArray.filter(
                        (item, i) => i !== index
                      );
                      setVariantsArray([...filter]);
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
            + Add Variant
          </button>
        )}
      </div>
      {showVariantForm && (
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
            setError_message={setError_message}
            setShowError={setShowError}
            marketplace_type={marketplace_type}
          />
        </div>
      )}
    </>
  );
};

export default VariantsPart;

{
  /* <div className="h-[130px] w-[130px] relative">
            <Image src={icon} layout="fill" alt="icon" />
          </div>
          <div>
            <p className=" text-primary font-semibold text-base">Test</p>
            <p className=" text-black font-semibold text-base">$1000</p>
            <p className=" text-secondary font-normal text-sm">Available</p>
          </div>
          <div className=" flex justify-around items-center">
            <button className="bg-white text-black">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button className=" bg-white  text-black">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
            </div>
            <div>
                <AddVariantsForm/>
            </div> */
}
