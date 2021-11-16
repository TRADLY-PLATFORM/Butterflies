/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import Modal from '../../../Shared/Modal.jsx/Modal';
import ScheduleForm from './ScheduleForm';
import OutsideClickHandler from 'react-outside-click-handler';
import moment from 'moment';

const SchedulePart = ({ schedulesArray, setSchedulesArray }) => {
  const [isScheduleFormOpen, setIsScheduleFormOpen] = useState(false);

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
    <div className="grid grid-cols-1 gap-6">
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
                <p></p>
              </div>
              <div className="flex flex-col   relative  ml-2">
                <button className="mb-2">
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
                </button>
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
      <div>
        <button
          className="border  border-primary rounded-md text-primary text-center px-6 py-1"
          onClick={() => setIsScheduleFormOpen(true)}
        >
          + Add Date
        </button>
        {isScheduleFormOpen && (
          <Modal>
            {' '}
            <OutsideClickHandler
              onOutsideClick={() => {
                setIsScheduleFormOpen(false);
              }}
            >
              <ScheduleForm
                schedulesObject={schedulesObject}
                setSchedulesObject={setSchedulesObject}
                setDate={setDate}
              />
            </OutsideClickHandler>{' '}
          </Modal>
        )}
      </div>
      {/* <label className="block">
        <span className="text-gray-700">Start Date</span>
        <input
          type="date"
          className="
                    mt-0
                    block
                    w-full
                    px-0.5
                 border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
        />
      </label>
      <label className="block">
        <span className="text-gray-700">End Date</span>
        <input
          type="date"
          className="
                    mt-0
                    block
                    w-full
                    px-0.5
                   border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
        />
      </label>
      <div>
        <label htmlFor="">Start Form</label>
        <div>
           
          <input type="time" name="" id="" />
         
        </div>
      </div>
      <div>
        <label htmlFor="">To</label>
         
      </div> */}
    </div>
  );
};

export default SchedulePart;
