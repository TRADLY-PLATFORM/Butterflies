import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import { configsSelector } from '../../store/feature/configsSlice';
import {
  currencies,
  listingCategories,
  myAccountListingDetails,
  storeSelector,
} from '../../store/feature/storeSlice';
import EditProductForm from '../../components/MyStore/EditProduct/EditProductForm';
import EditSchedulePart from '../../components/MyStore/EditProduct/schedule/EditSchedulePart';
import EditVariantsPart from '../../components/MyStore/EditProduct/Variants/EditVariantsPart';

const EditProductPageLayout = () => {
  const { auth_key } = useSelector(authSelector);
  const router = useRouter();
  const productId = router.query.product_id;

  const { listing_configs } = useSelector(storeSelector);
  const { genral_configs, MARKETPLACE_MODULES, MARKETPLACE_FLAVOURS } =
    useSelector(configsSelector);

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
    <div className="  w-full pt-2  pb-20 flex items-center c-lg:items-start  flex-col gap-8 md:gap-2   c-lg:flex-row justify-center">
      <div className="w-full  c-lg:w-[60%] ">
        <div className=" bg-white  w-full  p-5 shadow-c-sm rounded-lg">
          {listing_configs !== null && <EditProductForm />}
        </div>
        {
          <div className="    w-[full  mt-9">
            {listing_configs !== null && <EditVariantsPart />}
          </div>
        }
      </div>
      {MARKETPLACE_MODULES == 2 && (
        <div className=" mt-9  c-lg:mt-0   c-lg:ml-[20px] w-full   c-lg:w-[30%]">
          <EditSchedulePart />
        </div>
      )}
    </div>
  );
};

export default EditProductPageLayout;
