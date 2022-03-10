/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { uuid } from 'uuidv4';
import { useDispatch } from 'react-redux';
import {
  authSelector,
  clearState,
  signIn,
  verifyUserEmail,
} from '../../store/feature/authSlice';
import PopUp from '../Shared/PopUp/PopUp';
import * as EmailValidator from 'email-validator';
import { useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from 'next/dist/client/router';

const ForgotPasswordForm = ({ general_configs }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const { isFetching, isSuccess, errorMessage, isError } =
    useSelector(authSelector);

  const closePopUP = () => {
    dispatch(clearState());
    setShowError(false);
    setError_message('');
  };

  const clickVerify = () => {
    if (email === null) {
      setShowError(true);
      setError_message('Email is required');
      return false;
    }
    if (!EmailValidator.validate(email)) {
      setShowError(true);
      setError_message('Enter your valid email');
      return false;
    }

    const uUid = uuid();
    const users = {
      user: {
        email: email,
      },
    };

    dispatch(verifyUserEmail({ prams: users })).then((res) => {
      if (!res.payload.code) {
       if (router.query.to) {
         router.push(
           `/forgot-password/set-password?verify_id=${res.payload.verify_id}&to=${router.query.to}`
         );
       } else {
         router.push({
           pathname: '/forgot-password/set-password',
           query: { verify_id: res.payload.verify_id },
         });
       }
      }
    });
  };

  return (
    <div className="w-full   min-h-screen  py-36">
      {(showError || isError) && (
        <OutsideClickHandler
          onOutsideClick={() => {
            (showError || isError) &&
              (setShowError(false),
              setError_message(''),
              dispatch(clearState()));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp
                message={error_message || errorMessage}
                closePopUP={closePopUP}
              />
            </div>
          </div>
        </OutsideClickHandler>
      )}

      <h2 className=" px-[34px]  md:px-24  text-center text-white text-[30px] md:text-[40px] font-semibold mb-4">
        {general_configs?.registration_title}
      </h2>
      <p className=" px-[34px]  md:px-24  text-center text-white text-xl  font-semibold ">
        Forgot your password ?
      </p>
      <div className=" mt-24 px-[34px]  ">
        <div className="flex justify-center">
          <input
            type="text"
            className=" w-full md:w-[390px]  h-12 mb-6 bg-transparent border  border-white  rounded-[48px] p-3 text-white outline-none placeholder-white focus:border-white focus:ring-0"
            placeholder="Enter you account email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" mt-12 flex flex-col justify-center items-center">
          {isFetching ? (
            <button
              className=" mb-8  w-full  xs:w-72 h-12 flex justify-center items-center bg-white rounded-[48px] text-primary font-semibold  text-base"
              disabled
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verify
            </button>
          ) : (
            <button
              className=" mb-8  w-full  xs:w-72 h-12 flex justify-center items-center bg-white rounded-[48px] text-primary font-semibold  text-base"
              onClick={clickVerify}
            >
              Verify
            </button>
          )}
        </div>
        <div className=" mt-[68px] flex justify-center items-center">
          <Link
            href={
              router.query.to ? `/sign-in?to=${router.query.to}` : '/sign-in'
            }
            passHref
          >
            <button className=" w-full md:w-96 h-6 flex justify-center items-center bg-transparent   text-white  font-medium text-base  xs:text-xl">
              Already have an account?
              <span className="font-semibold ml-2">Login</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
