import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { saveChange } from './saveChange';
import OutsideClickHandler from 'react-outside-click-handler';
import PopUp from '../Shared/PopUp/PopUp';
import CustomLoading from '../Shared/Loading/CustomLoading';
import { authSelector } from '../../store/feature/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import SuccessPopUp from '../Shared/PopUp/Success';

const EditProfile = () => {
  const [imagePath, setImagePath] = useState(null);
  const [files, setFiles] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userId, setUserId] = useState(null);

  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [success_message, setSuccess_message] = useState('');

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth_key } = useSelector(authSelector);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    setFirstName(userDetails.first_name);
    setLastName(userDetails.last_name);
    if (userDetails.profile_pic) {
      setImagePath({ path: userDetails.profile_pic });
    }
    setUserId(userDetails.id);
  }, [0]);

  const closePopUP = () => {
    setShowError(false);
    setError_message('');
    setShowSuccess(false);
    setSuccess_message('');
  };

  return (
    <>
      {showError && (
        <OutsideClickHandler
          onOutsideClick={() => {
            showError && (setShowError(false), setError_message(''));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp message={error_message} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      {showSuccess && (
        <OutsideClickHandler
          onOutsideClick={() => {
            showSuccess && (setShowSuccess(false), setSuccess_message(''));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <SuccessPopUp message={success_message} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      {loading && <CustomLoading />}
      <div className="bg-[#ffffff] w-[95%]   md:w-[768px] min-h-[400px] rounded-[10px] shadow-c-xsm px-[38px]  grid items-center ">
        <div>
          <div className=" mb-[40px] flex justify-center">
            <input
              id="imageButton"
              type="file"
              className=" hidden"
              accept=".png , .jpg"
              placeholder=""
              onChange={(e) => {
                return (
                  e.target.files.length > 0 &&
                  (setImagePath({
                    id: e.target.files[0].name,
                    path: URL.createObjectURL(e.target.files[0]),
                  }),
                  setFiles(e.target.files[0]))
                );
              }}
            />
            <div>
              {imagePath !== null ? (
                <div className=" relative w-[100px] mt-4">
                  <Image
                    src={imagePath.path}
                    alt="Account image"
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                  <button
                    className=" absolute -top-2 -right-2 text-primary "
                    onClick={() => {
                      return setImagePath(null), setFiles(null);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  className=" w-[100px]  h-[100px] flex justify-center items-center  mt-3  bg-gray-100 text-sm rounded "
                  onClick={() => document.getElementById('imageButton').click()}
                >
                  Add Image
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <input
                value={firstName}
                type="text"
                className="
                    mt-0
                    block
                    w-full
                    px-4
                    rounded-xl
                    even:
                    border-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="block">
              <input
                value={lastName}
                type="text"
                className="
                    mt-0
                    block
                    w-full
                    px-4
                    rounded-xl
                    even:
                    border-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div className="flex justify-end mt-7">
            <button
              className="w-[130px] h-[35px] flex justify-center items-center bg-primary rounded-md text-white "
              onClick={() => {
                saveChange(
                  firstName,
                  lastName,
                  imagePath,
                  files,
                  setShowError,
                  setError_message,
                  setLoading,
                  auth_key,
                  userId,
                  dispatch,
                  setShowSuccess,
                  setSuccess_message,
                );
              }}
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
