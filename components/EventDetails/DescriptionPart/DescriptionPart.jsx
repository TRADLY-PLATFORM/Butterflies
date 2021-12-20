/* eslint-disable react/prop-types */
import React from "react";
import ReactMarkdown from "react-markdown";

const DescriptionPart = ({ description }) => {
	return description!== undefined || description ===""  ? (
		<div className=" w-full  min-h-[200px] bg-[#FFFFFF] rounded  p-[24px]">
			<p className="text-[#121212] text-sm  font-semibold leading-4 ">
				Description
			</p>
			<div className="ml-2 mt-4">
				<article className="prose  prose-red	">
					<ReactMarkdown>{description}</ReactMarkdown>
				</article>
			</div>
		</div>
	) : (
		<div className="border bg-[#3B3269] bg-opacity-[10%] shadow rounded-md p-4   w-full mx-auto">
			<div className="animate-pulse flex space-x-4">
				<div className="flex-1 space-y-4 py-1">
					<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-3/4"></div>
					<div className="space-y-2">
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded"></div>
						<div className="h-4 bg-[#3B3269] bg-opacity-[20%] rounded w-5/6"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DescriptionPart;






