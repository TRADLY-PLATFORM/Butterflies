import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  accountAttribute,
  clearStoreState,
  storeSelector,
} from '../../../store/feature/storeSlice';
import SearchAddress from './SearchAddress';
import Image from 'next/image';
import PopUp from '../../Shared/PopUp/PopUp';
import { authSelector } from '../../../store/feature/authSlice';
import { useRouter } from 'next/dist/client/router';
import { add_product_click } from './addProduct';
import SchedulePart from './schedule/SchedulePart';
import AddVariantForm from './Variants/AddVariantsForm';
import VariantsPart from './Variants/VariantsPart';
import { configsSelector } from '../../../store/feature/configsSlice';
import { stock_text } from '../../Shared/Constant/TextConstant/addlistingConstant';
import tradly from 'tradly';
import axios from 'axios';
import Markdown_Editor from '../../Shared/MarkdownEditor';
import Attributes from './Attributes';
import { fetch_all_categories } from '../../../constant/fetch_all_categories';
import { ReactSortable } from 'react-sortablejs';

const AddProductForm = () => {
  const [title, setTitle] = useState('');
  const [meta_title, setMetaTitle] = useState('');
  const [meta_keyword, setMetaKeyword] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState(' ');
  const [meta_description, setMetaDescription] = useState(' ');
  const [price, setPrice] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [offerPercent, setOfferPercent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [attributeData, setAttributeData] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [product_address, setProduct_address] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [all_images, setAll_images] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [files, setFiles] = useState([]);
  const [fullFile, setFullFile] = useState([]);
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [schedulesArray, setSchedulesArray] = useState(null);
  const [variantsArray, setVariantsArray] = useState(null);
  const [variantsType, setVariantsType] = useState(null);
  const [allCategories, setAllCategories] = useState(null);

  const { auth_key } = useSelector(authSelector);
  const { genral_configs, MARKETPLACE_MODULES, MARKETPLACE_FLAVOURS } =
    useSelector(configsSelector);

  const {
    listing_configs,
    isError,
    errorMessage,
    currencies,
    listing_categories,
    attributes,
  } = useSelector(storeSelector);

  // all_categories
  useEffect(() => {
    if (listing_categories?.length > 0) {
      setAllCategories(fetch_all_categories(listing_categories));
    }
  }, [listing_categories]);

  // variants
  useEffect(() => {
    axios.get('/api/variant').then((res) => {
      setVariantsType(res.data.variant_types);
    });
  }, [auth_key]);

  const dispatch = useDispatch();
  const router = useRouter();
  const accountId = router.query.account_id;

  // Use Effect functions

  useEffect(() => {
    if (currencies !== null) {
      setCurrency(currencies[0].id);
    }
  }, [currencies]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        accountAttribute({
          prams: { category_id: selectedCategory, type: 'listings' },
          authKey: auth_key,
        })
      );
    }
  }, [selectedCategory]);

  //Image Upload func:
  const imageButtonClick = () => {
    if (files.length !== parseInt(listing_configs.listing_pictures_count)) {
      document.getElementById('imageButtonInput').click();
    } else {
      setShowError(true);
      setError_message("You can't add more photo");
    }
  };

  // image upload
  const imageUpload = async (e) => {
    if (e.target.files.length > 0) {
      let images = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];

        images.push({
          id: file.lastModified,
          path: URL.createObjectURL(file),
          name: file.name,
          type: file.type,
          full_file: file,
        });

        if (i === e.target.files.length - 1) {
          if (all_images.length > 0) {
            setAll_images([...all_images, ...images]);
          } else {
            setAll_images([...images]);
          }
        }
      }
    }
  };

  // delete image
  const imageDelete = async (id) => {
    const all_images_filter = all_images.filter((image) => image.id !== id);
    setAll_images(all_images_filter);
  };

  // pop up close
  const closePopUP = () => {
    dispatch(clearStoreState());
    setShowError(false);
    setError_message('');
  };

  // console.log(imagePath);

  return (
    <>
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
            <div className="w-4/6  xs:w-[500px] mx-auto">
              <PopUp
                message={error_message || errorMessage}
                closePopUP={closePopUP}
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      <div className=" w-full pt-2  pb-[100px] flex flex-col  c-lg:flex-row items-center   justify-center    c-lg:items-start   gap-8 md:gap-2 ">
        <div className=" w-full  c-lg:w-[60%]  ">
          <h3 className=" font-semibold text-[#121212] text-xl mb-4">
            Listing Details
          </h3>
          <div className=" bg-white p-10  grid grid-cols-1 gap-6 rounded-lg shadow-c-sm">
            <div className="block">
              <span className="text-gray-700 ">Listing Image</span>
              <input
                id="imageButtonInput"
                type="file"
                className=" hidden"
                accept=".png , .jpg"
                placeholder=""
                onChange={(e) => imageUpload(e)}
                multiple
              />
              <div className="mt-1 flex flex-col   gap-4">
                <ReactSortable
                  list={all_images}
                  setList={setAll_images}
                  animation={150}
                  group="cards"
                  // onChange={(order, sortable, evt) => {}}
                  // onEnd={(evt) => {}}
                  className="flex   items-center flex-wrap gap-4"
                >
                  {all_images.length !== 0 &&
                    all_images?.map((singleImage) => {
                      return (
                        <div
                          key={singleImage.id}
                          className=" relative w-[100px] cursor-move"
                        >
                          <img
                            src={singleImage.path}
                            alt="store image"
                            className="w-[100px] h-[100px]  object-cover shadow-c-xsm"
                          />
                          <button
                            className=" absolute -top-2 -right-2 text-primary "
                            onClick={() => imageDelete(singleImage.id)}
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
                      );
                    })}
                </ReactSortable>

                <button
                  className=" w-[100px]  h-[100px] flex justify-center items-center     bg-gray-100 text-sm rounded "
                  onClick={() => imageButtonClick()}
                >
                  Add Image
                </button>
              </div>
              <p className=" text-sm mt-2 font-normal text-default_gray">
                Max. {listing_configs?.listing_pictures_count} photos per
                Listing
              </p>
            </div>
            <label className="block">
              <span className="text-gray-700">Listing Title</span>
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
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            {listing_configs?.enable_slug && (
              <label className="block">
                <span className="text-gray-700">Listing Slug</span>
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
                  onChange={(e) => setSlug(e.target.value)}
                />
              </label>
            )}
            <label className="block">
              <span className="text-gray-700">Listing Description</span>
              <Markdown_Editor
                oldValue={description}
                setMarkdownValue={setDescription}
              />
            </label>

            {listing_configs?.meta_title && (
              <label className="block">
                <span className="text-gray-700">Listing Meta Title</span>
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
                  placeholder="Set meta title for seo "
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </label>
            )}
            {listing_configs?.meta_description && (
              <label className="block">
                <span className="text-gray-700">Listing Meta Description</span>
                <textarea
                  type="text"
                  row={7}
                  className="
                    mt-0
                    block
                    w-full
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                  placeholder="Set meta description for listing"
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </label>
            )}
            {listing_configs?.meta_keyword && (
              <label className="block">
                <span className="text-gray-700">Listing Meta Keyword</span>
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
                  placeholder="Set listing meta tags for seo"
                  onChange={(e) => setMetaKeyword(e.target.value)}
                />
              </label>
            )}

            {listing_configs?.listing_address_enabled && (
              <label className="block ">
                <span className="text-gray-700"> Address</span>
                <SearchAddress setCoordinates={setCoordinates} />
              </label>
            )}

            <div className=" grid grid-cols-1 gap-6  2xl:grid-cols-2  2xl:justify-between">
              <label className="block relative">
                <span className="text-gray-700">Selling Price</span>
                <input
                  value={price}
                  type="number"
                  className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    pl-[88px]
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                  placeholder="1"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setPrice(e.target.value);
                    }
                  }}
                />
                <select
                  className="
                     w-[85px]
                     absolute top-0  left-0 mt-7
                    px-2 py-1
                    border-0  transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencies?.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </label>

              {listing_configs.show_shipping_charges && (
                <label className="block">
                  <span className="text-gray-700">Shipping Charge</span>
                  <input
                    value={shippingCharge}
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
                      if (e.target.value >= 0) {
                        setShippingCharge(e.target.value);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            <div className=" grid grid-cols-1 gap-6  2xl:grid-cols-2  2xl:justify-between">
              {listing_configs.hide_offer_percent && (
                <label className="block">
                  <span className="text-gray-700">Offer Percent</span>
                  <input
                    value={offerPercent}
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
                      if (e.target.value >= 0) {
                        setOfferPercent(e.target.value);
                      }
                    }}
                  />
                </label>
              )}
              {listing_configs.enable_stock && (
                <label className="block">
                  <span className="text-gray-700">
                    {stock_text(MARKETPLACE_MODULES)}
                  </span>
                  <input
                    value={quantity}
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
                      if (e.target.value >= 0) {
                        setQuantity(e.target.value);
                      }
                    }}
                  />
                </label>
              )}
            </div>

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
                onChange={(e) => {
                  setSelectedCategory(e.target.value), setAttributeData(null);
                }}
              >
                <option hidden selected>
                  Select Category
                </option>
                {allCategories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <Attributes
                attributeData={attributeData}
                setAttributeData={setAttributeData}
              />
            </div>
          </div>
          {variantsType?.length > 0 && (
            <>
              <h3 className=" font-semibold mt-9 text-[#121212] text-xl mb-4">
                Variants
              </h3>{' '}
              <div className="w-full    ">
                {' '}
                <VariantsPart
                  variantsArray={variantsArray}
                  setVariantsArray={setVariantsArray}
                  currency={currency}
                />
              </div>
            </>
          )}
        </div>
        {MARKETPLACE_MODULES == 2 && (
          <div className=" mt-9  c-lg:mt-0   c-lg:ml-[20px] w-full c-lg:w-[30%]  ">
            <h3 className=" font-semibold text-[#121212] text-xl mb-4">
              Date & Time
            </h3>{' '}
            <div className=" ">
              <SchedulePart
                schedulesArray={schedulesArray}
                setSchedulesArray={setSchedulesArray}
              />
            </div>
          </div>
        )}

        <div className="  relative  mt-10 md:mt-0  md:fixed w-full h-[80px] md:bg-white bottom-0 left-0 md:z-[1000000]">
          <div className="h-full   flex   justify-center md:justify-end items-center ">
            <button
              className="text-white  w-5/6  md:w-[180px] h-12 rounded-md bg-primary  flex items-center justify-center  md:mr-7"
              onClick={() =>
                add_product_click(
                  all_images?.map((image) => {
                    return { name: image.name, type: image.type };
                  }) || [], //this is files value , this is mapped from all_images state

                  all_images?.map((image) => image.full_file) || [], //this is fullFile value, this is mapped from all_images state

                  title,
                  slug,
                  meta_title,
                  meta_description,
                  meta_keyword,
                  description,
                  price,
                  shippingCharge,
                  offerPercent,
                  quantity,
                  coordinates,
                  selectedCategory,
                  attributeData,
                  currency,
                  setShowError,
                  setError_message,
                  dispatch,
                  router,
                  listing_configs,
                  auth_key,
                  accountId,
                  setAddProductLoading,
                  schedulesArray,
                  variantsArray,
                  attributes
                )
              }
              disabled={addProductLoading ? true : false}
            >
              {addProductLoading && (
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
              Add Listing
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
