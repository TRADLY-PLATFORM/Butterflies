import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import { configsSelector } from '../../store/feature/configsSlice';
import {
  account_full_details,
  myStore,
  storeSelector,
} from '../../store/feature/storeSlice';
import CustomEditStoreForm from '../../components/MyStore/EditStore/CustomEditStoreForm';
import EditStoreForm from '../../components/MyStore/EditStore/EditStoreForm';

const CustomEditStorePageLayout = () => {
  const { auth_key, user_details } = useSelector(authSelector);
  const { accounts_configs } = useSelector(configsSelector);

  const [my_account_details, setMy_account_details] = useState(null);

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
      axios
        .get(`/api/a/${router.query.id}`)
        .then((res) => {
          setMy_account_details(res.data.account);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth_key, user_details, dispatch, router]);

  const { my_stores } = useSelector(storeSelector);

  return (
    <div className="  flex justify-center ">
      <div className=" bg-white  w-[700px]  p-10">
        {my_stores !== null && my_account_details !== null && (
          <CustomEditStoreForm
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

export default CustomEditStorePageLayout;
