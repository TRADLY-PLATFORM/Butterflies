import React from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import flagIcon from "../../assets/Images/signin/India.png";
import Select from "react-select";

const PhoneForm = () => {
	const countries = [
		{
			id: 2,
			country_id: 1,
			name: "India",
			flag_url: flagIcon,
			dial_code: "91",
			mobile_number_regex: "^91([6-9]{1})([0-9]{9})$",
			mobile_number_legth: 10,
			default: true,
			order_by: 0,
			active: true,
			time_zone: "",
			currency_code: "",
			currency_en: "",
			locale: "",
			currency_locale: "",
			code2: "IN",
			code3: "IND",
		},
		{
			id: 3,
			country_id: 1,
			name: "Malaysia",
			flag_url: flagIcon,
			dial_code: "60",
			mobile_number_regex: "^(+?6?01)[0-46-9]-*[0-9]{7,8}$",
			mobile_number_legth: 10,
			default: true,
			order_by: 0,
			active: true,
			time_zone: "",
			currency_code: "",
			currency_en: "",
			locale: "",
			currency_locale: "",
			code2: "MY",
			code3: "MYY",
		},
	];
	const options = countries.map((country) => {
		return {
			value: country.code2,
			label: (
				<div>
					<Image
						src={country.flag_url}
						height={24}
						width={24}
						objectFit="cover"
						alt="flag"
					/>
				</div>
			),
		};
	});
	return (
		<div className=" flex flex-col  justify-center items-center">
			<div className=" w-full md:w-96  h-12 mb-5 bg-transparent border  border-white  rounded-[48px] p-3 text-white outline-none placeholder-white">
				<Select
					name="country"
					id="phoneId"
					options={options}
					className="bg-primary border-none w-2/5  text-white outline-none"
				/>

				<input type="number" />
			</div>
			<input
				type="text"
				className=" w-full md:w-96  h-12  bg-transparent  border border-white rounded-[48px] p-3 text-white outline-none placeholder-white"
				placeholder="Password"
			/>
		</div>
	);
};

export default PhoneForm;
