import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  get_all_accounts,
  storeSelector,
} from '../../../store/feature/storeSlice';
import Accounts from '../../AllAccounts/Accounts/Accounts';
import CustomLoading from '../../Shared/Loading/CustomLoading';

const AllAccountsPageLayout = () => {
  const dispatch = useDispatch();
  const { login, auth_key } = useSelector(authSelector);

  useEffect(() => {
    dispatch(
      get_all_accounts({
        bodyParam: { page: 1, type: 'accounts', per_page: 30 },
        authKey: auth_key,
      })
    );
  }, [0]);

  const moreAccounts = () => {
    dispatch(
      get_all_accounts({
        bodyParam: { page: 2, type: 'accounts', per_page: 30 },
        authKey: auth_key,
      })
    );
  };

  const { all_accounts, isAllAccountsFetching } = useSelector(storeSelector);

  return (
    <div>
      {isAllAccountsFetching && <CustomLoading />}
      <div>
        {all_accounts?.length > 0 && <Accounts accounts={all_accounts} />}
      </div>
      {/* <div>
        <button onClick={() => moreAccounts()}>SHOW MORE</button>
      </div> */}
    </div>
  );
};

export default AllAccountsPageLayout;
