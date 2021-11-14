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

const AddProductPageLayout = () => {
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
    <div className="  flex justify-center ">
      <div className=" bg-white  w-[700px]  p-10">
        {listing_configs !== null && <AddProductForm />}
      </div>
    </div>
  );
};

export default AddProductPageLayout;
