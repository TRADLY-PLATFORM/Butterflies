/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import flagIcon from '../../assets/Images/signin/India.png';
import Select from 'react-select';
import tradly from 'tradly';

const PhoneForm = ({ setNumber, setPassword, setDialCode }) => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    tradly.app.getTenantCountries({ authKey: '' }).then((res) => {
      if (!res.error) {
        setCountries(res.data.countries);
      }
    });
  }, [0]);

  return (
    <div className=" flex flex-col  justify-center items-center">
      <div className=" w-full md:w-96  h-12 mb-5   bg-transparent  rounded-[48px]   text-white outline-none placeholder-white flex justify-center items-center">
        {countries && (
          <PhoneInput
            onlyCountries={countries?.map((country) => {
              return country.code2.toLowerCase();
            })}
            country={countries && countries[0]?.code2.toLowerCase()}
            onChange={(mobile, country, e) => {
              setNumber(mobile);
              setDialCode( country.dialCode );
            }}
            name="mobile"
          />
        )}
      </div>
      <input
        type="password"
        className=" w-full md:w-96  h-12  bg-transparent  border border-white rounded-[48px] p-3 text-white outline-none placeholder-white"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default PhoneForm;
