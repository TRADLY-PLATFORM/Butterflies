import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  categories,
  currencies,
  listingCategories,
  storeSelector,
} from '../../../store/feature/storeSlice';
import AddProductForm from '../../MyStore/AddProduct/AddProductForm';
import SchedulePart from '../../MyStore/AddProduct/schedule/SchedulePart';
import VariantsPart from '../../MyStore/AddProduct/Variants/VariantsPart';

const AddEventPageLayout = () => {
  const { auth_key } = useSelector(authSelector);
  const { listing_configs } = useSelector(storeSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth_key) {
      dispatch(currencies({ authKey: auth_key }));
      dispatch(
        listingCategories({
          prams: { parent: 0, type: 'listings' },
          authKey: auth_key,
        })
      );
    }
  }, [auth_key]);

  return (
    <>
      <div className=" flex justify-center">
        <div className=" ">
          <div className="">
            <h3 className=" font-semibold text-[#121212] text-xl mb-4">
              Event Details
            </h3>
            <div className=" bg-white  w-[600px]  p-10">
              {listing_configs !== null && <AddProductForm />}
            </div>
          </div>
          <div className=" mt-8">
            <h3 className=" font-semibold text-[#121212] text-xl mb-4">
              Variants
            </h3>{' '}
            <div className="   w-[600px]  ">
              <VariantsPart />
            </div>
          </div>
        </div>
        <div className=" ml-[20px]">
          <h3 className=" font-semibold text-[#121212] text-xl mb-4">
            Date Event
          </h3>{' '}
          <div className="w-[438px] bg-white p-5  ">
            {' '}
            <SchedulePart />
          </div>
        </div>
      </div>
      <div className=" fixed bottom-0 right-0  w-full bg-white h-[95px] flex justify-end items-center">
        <button className="text-white mr-6 h-10 px-7 py-2 rounded-md bg-primary  flex items-center justify-center  ">
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddEventPageLayout;
