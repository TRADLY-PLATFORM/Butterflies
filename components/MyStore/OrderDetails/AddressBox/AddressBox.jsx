/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import Modal from '../../../Shared/Modal.jsx/Modal';
import AddressForm from './AddressForm/AddressForm';
import tradly from 'tradly';
import { get_order_details } from '../../../../store/feature/store_orderSlice';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../store/feature/authSlice';
import { useDispatch } from 'react-redux';
import CustomLoading from '../../../Shared/Loading/CustomLoading';

const AddressBox = ({ order_details }) => {
  const router = useRouter();
  const { auth_key } = useSelector(authSelector);
  const dispatch = useDispatch();
  const[isLoading,setIsLoading]=useState(false)

  const [showShippingAddressForm, setShowShippingAddressForm] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const id = '';
    tradly.app
      .addEditAddress({
        id,
        data: {
          address: { ...data, type: 'pickup' },
        },
        authKey: auth_key,
      })
      .then((res) => {
        if (!res.error) {
          tradly.app.updateOrderDetail({
            authKey: auth_key,
            id: order_details.id,
            data: {
              operation: 'update_pickup_address',
              order: { pickup_address_id: res.data.address.id },
            },
          }).then((res) => {
            if (!res.error) {
              dispatch(
                get_order_details({
                  authKey: auth_key,
                  id: order_details.id,
                  bodyParam: { account_id: router.query.store_id },
                })
              );
              setShowShippingAddressForm(false);
               setIsLoading(false);
            } else {
               setIsLoading(false);
            }
          })
          
        } else {
           setIsLoading(false);
        }
      });
  };

  const type = order_details?.shipping_method.type;
  let address;
  if (type === 'pickup') {
    address = order_details?.pickup_address;
  } else {
    address = order_details?.shipping_address;
  }
  return (
    <>
      {isLoading&&<CustomLoading/>}
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
                <p className=" text-sm text-black font-semibold  w-1/6 ">City :</p>
                <p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
                  {address.address_line_1}
                </p>
              </div>
              <div className=" flex justify-start items-center py-1  ">
                <p className=" text-sm text-black font-semibold">Country :</p>
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
              <div className=" flex justify-start items-start   py-1  ">
                <p className=" text-sm text-black font-semibold min-w-[70px]  ">
                  Address :
                </p>
                <p className=" text-sm text-black font-semibold  ml-2  text-opacity-70">
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
              {Object.keys(order_details?.pickup_address).length === 0
                ? ` Add Pickup Address`
                : `Change Pickup Address`}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressBox;
