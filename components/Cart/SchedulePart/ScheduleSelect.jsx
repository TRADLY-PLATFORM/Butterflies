/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import {
  getDatesArray,
  getTimeDifference,
} from '../../Shared/Constant/Constant';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import Warning from '../../Shared/PopUp/Warning';
import { authSelector } from '../../../store/feature/authSlice';

const ScheduleSelect = ({
  dates,
  selectedDate,
  setSelectedDate,
  selectedDateIndex,
  setSelectedDateIndex,
  scheduleArray,
  selectedScheduleTimeIndex,
  setSelectedScheduleTimeIndex,
}) => {
  let scheduleData;
  if (scheduleArray !== null) {
    scheduleData = scheduleArray[selectedDateIndex];
  }
  const { first_name } = useSelector(authSelector);

  return (
    <div className="w-full bg-[#FEFEFE] rounded-lg p-[31px] min-h-[200px]">
      <p className="text-primary text-xl leading-6 font-medium ">
        Select Date & Time
      </p>
      <div className="mt-5 border-b-[0.5px] border-solid border-[#D2D2D2}">
        <Swiper
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={16}
          loop={false}
          navigation={false}
        >
          {dates?.map((date, i) => {
            return (
              <SwiperSlide
                className=""
                key={date}
                style={{
                  width: '70px',
                  minHeight: '20px',
                }}
              >
                <p
                  className={[
                    ' w-full flex justify-center items-center cursor-pointer py-1 border-b-4 border-transparent transition duration-700 hover:border-[#4A4A4A] ',
                    i === selectedDateIndex ? 'border-[#4A4A4A]' : '',
                  ].join(' ')}
                  id={date}
                  onClick={() => {
                    return (
                      setSelectedDateIndex(i),
                      setSelectedDate(moment(dates[0]).format('YYYY-MM-DD')),
                      setSelectedScheduleTimeIndex(null)
                    );
                  }}
                >
                  {i == 0 ? 'Today' : moment(date).format('ddd D')}
                </p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div>
        {scheduleData !== undefined &&
          (scheduleData.schedules.length > 0 ? (
            <div className="w-full min-h-[200px] mt-5 ">
              {scheduleData.schedules.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      selectedScheduleTimeIndex !== index
                        ? 'w-full h-[60px] px-[20px] py-[16px] relative rounded-md overflow-hidden  flex items-center my-4 shadow-c-sm  border border-transparent cursor-pointer hover:border-seceondary'
                        : 'w-full h-[60px] px-[20px] py-[16px] relative rounded-md overflow-hidden  flex items-center my-4 shadow-c-sm cursor-pointer transition duration-700  border border-seceondary  ring ring-primary ring-offset-1'
                    }
                    onClick={() => setSelectedScheduleTimeIndex(index)}
                  >
                    <div className="h-full w-[50px] flex ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className=" ml-3">
                      <p className="text-black font-semibold">
                        {item.start_time} to {item.end_time}
                      </p>
                      <p className=" flex items-center  ">
                        <span className=" text-secondary font-normal  text-xs">
                          {getTimeDifference(item.start_time, item.end_time)}{' '}
                          mins
                        </span>
                      </p>
                    </div>
                    <input
                      className={
                        selectedScheduleTimeIndex !== index
                          ? ' absolute  right-0 mr-6 cursor-pointer'
                          : 'absolute  right-0 mr-6 cursor-pointer text-primary  focus:ring-primary focus:text-primary'
                      }
                      checked={
                        selectedScheduleTimeIndex === index ? true : false
                      }
                      type="radio"
                      name=""
                      id=""
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className=" w-full h-[200px] mt-5 flex justify-center items-center">
              <div
                className="   w-5/6 bg-yellow-500    text-white px-4 py-3 rounded relative grid grid-cols-[20%,80%]"
                role="alert"
              >
                <div className="flex items-center justify-center w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div>
                  <span className="  ml-2">No schedule available</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScheduleSelect;
