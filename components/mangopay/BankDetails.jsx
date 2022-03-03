import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import tradly from 'tradly';
import { base_url } from '../../constant/url';
import PopUp from '../Shared/PopUp/PopUp';
import SuccessPopUp from '../Shared/PopUp/Success';

const BankDetails = () => {
  const router = useRouter();

  const [isError, setIsError] = useState(false);
  const [error_message, setError_message] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [success_message, setSuccess_message] = useState('');

  const [imagePath, setImagePath] = useState(null);
  const [files, setFiles] = useState(null);
  const [owner_name, setOwner_name] = useState('');
  const [iban, setIban] = useState('');
  const [address_1, setAddress_1] = useState('');
  const [address_2, setAddress_2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postal_code, setPostal_code] = useState('');

  const [all_countries, setAllCountries] = useState(null);

  // useEffect(() => {
  //   tradly.app.getCountries().then((res) => {
  //     setAllCountries(res.data.countries);
  //   });
  // }, [router]);

  const closePopUP = () => {
    setIsError(false);
    setError_message('');
    setIsSuccess(false);
    setSuccess_message('');
  };

  //
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setFiles(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //   Submit details
  const submit_details = () => {
    if (!owner_name.replace(/\s/g, '').length > 0) {
      setIsError(true);
      setError_message('Owner name is required');
      return false;
    }
    if (!iban.replace(/\s/g, '').length > 0) {
      setIsError(true);
      setError_message('IBAN number is required');
      return false;
    }
    if (!address_1.replace(/\s/g, '').length > 0) {
      setIsError(true);
      setError_message('Address 1  is required');
      return false;
    }
    if (!city.replace(/\s/g, '').length > 0) {
      setIsError(true);
      setError_message('City  is required');
      return false;
    }
    if (!state.replace(/\s/g, '').length > 0) {
      setIsError(true);
      setError_message('State  is required');
      return false;
    }
    if (!postal_code.replace(/\s/g, '').length > 0) {
      setIsError(true);
      setError_message('Postal Code is required');
      return false;
    }
    if (!country.replace(/\s/g, '').length > 0) {
      setIsError(true);
      setError_message('Country is required');
      return false;
    }
    if (files == null) {
      setIsError(true);
      setError_message('Identity proof is required');
      return false;
    }

    axios.post('/api/submit_kyc', {
      auth_key: localStorage.getItem('auth_key'),
      account_id: router?.query.account_id,
      data: {
        iban: iban,
        owner_name: owner_name,
        address: {
          address_line_1: address_1,
          address_line_2: address_2,
          state: state,
          city: city,
          post_code: postal_code,
          country: country,
        },
      },
      file_data: files,
    });
  };

  return (
    <div className="   w-full mx-auto ">
      {isError && (
        <OutsideClickHandler
          onOutsideClick={() => {
            isError && (setIsError(false), setError_message(''));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp message={error_message} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      {isSuccess && (
        <OutsideClickHandler
          onOutsideClick={() => {
            isSuccess && (setIsSuccess(false), setSuccess_message(''));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <SuccessPopUp message={success_message} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      <div className="py-12 mx-auto ">
        <h2 className="text-2xl font-bold text-center">Bank Details</h2>
        <div className="mt-8  ">
          <div className="   gap-6">
            {/* Owner name */}
            <label
              className="block max-w-[448px]
                mx-auto"
            >
              <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px] ">
                Owner name
              </span>
              <input
                value={owner_name}
                onChange={(e) => setOwner_name(e.target.value)}
                type="text"
                className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-primary    focus:shadow focus:outline-none focus:ring-0
                  "
                placeholder="Your name"
              />
            </label>
            {/* IBN */}
            <label
              className="mt-6 block max-w-[448px]
                mx-auto"
            >
              <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px]">
                IBAN
              </span>
              <input
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                type="text"
                className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-primary    focus:shadow focus:outline-none focus:ring-0
                  "
                placeholder="IBAN Number"
              />
            </label>
            {/* Address 1 */}
            <label
              className="mt-6 block max-w-[448px]
                mx-auto"
            >
              <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px]">
                Address 1
              </span>
              <input
                value={address_1}
                onChange={(e) => setAddress_1(e.target.value)}
                type="text"
                className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-primary    focus:shadow focus:outline-none focus:ring-0
                  "
                placeholder="Address 1"
              />
            </label>
            {/* Address 2 */}
            <label
              className="mt-6 block max-w-[448px]
                mx-auto"
            >
              <span className="text-gray-700 ">Address 2</span>
              <input
                value={address_2}
                onChange={(e) => setAddress_2(e.target.value)}
                type="text"
                className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-primary    focus:shadow focus:outline-none focus:ring-0
                  "
                placeholder="Address 2"
              />
            </label>
            {/*city & state  */}
            <div
              className=" max-w-[448px]
                mx-auto grid  sm:grid-cols-2  sm:gap-3 "
            >
              <label
                className="mt-6 block max-w-[448px]
                 sm:mx-auto"
              >
                <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px]">
                  City
                </span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-primary    focus:shadow focus:outline-none focus:ring-0
                  "
                  placeholder="city"
                />
              </label>
              <label
                className="mt-6 block max-w-[448px]
                 sm:mx-auto"
              >
                <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px]">
                  State
                </span>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-primary    focus:shadow focus:outline-none focus:ring-0
                  "
                  placeholder="State"
                />
              </label>
            </div>

            {/*postal code & country  */}
            <div
              className=" max-w-[448px]
                mx-auto grid  sm:grid-cols-2 sm:gap-3"
            >
              <label
                className="block max-w-[448px]
                mt-6"
              >
                <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px]">
                  Postal code
                </span>
                <input
                  value={postal_code}
                  onChange={(e) => setPostal_code(e.target.value)}
                  type="text"
                  className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-primary    focus:shadow focus:outline-none focus:ring-0
                  "
                  placeholder="city"
                />
              </label>
              <label
                className="block max-w-[448px]
                mt-6"
              >
                <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px]">
                  Country
                </span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="
                    block
                   w-full
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                     focus:border-primary    focus:shadow focus:outline-none focus:ring-0
                  "
                >
                  <option className="" selected hidden>
                    Select Country
                  </option>
                  {all_countries?.map((country) => {
                    return (
                      <option key={country.id} value={country.code2}>
                        {country.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          </div>
          {/* <div className="mt-6 max-w-[448px] mx-auto">
            <button
              className="w-full px-8 py-2 bg-primary rounded-md text-white "
              onClick={() => router.push('/mangopay/kyc_document')}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
      <div className="py-18 mx-auto mb-8 ">
        <h2 className="text-2xl font-bold text-center">KYC Details</h2>
        <div className="max-w-md mx-auto  mt-6">
          <label
            className="mt-6 block max-w-[448px]
                mx-auto"
          >
            <span className="text-gray-700 after:content-['*'] after:text-red-500 after:-top-[5px] after:-right-[10px]">
              Identity Proof (PDF,DOC,PNG,JPG)
            </span>
          </label>
          <input
            id="fileButton"
            type="file"
            className=" hidden"
            accept="*/"
            placeholder=""
            onChange={(e) => {
              return (
                e.target.files.length > 0 &&
                (setImagePath({
                  id: e.target.files[0].name,
                  path: URL.createObjectURL(e.target.files[0]),
                }),
                getBase64(e.target.files[0]))
              );
            }}
          />
          {imagePath !== null ? (
            <div className=" relative w-full mt-4 flex flex-col items-center border-2 border-primary border-dashed py-2">
              <p>{imagePath.id}</p>
              <button
                className="text-red-400 text-sm font-normal mt-2 "
                onClick={() => {
                  return setImagePath(null), setFiles(null);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className=" w-full border-2 border-primary border-dashed py-10 flex justify-center items-center  mt-3  bg-gray-100  rounded text-base  font-semibold "
              onClick={() => document.getElementById('fileButton').click()}
            >
              Add file
            </button>
          )}
        </div>

        <div className="mt-6 max-w-[448px] mx-auto">
          <button
            className="w-full px-8 py-2 bg-primary rounded-md text-white "
            onClick={() => submit_details()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
