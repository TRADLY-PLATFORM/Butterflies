import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import OnboardingImage from '../../images/onboarding-image.jpg';
import OnboardingDecoration from '../../images/auth-decoration.png';
import { camera_icon } from '../../Constant/AllIcons';
import { useForm } from 'react-hook-form';

function Onboarding2() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

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
                    <svg width="32" height="32" viewBox="0 0 32 32">
                      <defs>
                        <linearGradient
                          x1="28.538%"
                          y1="20.229%"
                          x2="100%"
                          y2="108.156%"
                          id="logo-a"
                        >
                          <stop
                            stopColor="#A5B4FC"
                            stopOpacity="0"
                            offset="0%"
                          />
                          <stop stopColor="#A5B4FC" offset="100%" />
                        </linearGradient>
                        <linearGradient
                          x1="88.638%"
                          y1="29.267%"
                          x2="22.42%"
                          y2="100%"
                          id="logo-b"
                        >
                          <stop
                            stopColor="#38BDF8"
                            stopOpacity="0"
                            offset="0%"
                          />
                          <stop stopColor="#38BDF8" offset="100%" />
                        </linearGradient>
                      </defs>
                      <rect fill="#6366F1" width="32" height="32" rx="16" />
                      <path
                        d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                        fill="#4F46E5"
                      />
                      <path
                        d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                        fill="url(#logo-a)"
                      />
                      <path
                        d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                        fill="url(#logo-b)"
                      />
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
                        <Link href="/onboarding-01">
                          <a className=" flex items-center justify-center w-6 h-6 bg-indigo-500 rounded-full text-xs font-semibold  text-white">
                            1
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/onboarding-02">
                          <a className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                            2
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/onboarding-03">
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
                {/* htmlForm */}

                <div className="    my-4">
                  <input
                    id="imageButtonInput"
                    type="file"
                    className=" hidden"
                    accept=".png , .jpg"
                    placeholder=""
                    onChange={(e) => imageUpload(e)}
                  />
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="company-name"
                  >
                    Web logo <span className="text-red-500">*</span>
                  </label>

                  <button
                    className=" w-[100px]  h-[100px] flex flex-col justify-center items-center  mt-3    text-sm    border border-primary border-dashed rounded-lg"
                    // onClick={() => imageButtonClick()}
                  >
                    <span className="p-[10px] bg-primary rounded-full">
                      {camera_icon}
                    </span>

                    <span className="mt-2"> Add photo</span>
                  </button>
                </div>
                <div className="    my-4">
                  <input
                    id="imageButtonInput"
                    type="file"
                    className=" hidden"
                    accept=".png , .jpg"
                    placeholder=""
                    onChange={(e) => imageUpload(e)}
                  />
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="company-name"
                  >
                    Web favicon <span className="text-red-500">*</span>
                  </label>

                  <button
                    className=" w-[100px]  h-[100px] flex flex-col justify-center items-center  mt-3    text-sm    border border-primary border-dashed rounded-lg"
                    // onClick={() => imageButtonClick()}
                  >
                    <span className="p-[10px] bg-primary rounded-full">
                      {camera_icon}
                    </span>

                    <span className="mt-2"> Add photo</span>
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4 mb-8">
                    {/*Buisness name */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="company-name"
                      >
                        Business Name
                      </label>
                      <input
                        id="company-name"
                        className="form-input w-full"
                        type="text"
                        {...register('example')}
                      />
                    </div>
                    {/*Web app deployment site URL */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="company-name"
                      >
                        Web app deployment site URL
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="company-name"
                        className="form-input w-full"
                        type="text"
                      />
                    </div>
                    {/* Terms & Condition */}
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="city"
                        >
                          Terms & Condition
                        </label>
                        <input
                          id="city"
                          className="form-input w-full"
                          type="text"
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
                          id="postal-code"
                          className="form-input w-full"
                          type="text"
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
                        id="street"
                        className="form-input w-full"
                        type="text"
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
                        id="street"
                        className="form-input w-full"
                        type="text"
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
                        id="street"
                        className="form-input w-full"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/onboarding-02">
                      <a className=" btn text-sm underline hover:no-underline">
                        Back
                      </a>
                    </Link>
                    <Link href="/onboarding-04">
                      <a className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">
                        Next Step
                      </a>
                    </Link>
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
