import React from 'react';
import EditProfile from '../../EditProfile/EditProfile';

const EditProfilePageLayout = () => {
    return (
      <div className="flex   justify-center w-full">
        <div className="w-full flex justify-center">
          <EditProfile />
        </div>
      </div>
    );
};

export default EditProfilePageLayout;