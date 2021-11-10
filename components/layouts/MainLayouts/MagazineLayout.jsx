/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Header2 from '../../Header/Header2';
  import Head from "next/head";


const  MagazineLayout = ({ children, pageTitle, pageDescription }) => {
	const [showUserMenus, setShowUserMenus] = useState(false);
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
			<div>
				{showUserMenus ? (
					<div className=" w-[100vw] h-[100vh]   top-0 z-[50] fixed    bg-transparent    opacity-100" />
				) : (
					""
				)}
				<div className="  sticky  top-0 z-50 ">
					{/* <div className="flex items-center">
					<Link href="/"  >
						<div className=" flex items-center   relative cursor-pointer ">
							<Image
								src={logo}
								height={44}
								alt="logo"
							/>
						</div>
					</Link>

					<div className="ml-[35px]">
						<SearchBox />
					</div>
				</div>
				<div className="flex items-center">
					<div className="mr-[37px]">
						<HeaderButton />
					</div>
					<div>
						<HeaderProfile
							showUserMenus={showUserMenus}
							setShowUserMenus={
								setShowUserMenus
							}
						/>
					</div>
				</div> */}
					<Header2 />
				</div>
				<div className="bg-[#f6f9ff] min-h-screen  overflow-x-hidden">
					<div>{children}</div>
				</div>
			</div>
		</>
	);
};

export default MagazineLayout;