/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  default_large_user_icon,
  default_user_icon,
  rating_icon,
} from '../../Shared/Constant/Icons/AllIcons';
import Image from 'next/image';
import Rating from './rating';
import {
  changeDateFormat,
  getThumbnailImage,
} from '../../Shared/Constant/Constant';
import ReactMarkdown from 'react-markdown';
import ShowMoreText from 'react-show-more-text';
import tradly from 'tradly';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import axios from 'axios';
import {
  getListingReviews,
  listingDetails,
} from '../../../store/feature/listingSlice';
import { useRouter } from 'next/dist/client/router';
import { check_login } from '../../../constant/check_auth';

const ReviewBox = ({ rating_data, reviews, review_page }) => {
  const { auth_key, login } = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const helpful_review = (id, status) => {
    if (check_login(router)) {
      axios
        .post('/api/review/like', {
          data: {
            review: {
              status: status == 0 ? 1 : 0,
            },
          },
          id: id,
        })
        .then((res) => {
           
            dispatch(
              listingDetails({
                id: router?.query.id.split('-')[0],
                authKey: auth_key,
              })
            );
            dispatch(
              getListingReviews({
                authKey: auth_key,
                params: {
                  type: 'listings',
                  id: router?.query.id.split('-')[0],
                  page: review_page,
                  per_page: 30,
                },
              })
            );
         
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  const [show_moe_review, setShow_more_review] = useState(false);

  return (
    <div className=" bg-white rounded  w-full min-h-[66px] p-4 shadow-c-sm">
      <p className="text-black text-base font-medium">
        {' '}
        Review {`(${rating_data.review_count})`}
      </p>
      <div className="mt-5">
        {reviews.map((item, index, array) => {
          return (
            <div
              key={index}
              className={[
                'min-h-[200px] p-4 rounded-md shadow-c-md my-3',
                array.length > 1 && !show_moe_review && index + 1 !== 1
                  ? 'hidden'
                  : 'block',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  {item.user.profile_pic ? (
                    <Image
                      src={getThumbnailImage(item.user.profile_pic)}
                      width={32}
                      height={32}
                      objectFit="cover"
                    />
                  ) : (
                    default_large_user_icon
                  )}
                </div>
                <h2 className="text-black font-semibold text-sm">
                  {item.user.first_name}
                </h2>
              </div>
              <div className="my-2 flex items-center gap-3">
                <Rating rating_value={Number(item.rating)} />
                <p className="text-default_gray  font-normal text-sm">
                  {changeDateFormat(item.created_at, 'MMM DD,YYYY')}
                </p>
              </div>
              <div>
                <ShowMoreText
                  /* Default options */
                  lines={3}
                  more="View More"
                  less="View Less"
                  anchorClass="text-lg text-primary  "
                  expanded={false}
                  truncatedEndingComponent={'... '}
                >
                  <article className="prose">
                    <ReactMarkdown>{item.content}</ReactMarkdown>
                  </article>
                </ShowMoreText>
              </div>
              <div className=" mt-3 flex items-center justify-start flex-wrap gap-3  ">
                {item?.images.map((img, index) => {
                  return (
                    <div
                      className="w-[100px] h-[100px] rounded-md overflow-hidden"
                      key={index}
                    >
                      <Image
                        src={img}
                        width={100}
                        height={100}
                        objectFit="cover"
                      />
                    </div>
                  );
                })}
              </div>
              <div className=" mt-2 px-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => helpful_review(item.id, item.like_status)}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill={
                      item.like_status == 0
                        ? '#9B9B9B'
                        : 'var( --primary_color)'
                    }
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 12.7612H2.36364V5.10458H0V12.7612ZM13 5.74244C13 5.04059 12.4682 4.46634 11.8182 4.46634H8.08956L8.65093 1.55046L8.66865 1.34628C8.66865 1.08468 8.5682 0.842225 8.40865 0.669952L7.78229 0L3.89411 4.20474C3.67547 4.43444 3.54547 4.75347 3.54547 5.10439V11.4849C3.54547 12.1867 4.07729 12.761 4.72729 12.761H10.0455C10.5359 12.761 10.9555 12.442 11.1327 11.9826L12.9173 7.48432C12.9705 7.33757 13 7.18443 13 7.01854V5.79987L12.9941 5.79349L13 5.74244Z"
                    />
                  </svg>
                </button>
                <span className="text-sm text-[#9B9B9B]">{item.likes}</span>
              </div>
            </div>
          );
        })}
      </div>
      {reviews.length > 1 && (
        <div
          className={[
            ' w-full flex justify-center mt-6 mb-3',
            show_moe_review && 'hidden',
          ].join(' ')}
        >
          <button
            className=" w-4/6 text-center py-3 border border-primary text-primary text-lg rounded-md"
            onClick={() => setShow_more_review(true)}
          >
            Read All Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewBox;
