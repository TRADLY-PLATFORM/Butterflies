import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { configsSelector } from '../../../store/feature/configsSlice';
import {
  accountDetails,
  myStore,
  storeSelector,
} from '../../../store/feature/storeSlice';
import EditStoreForm from '../../MyStore/EditStore/EditStoreForm';

const EditStorePageLayout = () => {
  const { auth_key, user_details } = useSelector(authSelector);
  const { accounts_configs } = useSelector(configsSelector);

  const dispatch = useDispatch();
  const router = useRouter();

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
      );
      dispatch(accountDetails({ id: router.query.id, authKey: auth_key }));
    }
  }, [auth_key, user_details, dispatch,router]);

  const { my_stores, my_account_details } = useSelector(storeSelector);

  return (
    <div className="  flex justify-center ">
      <div className=" bg-white  w-[700px]  p-10">
        {my_stores !== null &&
          my_account_details !==null &&(
            <EditStoreForm
              my_stores={my_stores}
              accountId={router.query.id}
              accounts_configs={accounts_configs}
              my_account_details={my_account_details}
            />
          )}
      </div>
    </div>
  );
};

export default EditStorePageLayout;
