import React from 'react';
import CreateStoreForm from '../../MyStore/CreateStore/CreateStoreForm';

const CreateStorePageLayout = () => {
    return (
		<div className="  flex justify-center ">
			<div className=" bg-white  w-[700px]  p-10">
				<CreateStoreForm />
			</div>
		</div>
    );
};

export default CreateStorePageLayout;