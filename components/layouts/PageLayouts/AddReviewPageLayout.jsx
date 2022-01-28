import React, { useEffect, useState } from 'react';
import AddressBox from '../../OrderDetails/AddressBox/AddressBox';
import CustomerDetails from '../../OrderDetails/CustomerDetails/CustomerDetails';
import OrderSummary from '../../OrderDetails/OrderSummary/OrderSummary';
import TotalAmountBox from '../../OrderDetails/TotalBox/TotalAmountBox';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  get_order_details,
  orderSelector,
} from '../../../store/feature/orderSlice';
import CustomLoading from '../../Shared/Loading/CustomLoading';
import PopUp from '../../Shared/PopUp/PopUp';
import OutsideClickHandler from 'react-outside-click-handler';
import SuccessPopUp from '../../Shared/PopUp/Success';
import ItemsSummary from '../../AddReview/ItemsSummary/ItemsSummary';
import ReviewBox from '../../AddReview/ReviewBox/ReviewBox';
import { add_review } from '../../AddReview/send_review';
import Review_status from '../../AddReview/ReviewBox/review_status';

const AddReviewPageLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selected_product, setSelected_product] = useState(null);
  const [selected_product_review_status, setSelected_product_review_status] =
    useState(false);
  const [rating_value, setRating_value] = useState(5);
  const [rating_title, setRating_title] = useState('Excellent Service');
  const [rating_description, setRating_description] = useState(null);
  const [imagePath, setImagePath] = useState([]);
  const [files, setFiles] = useState([]);
  const [fullFile, setFullFile] = useState([]);

  const [showError, setShowError] = useState(false);
  const [error_message, setError_message] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [success_message, setSuccess_message] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { auth_key } = useSelector(authSelector);

  useEffect(() => {
    if (auth_key) {
      dispatch(get_order_details({ authKey: auth_key, id: router.query.id }));
    }
  }, [auth_key, router.query.id]);
  const { order_details } = useSelector(orderSelector);

  useEffect(() => {
    setSelected_product(order_details?.order_details[0].listing.id);
    setSelected_product_review_status(
      order_details?.order_details[0].listing.review_status
    );
  }, [order_details]);

  const closePopUP = () => {
    setShowError(false);
    setError_message('');
    setShowSuccess(false);
    setSuccess_message('');
  };

  // send review
  const send_review = () => {
    if (selected_product === null) {
      setShowError(true);
      setError_message('Select  one product');
      return false;
    }
    add_review(
      selected_product,
      rating_value,
      rating_title,
      rating_description,
      imagePath,
      files,
      fullFile,
      setShowError,
      setError_message,
      setShowSuccess,
      setSuccess_message,
      auth_key,
      setIsLoading
    );
  };

  return (
    <div>
      {showError && (
        <OutsideClickHandler
          onOutsideClick={() => {
            showError && (setShowError(false), setError_message(''));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <PopUp message={error_message} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      {showSuccess && (
        <OutsideClickHandler
          onOutsideClick={() => {
            showSuccess && (setShowSuccess(false), setSuccess_message(''));
          }}
        >
          <div className="fixed z-50 top-0 left-0  w-screen mt-5 ">
            <div className="w-full  xs:w-[500px] mx-auto">
              <SuccessPopUp message={success_message} closePopUP={closePopUP} />
            </div>
          </div>
        </OutsideClickHandler>
      )}
      {/* <CustomLoading/> */}
      <div className=" flex">
        <h2 className=" text-xl sm:text-3xl font-semibold text-black">
          Order Number{' '}
        </h2>
        <h2 className="  text-xl sm:text-3xl font-semibold text-primary ml-2">
          #{order_details?.id}
        </h2>
      </div>
      <div className=" grid   grid-cols-[100%]  lg:grid-cols-[40%,60%]   mt-6">
        <div>
          <div>
            <ItemsSummary
              order_details={order_details}
              selected_product={selected_product}
              setSelected_product={setSelected_product}
              setSelected_product_review_status={
                setSelected_product_review_status
              }
            />
          </div>
        </div>
        <div className="    xl:ml-10">
          {selected_product_review_status ? (
            <Review_status />
          ) : (
            <ReviewBox
              rating_value={rating_value}
              setRating_value={setRating_value}
              rating_title={rating_title}
              setRating_title={setRating_title}
              rating_description={rating_description}
              setRating_description={setRating_description}
              imagePath={imagePath}
              setImagePath={setImagePath}
              files={files}
              setFiles={setFiles}
              fullFile={fullFile}
              setFullFile={setFullFile}
              send_review={send_review}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReviewPageLayout;
