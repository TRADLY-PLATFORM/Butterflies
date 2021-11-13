import React from 'react';
import  { useState } from 'react';
import MomentUtils from '@date-io/moment';
 import {
   DatePicker,
   TimePicker,
   DateTimePicker,
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
 } from '@material-ui/pickers';

const SchedulePart = () => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className="grid grid-cols-1 gap-6">
      <label className="block">
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
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <TimePicker
              variant="inline"
               className="
                    mt-0
                    block
                    w-full
                    px-0.5
                   border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div>
        <label htmlFor="">To</label>
        <div>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <TimePicker
              variant="inline"
               className="
                    mt-0
                    block
                    w-full
                    px-0.5
                   border-0 border-b-2 border-gray-200 transition  duration-700
                    focus:ring-0 focus:border-primary
                  "
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </div>
  );
};

export default SchedulePart;
