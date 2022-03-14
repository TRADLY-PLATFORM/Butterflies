import React from 'react';
import ProfileMenus from '../../components/profile/ProfileMenus';
import UserBox from '../../components/profile/UserBox';

const ProfilePageLayout = () => {
  return (
    <div className="   lg:w-[700px] mx-auto">
      <div>
        <UserBox />
      </div>
      <div className=" mt-5">
        <ProfileMenus />
      </div>
    </div>
  );
};

export default ProfilePageLayout;
