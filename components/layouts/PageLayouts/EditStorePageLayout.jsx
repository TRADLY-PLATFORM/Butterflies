import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { myStore, storeSelector } from '../../../store/feature/storeSlice';
import EditStoreForm from '../../MyStore/EditStore/EditStoreForm';

const EditStorePageLayout = () => {
  const { auth_key, user_details } = useSelector(authSelector);
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
    }
  }, [auth_key, user_details, dispatch]);

  const { my_stores } = useSelector(storeSelector);

  return (
    <div className="  flex justify-center ">
      <div className=" bg-white  w-[700px]  p-10">
        {my_stores !== null && <EditStoreForm my_stores={my_stores} accountId={router.query.id} />}
      </div>
    </div>
  );
};

export default EditStorePageLayout;
