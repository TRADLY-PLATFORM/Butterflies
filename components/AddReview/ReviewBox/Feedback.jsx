import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { camera_icon } from '../../Shared/Constant/Icons/AllIcons';

const Feedback = ({
  rating_title,
  setRating_title,
  rating_description,
  setRating_description,
  imagePath,
  setImagePath,
  files,
  setFiles,
  fullFile,
  setFullFile,
  send_review,
  isLoading,
}) => {
  // image functions
  const imageButtonClick = () => {
    document.getElementById('imageButtonInput').click();
  };

  const imageUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagePath([
        ...imagePath,
        { id: imagePath.length + 1, path: URL.createObjectURL(file) },
      ]);
      // setFile(e.target.files[0]);

      if (files.length > 0) {
        setFiles([
          ...files,
          { id: imagePath.length + 1, name: file.name, type: file.type },
        ]);
      } else {
        setFiles([
          { id: imagePath.length + 1, name: file.name, type: file.type },
        ]);
      }
      if (fullFile.length > 0) {
        setFullFile([...fullFile, file]);
      } else {
        setFullFile([file]);
      }
    }
  };

  const imageDelete = (id) => {
    const ImagePathFilter = imagePath.filter((image) => image.id !== id);
    const filesFilter = files.filter((file) => file.id !== id);
    const full_filesFilter = fullFile.filter((file, i) => i + 1 !== id);
    setImagePath(ImagePathFilter);

    setFiles(filesFilter);
    setFullFile(full_filesFilter);
  };

  return (
    <div className=" px-[5%] ms:px-[10%]  sm:px-[15%] md:px[20%]  xl:px-[25%] py-[17px]  ">
      <p className=" text-lg font-semibold text-black text-center">
        Share your feedback
      </p>

      <div className=" grid grid-rows-2 grid-cols-2 gap-4 mt-[40px]">
        <button
          className={[
            'border rounded-3xl py-1 px-3 border-primary text-primary text-xs ms:text-sm font-medium',
            rating_title === 'Excellent Service' && 'bg-primary text-white',
          ].join(' ')}
          onClick={() => setRating_title('Excellent Service')}
        >
          Excellent Service
        </button>
        <button
          className={[
            'border rounded-3xl py-1 px-3 border-primary text-primary text-xs ms:text-sm font-medium',
            rating_title === 'Great Product' && 'bg-primary text-white',
          ].join(' ')}
          onClick={() => setRating_title('Great Product')}
        >
          Great Product
        </button>
        <button
          className={[
            'border rounded-3xl py-1 px-3 border-primary text-primary text-xs ms:text-sm font-medium',
            rating_title === 'Good Packaging' && 'bg-primary text-white',
          ].join(' ')}
          onClick={() => setRating_title('Good Packaging')}
        >
          Good Packaging
        </button>
        <button
          className={[
            'border rounded-3xl py-1 px-3 border-primary text-primary text-xs ms:text-sm font-medium',
            rating_title === 'Fast Response' && 'bg-primary text-white',
          ].join(' ')}
          onClick={() => setRating_title('Fast Response')}
        >
          Fast Response
        </button>
      </div>
      <div className="mt-[30px]">
        <textarea
          value={rating_description}
          placeholder="Write your thank you note..."
          className="
                    mt-0
                    block
                    w-full
                    px-4
                    border-2   border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                    rounded-d
                  "
          name=""
          id=""
          rows="5"
          cols="30"
          onChange={(e) => setRating_description(e.target.value)}
        />
      </div>
      <div className="  flex flex-wrap justify-start items-center mt-8">
        <input
          id="imageButtonInput"
          type="file"
          className=" hidden"
          accept=".png , .jpg"
          placeholder=""
          onChange={(e) => imageUpload(e)}
        />
        {imagePath !== null &&
          imagePath?.map((singleImage) => {
            return (
              <div
                key={singleImage.id}
                className=" relative w-[100px] mt-4 mr-3"
              >
                <Image
                  src={singleImage.path}
                  alt="store image"
                  width={128}
                  height={128}
                  objectFit="contain"
                />
                <button
                  className=" absolute -top-2 -right-2 text-primary "
                  onClick={() => imageDelete(singleImage.id)}
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
            );
          })}

        <button
          className=" w-[128px]  h-[128px] flex flex-col justify-center items-center  mt-3    text-sm    border border-primary border-dashed rounded-lg"
          onClick={() => imageButtonClick()}
        >
          <span className="p-[15px] bg-primary rounded-full">
            {camera_icon}
          </span>

          <span className="mt-2"> Add your photo</span>
        </button>
      </div>
      <div className=" my-9">
        <button
          className=" capitalize text-base text-white bg-primary w-full  py-[14px]  rounded-full flex items-center justify-center"
          onClick={() => send_review()}
        >
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
          Send Review
        </button>
      </div>
    </div>
  );
};

export default Feedback;
