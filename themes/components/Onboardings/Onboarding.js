import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import OnboardingImage from '../../images/onboarding-image.jpg';
import OnboardingDecoration from '../../images/auth-decoration.png';
import { camera_icon } from '../../Constant/AllIcons';
import { useForm } from 'react-hook-form';
import { add_general_configs, image_url } from '../../api/api';
import { useRouter } from 'next/dist/client/router';

function Onboarding2() {
  const { register, handleSubmit } = useForm();
  const [logoPath, setLogoPath] = useState(null);
  const [logo_files, setLogoFiles] = useState(null);

  const [faviconPath, setFaviconPath] = useState(null);
  const [favicon_files, setFaviconFiles] = useState(null);

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const onSubmit =  (data) => {
   
     
    add_general_configs(logo_files,favicon_files, data,router,setIsLoading)
  };

  return (
    <main className="bg-white">
      <div className="relative grid  md:grid-cols-2">
        {/* Content */}
        <div className="w-full  ">
          <div className="min-h-screen h-full w-full flex flex-col after:flex-1 ite">
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/">
                  <a className="block">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 126 126"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M63 0C97.7939 0 126 28.2061 126 63C126 97.7939 97.7939 126 63 126C28.2061 126 0 97.7939 0 63C0 28.2061 28.2061 0 63 0Z"
                        fill="url(#paint0_linear)"
                      />
                      <path
                        opacity="0.5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M63 119C93.9279 119 119 93.9279 119 63C119 32.0721 93.9279 7 63 7C32.0721 7 7 32.0721 7 63C7 93.9279 32.0721 119 63 119Z"
                        stroke="white"
                        strokeWidth="1.4"
                      />
                      <path
                        opacity="0.5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M63 105C86.196 105 105 86.196 105 63C105 39.804 86.196 21 63 21C39.804 21 21 39.804 21 63C21 86.196 39.804 105 63 105Z"
                        stroke="white"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M108.282 44.2442C105.799 38.2551 102.162 32.8652 97.6482 28.3518C88.7809 19.4845 76.5309 14 63 14C49.469 14 37.219 19.4845 28.3517 28.3518C23.8383 32.8652 20.2012 38.2551 17.7178 44.2442"
                        stroke="white"
                        strokeWidth="15.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M63.0001 14.0001V111.222"
                        stroke="white"
                        strokeWidth="15.4"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="126"
                          y1="0"
                          x2="126"
                          y2="126"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#2BDBC0" />
                          <stop offset="1" stopColor="#13B58C" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </a>
                </Link>
              </div>

              {/* Progress bar */}
              <div className="px-4 pt-12 pb-8">
                <div className="max-w-md mx-auto w-full">
                  <div className="relative">
                    <div
                      className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></div>
                    <ul className="relative flex justify-between w-full">
                      <li>
                        <Link href="/themes/onboarding">
                          <a className=" flex items-center justify-center w-6 h-6 bg-indigo-500 rounded-full text-xs font-semibold  text-white">
                            1
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/themes/onboarding2">
                          <a className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                            2
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/themes/onboarding3">
                          <a className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                            3
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl text-gray-800 font-bold mb-6">
                  Project information ✨
                </h1>

                <div className="my-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="company-name"
                  >
                    Web logo <span className="text-red-500">*</span>
                  </label>
                  {logoPath !== null ? (
                    <div className=" relative w-[100px] mt-4">
                      <Image
                        src={logoPath.path}
                        alt="account image"
                        width={100}
                        height={100}
                        objectFit="cover"
                      />
                      <button
                        className=" absolute -top-2 -right-2 text-primary "
                        onClick={() => {
                          return setLogoPath(null), setLogoFiles(null);
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
                    <div className="my-4">
                      <input
                        required
                        id="logoInput"
                        type="file"
                        className=" hidden"
                        accept=".png , .jpg"
                        placeholder=""
                        onChange={(e) => {
                          return (
                            e.target.files.length > 0 &&
                            (setLogoPath({
                              id: 'logo',
                              path: URL.createObjectURL(e.target.files[0]),
                            }),
                            setLogoFiles({
                              id: 'logo',
                              image_file: e.target.files[0],
                            }))
                          );
                        }}
                      />

                      <button
                        className=" w-[100px]  h-[100px] flex flex-col justify-center items-center  mt-3    text-sm    border border-primary border-dashed rounded-lg"
                        onClick={() =>
                          document.getElementById('logoInput').click()
                        }
                      >
                        <span className="p-[10px] bg-primary rounded-full">
                          {camera_icon}
                        </span>

                        <span className="mt-2"> Add photo</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="    my-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="company-name"
                  >
                    Web favicon <span className="text-red-500">*</span>
                  </label>

                  {faviconPath !== null ? (
                    <div className=" relative w-[100px] mt-4">
                      <Image
                        src={faviconPath.path}
                        alt="account image"
                        width={100}
                        height={100}
                        objectFit="cover"
                      />
                      <button
                        className=" absolute -top-2 -right-2 text-primary "
                        onClick={() => {
                          return setFaviconPath(null), setFaviconFiles(null);
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
                    <div className="my-4">
                      <input
                        required
                        id="logoInput"
                        type="file"
                        className=" hidden"
                        accept=".png , .jpg"
                        placeholder=""
                        onChange={(e) => {
                          return (
                            e.target.files.length > 0 &&
                            (setFaviconPath({
                              id: 'logo',
                              path: URL.createObjectURL(e.target.files[0]),
                            }),
                            setFaviconFiles({
                              id: 'logo',
                              image_file: e.target.files[0],
                            }))
                          );
                        }}
                      />

                      <button
                        className=" w-[100px]  h-[100px] flex flex-col justify-center items-center  mt-3    text-sm    border border-primary border-dashed rounded-lg"
                        onClick={() =>
                          document.getElementById('logoInput').click()
                        }
                      >
                        <span className="p-[10px] bg-primary rounded-full">
                          {camera_icon}
                        </span>

                        <span className="mt-2"> Add photo</span>
                      </button>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4 mb-8">
                    {/*website_name */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="company-name"
                      >
                        Business Name
                      </label>
                      <input
                        id="website_name"
                        className="form-input w-full"
                        type="text"
                        {...register('website_name')}
                      />
                    </div>
                    {/*Web app deployment site URL */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="site_url"
                      >
                        Web app deployment site URL
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        id="site_url"
                        className="form-input w-full"
                        type="text"
                        {...register('site_url')}
                      />
                    </div>
                    {/* Terms & Condition */}
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="terms_url"
                        >
                          Terms & Condition
                        </label>
                        <input
                          id="terms_url"
                          className="form-input w-full"
                          type="text"
                          {...register('terms_url')}
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="postal-code"
                        >
                          Faq
                        </label>
                        <input
                          id="faq_url"
                          className="form-input w-full"
                          type="text"
                          {...register('faq_url')}
                        />
                      </div>
                    </div>
                    {/* Support
                     */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="street"
                      >
                        Support
                      </label>
                      <input
                        id="support_url"
                        className="form-input w-full"
                        type="text"
                        {...register('support_url')}
                      />
                    </div>
                    {/* Privacy URL */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="street"
                      >
                        Privacy URL
                      </label>
                      <input
                        id="privacy_policy_url"
                        className="form-input w-full"
                        type="text"
                        {...register('privacy_policy_url')}
                      />
                    </div>
                    {/*Tgoogle_map_api_key
                     */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="street"
                      >
                        Google map API key
                      </label>
                      <input
                        id="google_map_api_key"
                        className="form-input w-full"
                        type="text"
                        {...register('google_map_api_key')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/">
                      <a className=" btn text-sm underline hover:no-underline">
                        Back
                      </a>
                    </Link>
                    <button type="submit">
                      <a className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto flex items-center">
                        {isLoading && (
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        )}
                        Next Step
                      </a>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block   top-0 bottom-0 right-0  "
          aria-hidden="true"
        >
          <div className=" relative w-full h-full">
            <Image
              className="object-cover object-center w-full h-full"
              src={OnboardingImage}
              layout="fill"
              alt="Onboarding"
            />
          </div>
          {/* <Image
            className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
            src={OnboardingDecoration}
            width="218"
            height="224"
            alt="Authentication decoration"
          /> */}
        </div>
      </div>
    </main>
  );
}

export default Onboarding2;
