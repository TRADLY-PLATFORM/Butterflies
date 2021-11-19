import React from 'react';
import { useSelector } from 'react-redux';
import { configsSelector } from '../../../store/feature/configsSlice';
import CreateStoreForm from '../../MyStore/CreateStore/CreateStoreForm';

const CreateStorePageLayout = () => {
	const{accounts_configs}=useSelector(configsSelector)
 
    return (
      <div className="  flex justify-center ">
        <div className=" bg-white  w-[700px]  p-10">
          <CreateStoreForm accounts_configs={accounts_configs} />
        </div>
      </div>
    );
};

export default CreateStorePageLayout;