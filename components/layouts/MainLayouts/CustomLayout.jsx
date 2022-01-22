/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Header2 from '../../Header/Header2';
import Head from 'next/head';
import Header4 from '../../Header/Header4';
import Footer from '../../Footer/Footer';
import CustomFooter from '../../Footer/CustomFooter';

const CustomLayout = ({ children, pageTitle, pageDescription }) => {
  const [showUserMenus, setShowUserMenus] = useState(false);
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${pageDescription}`} />
        <meta property="og:title" content={`${pageTitle}`} key="title" />
      </Head>
      <div>
        <Header4 />
        <div className="mt-16  min-h-screen  overflow-x-hidden max-w-6xl mx-auto px-4 sm:px-6">
          <div>{children}</div>
        </div>
        <div className=" mt-16 md:mt-20 bg-wite min-h-[200px]  left-0 bottom-0 max-w-6xl mx-auto px-4 sm:px-6  ">
          <CustomFooter />
        </div>
      </div>
    </>
  );
};

export default CustomLayout;
