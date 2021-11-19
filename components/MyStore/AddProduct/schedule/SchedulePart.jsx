/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import Modal from '../../../Shared/Modal.jsx/Modal';
import ScheduleForm from './ScheduleForm';
import OutsideClickHandler from 'react-outside-click-handler';
import moment from 'moment';
import {
  findRepeatName,
  repeatArray,
  weekDays,
} from '../../../Shared/Constant/Constant';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../store/feature/authSlice';

const SchedulePart = ({ schedulesArray, setSchedulesArray }) => {
  const [isScheduleFormOpen, setIsScheduleFormOpen] = useState(false);
  const { first_name } = useSelector(authSelector);

  const [schedulesObject, setSchedulesObject] = useState({
    start_date: null,
    start_time: null,
    end_time: null,
    schedule_type: 2,
    repeat_days: null,
    active: true,
  });
  const setDate = () => {
    if (schedulesArray === null) {
      setSchedulesArray([schedulesObject]);
      setSchedulesObject({
        start_date: null,
        start_time: null,
        end_time: null,
        schedule_type: 2,
        repeat_days: null,
        active: true,
      });
    } else {
      setSchedulesArray([...schedulesArray, schedulesObject]);
      setSchedulesObject({
        start_date: null,
        start_time: null,
        end_time: null,
        schedule_type: 2,
        repeat_days: null,
        active: true,
      });
    }
    setIsScheduleFormOpen(false);
  };

  return (
    <>
      <div className=" w-full grid grid-cols-1 gap-6 bg-white p-5">
        {!schedulesArray === null || schedulesArray?.length > 0 ? (
          <div>
            {schedulesArray?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border border-secondary border-opacity-70 rounded  px-2 py-3 flex  m-2"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 w-4/5">
                    <p className="text-base leading-4 text-[#121212] font-medium">
                      {moment(item.start_date).format('dddd, MMM  YY')}
                    </p>
                    <p className=" text-xs leading-4 font-medium text-secondary mt-[2px] ">
                      {item.start_time} - {item.end_time}
                    </p>
                    <p>{findRepeatName(item.repeat_days)}</p>
                  </div>
                  <div className="flex flex-col   relative  ml-2">
                    {/* <button className="mb-2">
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button> */}
                    <button
                      onClick={() => {
                        const filter = schedulesArray.filter(
                          (item, i) => i !== index
                        );
                        setSchedulesArray([...filter]);
                      }}
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className=" w-full     flex justify-center items-center">
            <div
              className="   w-full bg-yellow-500    text-white   py-3 rounded relative grid grid-cols-[20%,80%]"
              role="alert"
            >
              <div className="flex items-center justify-center">
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
                {/* <strong className="font-bold">
                {first_name ? 'Oops' + '  ' + first_name : 'Hi Guess !'}
              </strong> */}
                <span className="  ml-2">No schedule available.</span>
              </div>
            </div>
          </div>
        )}
        <div className="mt-3">
          {!isScheduleFormOpen && (
            <button
              className="border  border-primary rounded-md text-primary text-center px-6 py-1"
              onClick={() => setIsScheduleFormOpen(true)}
            >
              + Add Schedule
            </button>
          )}
        </div>
      </div>
      {isScheduleFormOpen && (
        <div className="mt-6  ">
          <ScheduleForm
            schedulesObject={schedulesObject}
            setSchedulesObject={setSchedulesObject}
            setDate={setDate}
          />
        </div>
      )}
    </>
  );
};

export default SchedulePart;
