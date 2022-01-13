/* eslint-disable react/prop-types */
import React from 'react';
import { default_large_user_icon, default_user_icon, rating_icon } from '../../Shared/Constant/Icons/AllIcons';
import Image from 'next/image';
import Rating from './rating';
import { changeDateFormat } from '../../Shared/Constant/Constant';
import ReactMarkdown from 'react-markdown';


const ReviewBox = ({ rating_data, reviews }) => {
  return (
    <div className=" bg-white rounded  w-full min-h-[66px] p-4  ">
      <p className="text-black text-base font-medium">
        {' '}
        Review {`(${rating_data.review_count})`}
      </p>
      <div>
        {reviews.map((item, index) => {
          return (
            <div key={index} className="min-h-[200px] p-4 ">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  {item.user.profile_pic ? (
                    <Image
                      src={item.user.profile_pic}
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
              <div className="mt-2 flex items-center gap-3">
                <Rating rating_value={Number(item.rating)} />
                <p className="text-secondary  font-normal text-sm">
                  {changeDateFormat(item.created_at, 'MMM DD,YYYY')}
                </p>
              </div>
              <div>
                <article className="prose">
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </article>
                  </div>
                  <div className='flex items-center justify-start flex-wrap gap-3'>
                      {item?.images.map((img,index) => {
                          return <Image src={img} width={100} height={100} objectFit='cover' key={index} />
                     })} 
                  </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewBox;
