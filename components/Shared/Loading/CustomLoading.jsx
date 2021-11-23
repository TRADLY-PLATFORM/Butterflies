import React from 'react';

const CustomLoading = () => {
  return (
    <div className=" fixed h-screen w-screen top-0 right-0 bg-black  z-[10000000000] bg-opacity-25">
      <div className=" w-full h-full flex justify-center items-center">
        <div
          className="
      animate-spin
      rounded-full
      h-32
      w-32
      border-t-2 border-b-2 border-primary 
    "
        ></div>
      </div>
    </div>
  );
};

export default CustomLoading;
