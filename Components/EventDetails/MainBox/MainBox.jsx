import React from 'react';
import EventButtons from '../EventsButtons/EventButtons';

const MainBox = () => {
    return (
		<div className=" w-full  min-h-[300px] bg-white rounded  p-[25px]">
			<div className=" w-5/6 ">
				<p className=" text-sm text-primary font-medium">
					Only 5 tickets left
				</p>
				<h2 className=" mt-[9px] text-[30px] text-primary font-medium ">
					Yoga Class For Beginner
				</h2>
				<p className=" mt-1 text-secondary text-xl font-medium">
					{" "}
					Start from 200 taka
				</p>
				<p className="flex justify-start items-center ">
					<svg
						width="14"
						height="13"
						viewBox="0 0 14 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M6.99967 10.3892L3.78059 12.1687C3.4153 12.3706 2.97802 12.0625 3.04521 11.6506L3.66634 7.84278L1.01255 5.12285C0.728341 4.83156 0.892609 4.34088 1.29491 4.27941L4.93956 3.72256L6.54705 0.297803C6.72701 -0.0855992 7.27234 -0.0855992 7.4523 0.297803L9.05979 3.72256L12.7044 4.27941C13.1067 4.34088 13.271 4.83156 12.9868 5.12285L10.333 7.84278L10.9541 11.6506C11.0213 12.0625 10.584 12.3706 10.2188 12.1687L6.99967 10.3892Z"
							fill="#FFBA49"
						/>
					</svg>
					<span className=" text-[#4F4F4F] font-medium text-base ml-[6px] ">4.3</span>
					<span className=" text-secondary  text-xs font-medium ml-[6px]">216 Ratings</span>
				</p>
			</div>

			<div className=" mt-[91px] mb-[44px] ">
				<EventButtons />
			</div>
		</div>
    );
};

export default MainBox;