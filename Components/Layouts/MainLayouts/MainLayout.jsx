import React from "react";
import SideMenubar from "../../SideMenubar/SideMenubar"
import Header from "../../Header/Header"
 

const MainLayout = ({ children }) => {
	return (
		<div className=" flex ">
			<div className=" w-[245px]  fixed z-50 top-0 bottom-0 left-0 bg-white   shadow-c-sm ">
				<SideMenubar />
			</div>
			<div className=" w-full bg-[#f6f9ff] pl-[245px] pb-14 ">
				<div className="  sticky top-0 z-50 w-full  ">
					<Header />
				</div>
				<div className=" min-h-screen  w-full  bg-[#f6f9ff]">
					<div className=" ml-9 mr-4">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
