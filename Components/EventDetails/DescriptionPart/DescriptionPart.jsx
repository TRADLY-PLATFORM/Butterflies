import React from 'react';
import ReactMarkdown from "react-markdown";
 

const DescriptionPart = ({ description }) => {
	return (
		<div className=" w-full  min-h-[200px] bg-[#FFFFFF] rounded  p-[24px]">
			<ReactMarkdown>{description}</ReactMarkdown>
		</div>
	);
};

export default DescriptionPart;