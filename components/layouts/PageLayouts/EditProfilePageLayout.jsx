import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import EditProfile from '../../EditProfile/EditProfile';

const EditProfilePageLayout = () => {
  const { login } = useSelector(authSelector);
  const router = useRouter();
  useEffect(() => {
    if (!login) {
      router.push('/');
    }
  }, [router, login]);
  return (
    <div className="flex   justify-center w-full">
      {login && (
        <div className="w-full flex justify-center">
          <EditProfile />
        </div>
      )}
    </div>
  );
};

export default EditProfilePageLayout;
