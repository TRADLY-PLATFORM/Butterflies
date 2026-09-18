/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import Header3 from '../../components/Header/Header3';
import Footer from '../../components/Footer/Footer';

// Garden theme shell: calm cream canvas, shared header/footer.
// Only the page layouts differ from the product theme.
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
          <Header3 />
        </div>
        <div className="bg-garden-cream min-h-screen overflow-x-hidden px-4 md:px-[50px] 2xl:px-[12%] pt-5 pb-10 md:pb-5">
          <div>{children}</div>
        </div>
        <div className="bg-white min-h-[200px] left-0 bottom-0 px-[16px] xs:px-[35px] md:px-[50px] 2xl:px-[12%] border-t border-garden-moss/20">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
