/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import SideMenubar from '../../SideMenubar/SideMenubar';
import Header from '../../Header/Header';
import Head from 'next/head';
import ProductSideMenubar from '../../SideMenubar/ProductSideMenubar';

const MainLayout2 = ({ children, pageTitle, pageDescription }) => {
  const [marketplace_type, setMarketplace_type] = useState(null);
  useEffect(() => {
    setMarketplace_type(Number(localStorage.getItem('marketplace_type')));
  }, [0]);
  const selectmenubar = () => {
    if (!marketplace_type === 1) {
      return <ProductSideMenubar />;
    } else {
      return <SideMenubar />;
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${pageDescription}`} />
        <meta property="og:title" content={`${pageTitle}`} key="title" />
      </Head>
      <div className=" flex ">
        {/* Web Size */}
        <div className=" hidden md:block w-[245px]  fixed z-50 top-0 bottom-0 left-0 bg-white   shadow-c-sm ">
          {selectmenubar()}
        </div>
        <div className=" hidden md:block w-full bg-[#f6f9ff] pl-[245px] pb-14 ">
          <div className="  sticky top-0 z-50 w-full  ">
            <Header />
          </div>
          <div className=" min-h-screen  w-full  bg-[#f6f9ff]">
            <div className=" ml-5 mr-5">{children}</div>
          </div>
        </div>

        {/* Mobile Size */}

        <div className=" md:hidden">
          <div className="  sticky top-0 z-50  bg-white w-screen ">
            <Header />
          </div>
          <div className="w-screen min-h-screen bg-[#f6f9ff] pt-[24px] px-[16px] pb-14">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout2;
