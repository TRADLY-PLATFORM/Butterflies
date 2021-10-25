import React, { useState, useEffect } from "react";
import moreImage from "../../../assets/Images/Categories/Menu.png";
import book from "../../../assets/Images/Categories/books-stack-of-three (1).png";
import Image from "next/Image";
import Link from "next/Link";
import { getThumbnailImage } from "../../Shared/Constant/Constant";

const Categories = ({ categories }) => {
	const [filterCategories, setFilterCategories] = useState();
	const [extraWidth, setExtraWidth] = useState(0);

	useEffect(() => {
		const width = window.innerWidth;
		let calc;
		if (width < 768) {
			calc = 11;
		} else {
			calc = Math.floor((width - 245) / 116);
		}
		let sliceCategories;
		if (categories.length > calc) {
			sliceCategories = categories.slice(0, calc - 2);
			sliceCategories.push({
				name: "All Categories",
				image_path: moreImage,
			});
		} else {
			sliceCategories = categories.slice(0, calc);
		}
		setFilterCategories(sliceCategories);
	}, [categories]);
	return (
		<div>
			{/* 
			<div className=" flex items-center mb-6">
				<p className="text-2xl text-black font-semibold mr-3">
					Event In
				</p>
				<p className="flex  items-center">
					<svg
						width="16"
						height="21"
						viewBox="0 0 16 21"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 13.9 7.05 20 7.35 20.26C7.53113 20.4149 7.76165 20.5001 8 20.5001C8.23835 20.5001 8.46887 20.4149 8.65 20.26C9 20 16 13.9 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5ZM8 18.15C5.87 16.15 2 11.84 2 8.5C2 6.9087 2.63214 5.38258 3.75736 4.25736C4.88258 3.13214 6.4087 2.5 8 2.5C9.5913 2.5 11.1174 3.13214 12.2426 4.25736C13.3679 5.38258 14 6.9087 14 8.5C14 11.84 10.13 16.16 8 18.15ZM8 4.5C7.20887 4.5 6.43552 4.7346 5.77772 5.17412C5.11992 5.61365 4.60723 6.23836 4.30448 6.96927C4.00173 7.70017 3.92252 8.50444 4.07686 9.28036C4.2312 10.0563 4.61216 10.769 5.17157 11.3284C5.73098 11.8878 6.44371 12.2688 7.21964 12.4231C7.99556 12.5775 8.79983 12.4983 9.53073 12.1955C10.2616 11.8928 10.8864 11.3801 11.3259 10.7223C11.7654 10.0645 12 9.29113 12 8.5C12 7.43913 11.5786 6.42172 10.8284 5.67157C10.0783 4.92143 9.06087 4.5 8 4.5ZM8 10.5C7.60444 10.5 7.21776 10.3827 6.88886 10.1629C6.55996 9.94318 6.30362 9.63082 6.15224 9.26537C6.00087 8.89991 5.96126 8.49778 6.03843 8.10982C6.1156 7.72186 6.30608 7.36549 6.58579 7.08579C6.86549 6.80608 7.22186 6.6156 7.60982 6.53843C7.99778 6.46126 8.39991 6.50087 8.76537 6.65224C9.13082 6.80362 9.44318 7.05996 9.66294 7.38886C9.8827 7.71776 10 8.10444 10 8.5C10 9.03043 9.78929 9.53914 9.41421 9.91421C9.03914 10.2893 8.53043 10.5 8 10.5Z"
							fill="#15B790"
						/>
					</svg>
					<span className=" text-2xl text-primary font-semibold ml-1  mr-5">
						Indonesia
					</span>
					<svg
						width="12"
						height="7"
						viewBox="0 0 12 7"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.0002 0.670187C10.8128 0.483936 10.5594 0.379395 10.2952 0.379395C10.031 0.379395 9.77756 0.483936 9.59019 0.670187L6.00019 4.21019L2.46019 0.670187C2.27283 0.483936 2.01938 0.379395 1.75519 0.379395C1.49101 0.379395 1.23756 0.483936 1.05019 0.670187C0.956464 0.76315 0.88207 0.873751 0.831301 0.99561C0.780533 1.11747 0.754395 1.24818 0.754395 1.38019C0.754395 1.5122 0.780533 1.6429 0.831301 1.76476C0.88207 1.88662 0.956464 1.99722 1.05019 2.09019L5.29019 6.33019C5.38316 6.42392 5.49376 6.49831 5.61562 6.54908C5.73747 6.59985 5.86818 6.62599 6.00019 6.62599C6.1322 6.62599 6.26291 6.59985 6.38477 6.54908C6.50663 6.49831 6.61723 6.42392 6.71019 6.33019L11.0002 2.09019C11.0939 1.99722 11.1683 1.88662 11.2191 1.76476C11.2699 1.6429 11.296 1.5122 11.296 1.38019C11.296 1.24818 11.2699 1.11747 11.2191 0.99561C11.1683 0.873751 11.0939 0.76315 11.0002 0.670187Z"
							fill="#15B790"
						/>
					</svg>
				</p>
			</div>
			 */}
			<div className=" grid grid-cols-[144px,144px]  xs:grid-cols-3 gap-[23px] sm:gap-0  sm:flex sm:flex-wrap justify-center md:justify-start  items-center">
				{filterCategories?.map((item) => {
					return (
						<Link key={Math.random()} href="#">
							<div className=" sm:mr-4  sm:mb-6  bg-[#ffffff] rounded-xl  py-4 flex flex-col  justify-between items-center border border-transparent  shadow-c-sm hover:border-primary hover:bg-primary_light  w-[144px] h-[144px] md:w-[100px]  md:h-[100px]  cursor-pointer">
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
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Categories;
