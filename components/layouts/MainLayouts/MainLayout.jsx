/* eslint-disable react/prop-types */
import React from "react";
import SideMenubar from "../../SideMenubar/SideMenubar"
import Header from "../../Header/Header"
 import Head from "next/head";


const MainLayout = ({ children, pageTitle,pageDescription }) => {
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta
					name="description"
					content={`${pageDescription}`}
				/>
				<meta
					property="og:title"
					content={`${pageTitle}`}
					key="title"
				/>
			</Head>
			<div className=" flex ">
				{/* Web Size */}
				<div className=" hidden md:block w-[245px]  fixed z-50 top-0 bottom-0 left-0 bg-white   shadow-c-sm ">
					<SideMenubar />
				</div>
				<div className=" hidden md:block w-full bg-[#f6f9ff] pl-[245px] pb-14 ">
					<div className="  sticky top-0 z-50 w-full  ">
						<Header />
					</div>
					<div className=" min-h-screen  w-full  bg-[#f6f9ff]">
						<div className=" ml-5 mr-5">
							{children}
						</div>
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

export default MainLayout;
