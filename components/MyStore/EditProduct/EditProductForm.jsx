import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  accountAttribute,
  clearStoreState,
  myAccountListingDetails,
  storeSelector,
} from '../../../store/feature/storeSlice';
import SearchAddress from './SearchAddress';
import Image from 'next/image';
import PopUp from '../../Shared/PopUp/PopUp';
import { authSelector } from '../../../store/feature/authSlice';
import { useRouter } from 'next/dist/client/router';
import { edit_product_click } from './editProduct';
import EditListingSuccess from './EditListingSuccess';
import Modal from '../../Shared/Modal.jsx/Modal';
import { configsSelector } from '../../../store/feature/configsSlice';
import { stock_text } from '../../Shared/Constant/TextConstant/addlistingConstant';
import Markdown_Editor from '../../Shared/MarkdownEditor';
import dynamic from 'next/dynamic';
import Attributes from './Attributes';
import { fetch_all_categories } from '../../../constant/fetch_all_categories';
import { ReactSortable } from 'react-sortablejs';

const EditProductForm = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [offerPercent, setOfferPercent] = useState(0);
  const [meta_title, setMetaTitle] = useState('');
  const [meta_keyword, setMetaKeyword] = useState('');
  const [meta_description, setMetaDescription] = useState(' ');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [attributeData, setAttributeData] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [product_address, setProduct_address] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [all_images, setAll_images] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [files, setFiles] = useState([]);
  const [fullFile, setFullFile] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');
  const [editProductLoading, setEditProductLoading] = useState(false);
  const [addressSearchKey, setAddressSearchKey] = useState('');
  const [allCategories, setAllCategories] = useState(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { auth_key } = useSelector(authSelector);
  const [editorData, setData] = useState();

  const {
    listing_configs,
    isError,
    errorMessage,
    currencies,
    listing_categories,
    my_account_listing_details,
    attributes,
  } = useSelector(storeSelector);
  const { genral_configs, MARKETPLACE_MODULES, MARKETPLACE_FLAVOURS } =
    useSelector(configsSelector);

  const dispatch = useDispatch();
  const router = useRouter();
  const accountId = router.query.account_id;
  const productId = router.query.product_id;

  // all_categories
  useEffect(() => {
    if (listing_categories?.length > 0) {
      setAllCategories(fetch_all_categories(listing_categories));
    }
  }, [listing_categories]);

  // Use Effect functions
  useEffect(() => {
    if (my_account_listing_details) {
      setTitle(my_account_listing_details.title);
      setSlug(my_account_listing_details?.slug);
      setDescription(my_account_listing_details.description);
      setPrice(Number(my_account_listing_details.list_price.amount));
      setShippingCharge(
        Number(my_account_listing_details.shipping_charges.amount)
      );
      setQuantity(Number(my_account_listing_details.stock));
      setOfferPercent(Number(my_account_listing_details.offer_percent));
      setAll_images(
        my_account_listing_details.images.map((item, index) => {
          return { id: index, path: item };
        })
      );
      setCoordinates({
        latitude: my_account_listing_details.coordinates?.latitude,
        longitude: my_account_listing_details.coordinates?.longitude,
      });
      setAddressSearchKey(
        my_account_listing_details.location.formatted_address
      );
      setSelectedCategory(my_account_listing_details.category_id[0]);
      dispatch(
        accountAttribute({
          prams: {
            category_id: my_account_listing_details.category_id[0],
            type: 'listings',
          },
          authKey: auth_key,
        })
      );
      if (my_account_listing_details.attributes.length > 0) {
        setAttributeData(
          my_account_listing_details.attributes.map((attr) => {
            if (attr.field_type === 1 || attr.field_type === 2) {
              return {
                id: attr.id,
                values: attr.values.map((item) => item.id),
              };
            } else if (attr.field_type === 3 || attr.field_type === 4) {
              return { id: attr.id, values: attr.values.map((item) => item) };
            } else if (attr.field_type === 5) {
              return {
                values: attr.values,
                id: attr.id,
              };
            } else if (
              attr.field_type === 6 ||
              attr.field_type === 7 ||
              attr.field_type === 8 ||
              attr.field_type === 9 ||
              attr.field_type === 10 ||
              attr.field_type === 11 ||
              attr.field_type === 12
            ) {
              return {
                values: attr.values,
                id: attr.id,
              };
            }
          })
        );
      }
    }
  }, [my_account_listing_details]);

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

  // imageUpload
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

  const imageDelete = async (id) => {
    const all_images_filter = all_images.filter((image) => image.id !== id);
    setAll_images(all_images_filter);
  };

  const closePopUP = () => {
    dispatch(clearStoreState());
    setShowError(false);
    setError_message('');
  };

  // console.log('====================================');
  // console.log(editorData);
  // console.log('====================================');

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
            <EditListingSuccess
              message={'Your listing updated successfully'}
              setShowSuccessMessage={setShowSuccessMessage}
              dispatch={dispatch}
              productId={productId}
              auth_key={auth_key}
            />
          </OutsideClickHandler>
        </Modal>
      )}

      <h3 className=" text-center font-semibold text-2xl text-primary mb-7">
        Edit Your Listing
      </h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="block">
          <span className="text-gray-700">Listing Image</span>
          <input
            id="imageButtonInput"
            type="file"
            className=" hidden"
            accept=".png , .jpg"
            placeholder=""
            onChange={(e) => imageUpload(e)}
            multiple
          />
          <div className=" mt-1 flex flex-col  gap-3">
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

            {(all_images.length === 0 ||
              all_images[0]?.full_file !== undefined) && (
              <button
                className=" w-[100px]  h-[100px] flex justify-center items-center    bg-gray-100 text-sm rounded "
                onClick={() => imageButtonClick()}
              >
                Add Image
              </button>
            )}
          </div>
          <p className=" text-sm mt-2 font-normal text-default_gray">
            Max. {listing_configs?.listing_pictures_count} photos per listing
          </p>
        </div>
        <label className="block">
          <span className="text-gray-700">Listing Title</span>
          <input
            value={title}
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
              value={slug}
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
          {/* <New/> */}
          {/* {CustomEditor && <CustomEditor data={editorData} />} */}
          <Markdown_Editor
            oldValue={description}
            setMarkdownValue={setDescription}
          />
          {/* <textarea
            className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
            rows="4"
            onChange={(e) => e.target.value}
          ></textarea> */}
        </label>

        {listing_configs?.meta_title && (
          <label className="block">
            <span className="text-gray-700">Listing Meta Title</span>
            <input
              type="text"
              value={meta_title}
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
              value={meta_description}
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
              value={meta_keyword}
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
            <span className="text-gray-700">Store Address</span>
            <SearchAddress
              setCoordinates={setCoordinates}
              addressSearchKey={addressSearchKey}
              setAddressSearchKey={setAddressSearchKey}
            />
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
            {/* <option hidden selected>
              Select Category
            </option> */}
            {allCategories?.map((category) => (
              <option
                selected={category.id === selectedCategory ? true : false}
                key={category.id}
                value={category.id}
              >
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
      <div className=" mt-9 flex justify-center ">
        <button
          className="text-white px-7 py-2 rounded-md bg-primary  flex items-center justify-center  "
          onClick={() =>
            edit_product_click(
              all_images?.map((image) => {
                return image.path;
              }) || null,
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
              productId,
              setEditProductLoading,
              setShowSuccessMessage,
              attributes
            )
          }
        >
          {editProductLoading && (
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
          Edit Listing
        </button>
      </div>
    </div>
  );
};

export default EditProductForm;
