/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OutsideClickHandler from "react-outside-click-handler";
import Modal from "../../../Shared/Modal.jsx/Modal";
import AddressForm from "./AddressForm/AddressForm";
import tradly from "tradly"
 
const AddressBox = ({ order_details }) => {
	const [showShippingAddressForm, setShowShippingAddressForm] = useState(false);
	const { register, handleSubmit } = useForm();
	
	const onSubmit = (data) => {
		const id = !isNewAddress ? selectShippingAddress.id : '';
		tradly.app.
    dispatch(
      save_address({
        id,
        addressData: {
          address: { ...data, type: 'delivery' },
        },
        authKey: auth_key,
      })
    ).then((res) => {
      if (!res.payload.code) {
        dispatch(
          getAddress({
            bodyParam: { type: 'delivery' },
            authKey: auth_key,
          })
        );
        setShowShippingAddressForm(false);
      }
    });
  };

	const type = order_details?.shipping_method.type;
	let address;
	if (type === "pickup") {
		address = order_details?.pickup_address;
	} else {
		address = order_details?.shipping_address;
	}
	return (
    <>
      {showShippingAddressForm && (
        <Modal>
          <OutsideClickHandler
            onOutsideClick={() => {
              setShowShippingAddressForm(false);
            }}
          >
            <AddressForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              setShowShippingAddressForm={setShowShippingAddressForm}
            />
          </OutsideClickHandler>
        </Modal>
      )}
      <div className="w-full h-min-[50px] bg-white  shadow-c-sm rounded-lg px-[30px]  py-5  border-opacity-40">
        <div className="flex  ">
          <p className=" text-lg text-black font-semibold   ">
            {order_details?.shipping_method.name} Address
          </p>
        </div>
        <div className="mt-4">
          {address?.country ? (
            <>
              <div className=" flex justify-start items-center py-1  ">
                <p className=" text-sm text-black font-semibold  ">City :</p>
                <p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
                  {address.address_line_1}
                </p>
              </div>
              <div className=" flex justify-start items-center py-1  ">
                <p className=" text-sm text-black font-semibold  ">Country :</p>
                <p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
                  {address.country}
                </p>
              </div>
              <div className=" flex justify-start items-center py-1  ">
                <p className=" text-sm text-black font-semibold  ">
                  Postal Code :
                </p>
                <p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
                  {address.post_code}
                </p>
              </div>
              <div className=" flex justify-start items-center py-1  ">
                <p className=" text-sm text-black font-semibold w-2/6  ">
                  Address :
                </p>
                <p className=" text-sm text-black font-semibold  ml-3  text-opacity-70">
                  {address.formatted_address}
                </p>
              </div>
            </>
          ) : (
            'N/A'
          )}
        </div>
        {order_details?.shipping_method.type === 'pickup' && (
          <div className="mt-4">
            <button
              className=" bg-primary rounded-lg px-4 py-2 text-white text-sm  hover:bg-opacity-80"
              onClick={() => {
                setShowShippingAddressForm(true);
              }}
            >
              Add Pickup Address
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressBox;
