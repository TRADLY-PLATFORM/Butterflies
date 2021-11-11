import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  myAccountListings,
  myStore,
  storeSelector,
} from '../../../store/feature/storeSlice';
import StoreListings from '../../MyStore/MyStoreListings/StoreListings';
import NoProducts from '../../MyStore/NoProducts/NoProducts';
import NoStore from '../../MyStore/NoStore/NoStore';
import StoreProfile from '../../MyStore/StoreProfile/StoreProfile';

const MyStorePageLayout = () => {
  const { auth_key, user_details } = useSelector(authSelector);
  const dispatch = useDispatch();
  const router =useRouter()

  useEffect(() => {
    if (auth_key) {
      dispatch(
        myStore({
          prams: {
            page: 1,
            type: 'accounts',
            user_id: user_details.id,
          },
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          dispatch(
            myAccountListings({
              prams: { page: 1, account_id: res.payload.accounts[0].id },
              authKey: auth_key,
            })
          );
        }
      });
    }
  }, [auth_key, user_details, dispatch]);

  const { my_stores, my_store_listings } = useSelector(storeSelector);

  return (
    <div>
      {my_stores !== null &&
        (my_stores.length > 0 ? (
          <div>
            <div>
              <StoreProfile my_stores={my_stores} />
            </div>
            <div className=" mt-6">
              {my_store_listings !== null &&
                (my_store_listings.length > 0 ? (
                  <>
                    <div className=" my-5  flex justify-end">
                      <button
                        className=" px-6 py-2 bg-primary rounded-md text-white text-base "
                        onClick={() =>
                          router.push({
                            pathname: '/stores/add-product',
                            query: { account_id: my_stores[0].id },
                          })
                        }
                      >
                        Add Product
                      </button>
                    </div>
                    <div>
                      <StoreListings
                        my_store_listings={my_store_listings}
                        my_stores={my_stores}
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <NoProducts my_stores={my_stores} />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className=" ">
            <NoStore />
          </div>
        ))}
    </div>
  );
};

export default MyStorePageLayout;
