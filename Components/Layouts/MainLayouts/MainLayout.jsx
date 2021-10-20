import React from "react";
import SideMenubar from "../../SideMenubar/SideMenubar"
import Header from "../../Header/Header"
 

const MainLayout = ({ children }) => {
	return (
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
					<div className=" ml-9 mr-4">{children}</div>
				</div>
			</div>

			{/* Mobile Size */}

			<div className=" md:hidden">
				<div className="  sticky top-0 z-50  bg-white w-screen ">
					<Header />
				</div>
				<div className="w-screen bg-[#f6f9ff] pt-[24px] px-[32px] pb-14">
					{children}
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
