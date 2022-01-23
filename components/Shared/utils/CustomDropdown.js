import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Transition from '../utils/Transition.js';

function CustomDropdown({ children, title }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <li
      className="relative "
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      onFocus={() => setDropdownOpen(true)}
      onBlur={() => setDropdownOpen(false)}
    >
      {title}

         <Transition
          show={dropdownOpen}
          tag="ul"
          className="origin-top-right absolute top-full right-0    py-2 ml-4   shadow-lg bg-[#fff] rounded-lg  min-w-[300px] mt-[10px]  md:mt-[5px]  pt-[20px] pb-[15px]   min-h-[100px]  border border-[rgba(250, 250, 250, 0.93)]     "
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          {children}
        </Transition>
     </li>
  );
}

export default CustomDropdown;

CustomDropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
  title: PropTypes.string.isRequired,
};
