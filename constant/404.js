import React from 'react';

const Error_Page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <article className="  flex  items-center gap-5 ">
          <h1 className=' text-black font-semibold  text-2xl'>404</h1>
          <span>|</span>
          <h2>This page could not be found.</h2>
        </article>
      </div>
    </div>
  );
};

export default Error_Page;
