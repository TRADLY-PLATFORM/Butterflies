import React from 'react';
import HeaderButton from '../HeaderButton/HeaderButton';
import HeaderProfile from '../HeaderProfileBox/HeaderProfile';
import SearchBox from '../SearchBox/SearchBox';

const Header = () => {
    return (
		<div className="w-full bg-[#FEFEFE] h-24 px-8 flex items-center justify-between  shadow-c-sm mb-6">
			<div> 
				<SearchBox />
			</div>
			<div className=" flex items-center justify-between">
				<div className="   lg:mr-8  xl:mr-16 ">
					<HeaderButton />
				</div>
				<div>
					<HeaderProfile />
				</div>
			</div>
		</div>
    );
};

export default Header;