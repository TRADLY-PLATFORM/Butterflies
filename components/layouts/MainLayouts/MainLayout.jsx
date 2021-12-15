/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import Header3 from '../../Header/Header3';
import Footer from '../../Footer/Footer';

const MainLayout = ({ children, pageTitle, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${pageDescription}`} />
        <meta property="og:title" content={`${pageTitle}`} key="title" />
      </Head>
      <div className="hidden md:block">
        {' '}
        <div className="  sticky  top-0 z-50 ">
          <Header3 />
        </div>
        <div className="bg-[#f6f9ff] min-h-screen  overflow-x-hidden px-[50px]  2xl:px-[12%] pt-5 pb-5">
          <div>{children}</div>
        </div>
        <div className="bg-wite min-h-[200px]   left-0 bottom-0 px-[50px]  2xl:px-[12%]">
          <Footer />
        </div>
      </div>

      <div className=" md:hidden">
        <div className="  sticky top-0 z-50  bg-white w-screen ">
          <Header3 />
        </div>
        <div className="w-screen min-h-screen bg-[#f6f9ff] pt-[24px] px-[16px] pb-10">
          {children}
        </div>
        <div className="bg-wite min-h-[200px]  left-0 bottom-0 px-[16px] xs:px-[35px] ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
