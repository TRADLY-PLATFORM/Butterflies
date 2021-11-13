import React from 'react';

const AddVariantsForm = () => {
    return (
      <div className=" bg-white w-full px-[20px] py-[30px] mt-4 grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-gray-700">Variant Title</span>
          <input
            type="text"
            className="
                    mt-0
                    block
                    w-full
                    h-[27px]
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
            placeholder="Enter your title"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Variant Description</span>
          <textarea
            className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
            rows="3"
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">Price</span>
          <input
            type="text"
            className="
                    mt-0
                    block
                    w-full
                    h-[27px]
                    px-0.5 
                    border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
            placeholder="Enter your title"
          />
        </label>
        <div className=" flex justify-end"> 
          <button className=" bg-primary px-4 py-2 rounded-md text-white ">
            Add Variant
          </button>
        </div>
      </div>
    );
};

export default AddVariantsForm;