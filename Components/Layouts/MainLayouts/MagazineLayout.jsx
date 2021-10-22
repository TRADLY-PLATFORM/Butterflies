import Image from 'next/Image';
import React from 'react';
import logo from "../../../assets/Images/MobileSize/Tradly Logo.png"
import HeaderButton from '../../HeaderButton/HeaderButton';
import HeaderProfile from '../../HeaderProfileBox/HeaderProfile';
import SearchBox from '../../SearchBox/SearchBox';

const MagazineLayout = ({children}) => {
    return (
		<div>
			<div className="w-screen h-[105px] px-8 flex justify-between items-center shadow-c-sm sticky bg-white top-0  z-[500]">
				<div className="flex items-center">
					<div className=" flex items-center   relative ">
						<Image
							src={logo}
							height={44}
							alt="logo"
						/>
					</div>
					<div className="ml-[35px]">
						<SearchBox />
					</div>
				</div>
				<div className="flex items-center">
					<div className="mr-[37px]">
						<HeaderButton />
					</div>
					<div>
						<HeaderProfile />
					</div>
				</div>
			</div>
            <div className="bg-[#E5E5E5] min-h-screen w-screen">
                <div>
                    {children}
                </div>
            </div>
		</div>
    );
};

export default MagazineLayout;