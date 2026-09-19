/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import GardenHeader from './GardenHeader';
import GardenFooter from './GardenFooter';

// Garden theme shell: calm cream canvas with garden header + footer.
const MainLayout = ({ children, pageTitle, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${pageDescription}`} />
        <meta property="og:title" content={`${pageTitle}`} key="title" />
      </Head>
      <div className="">
        <div className="sticky top-0 z-50">
          <GardenHeader />
        </div>
        <div className="bg-garden-cream min-h-screen overflow-x-hidden px-4 md:px-[50px] 2xl:px-[12%] pt-5 pb-10 md:pb-5">
          <div>{children}</div>
        </div>
        <GardenFooter />
      </div>
    </>
  );
};

export default MainLayout;
