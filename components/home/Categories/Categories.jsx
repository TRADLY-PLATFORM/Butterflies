/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import moreImage from "../../../assets/Images/Categories/Menu.png";
import { getThumbnailImage } from "../../Shared/Constant/Constant";

const Categories = ({ categories }) => {
	const [filterCategories, setFilterCategories] = useState();

	useEffect(() => {
		const width = window.innerWidth;
		let calc;
		if (width < 768) {
			calc = 11;
		} else {
			calc = Math.floor((width - 245) / 116);
		}
		let sliceCategories;
		if (categories?.length > calc) {
			sliceCategories = categories?.slice(0, calc - 2);
			sliceCategories.push({
				name: "All Categories",
				image_path: moreImage,
			});
		} else {
			sliceCategories = categories?.slice(0, calc);
		}
		setFilterCategories(sliceCategories);
	}, [categories]);
	return (
		<div>
			<div className=" grid grid-cols-[144px,144px]  xs:grid-cols-3 gap-[23px] sm:gap-0  sm:flex sm:flex-wrap justify-center md:justify-start  items-center">
				{filterCategories?.map((item) => {
					const query =
            item.name !== 'All Categories'
              ? {
                  name: item.name.replace(/\s/g, '-'),
                  category_id: item.id,
                  page: 1,
                }
              : '';

					return (
						<Link
							key={Math.random()}
							href={{
								pathname: `${
									item.name !==
									"All Categories"
										? "/lc/[name]"
										: "/lc"
								}`,
							  query,
							}}
							// as={
							// 	item.name !==
							// 	"All Categories"
							// 		? `/category/${item.name.replace(
							// 				/\s/g,
							// 				"-"
							// 		  )}`
							// 		: `/category`
							// }
							passHref
						>
							<a className="  sm:mr-4  sm:mb-6  bg-[#ffffff] rounded-xl  py-4 flex flex-col  justify-between items-center border border-transparent  shadow-c-sm hover:border-primary hover:bg-primary_light  w-[144px] h-[144px] md:w-[100px]  md:h-[100px]  cursor-pointer">
								<div className=" w-[46px] h-[46px] md:w-[32px] md:h-[32px] relative">
									<Image
										src={
											item.name !==
											"All Categories"
												? getThumbnailImage(
														item.image_path
												  )
												: item.image_path
										}
										alt={
											item.name
										}
										title={
											item.name
										}
										layout="fill"
										objectFit="cover"
									/>
								</div>
								<p className=" w-11/12 mx-auto min-h-[5px] text-primary  text-xs   font-medium flex justify-center items-center text-center">
									{item.name ===
									"All Categories"
										? item.name
										: item
												.name
												.length >
										  11
										? item.name.substring(
												0,
												10
										  )
										: item.name}
								</p>
							</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Categories;
