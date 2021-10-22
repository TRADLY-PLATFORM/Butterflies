import React from 'react';
import AddressBox from '../../EventDetails/AddressBox/AddressBox';
import DescriptionPart from '../../EventDetails/DescriptionPart/DescriptionPart';
import ImagePart from '../../EventDetails/ImagePart/ImagePart';
import MainBox from '../../EventDetails/MainBox/MainBox';
import RelatedEvents from '../../EventDetails/RelatedEventsPart/RelatedEvents';
import Schedule from '../../EventDetails/SchedulePart/Schedule ';
import ShareButtons from '../../EventDetails/ShareButtons/ShareButtons';
import StoreNameBox from '../../EventDetails/StoreNameBox/StoreNameBox';

const EventDetailsPageLayout = () => {
    return (
		<div className="flex flex-col justify-center items-center c-md:flex-row  c-md:justify-between c-md:items-start  c-md:mx-auto  pt-16 pb-20   c-md:max-w-[824px]   lg:max-w-[1024px]  xl:max-w-[1224px] ">
			<div className=" w-[400px] lg:w-[500px] xl:w-[600px]">
				<div>
					<ImagePart />
				</div>
				<div className="mt-6">
					<DescriptionPart />
				</div>
				<div className=" mt-6">
					<RelatedEvents />
				</div>
			</div>
			<div className=" w-[400px] lg:w-[500px] xl:w-[600px] mt-6 c-md:mt-0">
				<div>
					<MainBox />
				</div>
				<div className="mt-6">
					<Schedule />
				</div>
				<div>
					<AddressBox />
				</div>
				<div className="mt-6">
					<StoreNameBox />
				</div>
				<div className="mt-6">
					<ShareButtons />
				</div>
			</div>
		</div>
    );
};

export default EventDetailsPageLayout;