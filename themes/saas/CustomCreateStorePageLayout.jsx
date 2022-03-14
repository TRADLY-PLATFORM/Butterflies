import React from 'react';
import { useSelector } from 'react-redux';
import { configsSelector } from '../../store/feature/configsSlice';
import CreateStoreForm from '../../components/MyStore/CreateStore/CreateStoreForm';
import CustomCreateStoreForm from '../../components/MyStore/CreateStore/CustomCreateStoreFrom';

const CustomCreateStorePageLayout = () => {
  const { accounts_configs } = useSelector(configsSelector);

  return (
    <div className="  flex justify-center ">
      <div className=" bg-white  w-[700px]  p-10">
        <CustomCreateStoreForm accounts_configs={accounts_configs} />
      </div>
    </div>
  );
};

export default CustomCreateStorePageLayout;
