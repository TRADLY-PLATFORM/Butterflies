import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  currencies,
  listingCategories,
  myAccountListingDetails,
  storeSelector,
} from '../../../store/feature/storeSlice';
import EditProductForm from '../../MyStore/EditProduct/EditProductForm';

const EditProductPageLayout = () => {
  const { auth_key } = useSelector(authSelector);
  const router = useRouter();
  const productId = router.query.product_id;

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
      dispatch(myAccountListingDetails({ id: productId, authKey: auth_key }));
    }
  }, [auth_key]);
  return (
    <div className="  flex justify-center ">
      <div className=" bg-white  w-[700px]  p-10">
        {listing_configs !== null && <EditProductForm />}
      </div>
    </div>
  );
};

export default EditProductPageLayout;
