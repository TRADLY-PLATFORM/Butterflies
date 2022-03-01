import React, { useState } from 'react';

const KYC_Document = () => {
  const [imagePath, setImagePath] = useState(null);
  const [files, setFiles] = useState(null);
  return (
    <div className=" w-full mx-auto ">
      <div className="py-12 mx-auto ">
        <h2 className="text-2xl font-bold text-center">KYC Details</h2>
        <div className="max-w-md mx-auto  mt-6">
          <label
            className="mt-6 block max-w-[448px]
                mx-auto"
          >
            <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px]">
              Identity Proof (PDF,DOC,PNG,JPG)
            </span>
          </label>
          <input
            id="fileButton"
            type="file"
            className=" hidden"
            accept="*/"
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
          {imagePath !== null ? (
            <div className=" relative w-full mt-4 flex flex-col items-center border-2 border-primary border-dashed py-2">
              <p>{files.name}</p>
              <button
                className="text-red-400 text-sm font-normal mt-2 "
                onClick={() => {
                  return setImagePath(null), setFiles(null);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className=" w-full border-2 border-primary border-dashed py-10 flex justify-center items-center  mt-3  bg-gray-100  rounded text-base  font-semibold "
              onClick={() => document.getElementById('fileButton').click()}
            >
              Add file
            </button>
          )}
        </div>

        <div className="mt-6 max-w-[448px] mx-auto">
          <button
            className="w-full px-8 py-2 bg-primary rounded-md text-white "
            onClick={() => router.push('/mangopay/kyc_document')}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYC_Document;
