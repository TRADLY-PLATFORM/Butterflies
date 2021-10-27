import Image from 'next/Image';
import Link from 'next/Link';
import React, { useState } from 'react';
import logo from "../../../assets/Images/MobileSize/Tradly Logo.png"
import HeaderButton from '../../HeaderButton/HeaderButton';
import HeaderProfile from '../../HeaderProfileBox/HeaderProfile';
import SearchBox from '../../SearchBox/SearchBox';

const MagazineLayout = ({ children }) => {
 		const [showUserMenus, setShowUserMenus] = useState(false);
    return (
		<div>
			{showUserMenus ? (
				<div className=" w-[100vw] h-[100vh]   top-0 z-[50] fixed    bg-transparent    opacity-100" />
			) : (
				""
			)}
			<div className="h-[105px] px-8 flex justify-between items-center shadow-c-sm sticky bg-white top-0  z-[50] overflow-x-hidden">
				<div className="flex items-center">
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
				</div>
			</div>
			<div className="bg-[#f6f9ff] min-h-screen  overflow-x-hidden">
				<div>{children}</div>
			</div>
		</div>
    );
};

export default MagazineLayout;