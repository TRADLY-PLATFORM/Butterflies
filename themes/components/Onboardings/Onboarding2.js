import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import OnboardingImage from '../../images/onboarding-image.jpg';
import OnboardingDecoration from '../../images/auth-decoration.png';
import { camera_icon } from '../../Constant/AllIcons';

import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';
import { add_general_configs, add_seo_configs } from '../../api/api';

function Onboarding2() {
  const { register, handleSubmit } = useForm();
  const [isLoadingseo,setIsLoadingSeo] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    add_seo_configs(data, router, setIsLoadingSeo);
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
                          <a className=" flex items-center justify-center w-6 h-6 bg-indigo-500 rounded-full text-xs font-semibold  text-white">
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
                  SEO information ✨
                </h1>
                {/* htmlForm */}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4 mb-8">
                    {/*Web app deployment site URL

                     */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="company-name"
                      >
                        Meta Title
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        id="meta_title"
                        className="form-input w-full"
                        type="text"
                        {...register('meta_title')}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="company-name"
                      >
                        Meta Description
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        id="meta_description"
                        className="form-input w-full"
                        type="text"
                        {...register('meta_description')}
                      />
                    </div>

                    {/* meta_account_title
                     */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="street"
                      >
                        Meta Account Title
                      </label>
                      <input
                        id="meta_account_title"
                        className="form-input w-full"
                        type="text"
                        {...register('meta_account_title')}
                      />
                    </div>
                    {/* meta_account_description */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="street"
                      >
                        Meta Account Description
                      </label>
                      <input
                        id="meta_account_description"
                        className="form-input w-full"
                        type="text"
                        {...register('meta_account_description')}
                      />
                    </div>
                    {/*meta_listing_title
                     */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="street"
                      >
                        Meta Listing Title
                      </label>
                      <input
                        id="meta_listing_title"
                        className="form-input w-full"
                        type="text"
                        {...register('meta_listing_title')}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="street"
                      >
                        Meta Listing Description
                      </label>
                      <input
                        id="meta_listing_description"
                        className="form-input w-full"
                        type="text"
                        {...register('meta_listing_description')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/onboarding">
                      <a className=" btn text-sm underline hover:no-underline">
                        Back
                      </a>
                    </Link>
                    <button type="submit">
                      <a className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">
                        {isLoadingseo && (
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
