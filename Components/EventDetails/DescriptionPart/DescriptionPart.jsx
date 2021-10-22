import React from 'react';
import ReactMarkdown from "react-markdown";
import tradly from "tradly";


const DescriptionPart = () => {
    return (
		<div className=" w-full  min-h-[200px] bg-[#FFFFFF] rounded  p-[24px]">
			<ReactMarkdown># Hello, *world*!</ReactMarkdown>
		</div>
    );
};

export default DescriptionPart;