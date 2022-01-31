import React from 'react';
import { useState } from 'react';

const Rating = ({ setRating_value }) => {
  const [rating, setRating] = useState([1, 2, 3, 4, 5]);
  const rating_click = (id) => {
    let rating_numbers = [];
    for (let i = 1; i <= id; i++) {
      rating_numbers.push(i);
    }
    setRating(rating_numbers);
    setRating_value(id);
  };
  return (
    <div className="flex flex-col items-center py-[35px] border-b border-gray-300">
      <p className=" text-lg font-semibold text-black">What is your rating</p>

      <div className="flex items-center gap-2 mt-2">
        <svg
          id="1"
          className="cursor-pointer"
          width="36"
          height="35"
          viewBox="0 0 36 35"
          fill={rating.includes(Number(1)) ? 'var( --primary_color)' : 'none'}
          stroke={rating.includes(Number(1)) ? '' : '#A0A0A0'}
          onClick={() => rating_click(1)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 28.1921L7.77155 33.5322C7.40454 33.7238 6.97698 33.4118 7.04745 33.0038L9 21.6987L0.73206 13.6955C0.433551 13.4065 0.597212 12.9007 1.00841 12.8414L12.4377 11.1921L17.5522 0.900968C17.7361 0.531003 18.2639 0.531003 18.4478 0.900968L23.5623 11.1921L34.9916 12.8414C35.4028 12.9007 35.5664 13.4065 35.2679 13.6955L27 21.6987L28.9526 33.0038C29.023 33.4118 28.5955 33.7238 28.2285 33.5322L18 28.1921Z"
          />
        </svg>
        <svg
          id="2"
          className="cursor-pointer"
          width="36"
          height="35"
          viewBox="0 0 36 35"
          fill={rating.includes(Number(2)) ? 'var( --primary_color)' : 'none'}
          stroke={rating.includes(Number(2)) ? '' : '#A0A0A0'}
          onClick={() => rating_click(2)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 28.1921L7.77155 33.5322C7.40454 33.7238 6.97698 33.4118 7.04745 33.0038L9 21.6987L0.73206 13.6955C0.433551 13.4065 0.597212 12.9007 1.00841 12.8414L12.4377 11.1921L17.5522 0.900968C17.7361 0.531003 18.2639 0.531003 18.4478 0.900968L23.5623 11.1921L34.9916 12.8414C35.4028 12.9007 35.5664 13.4065 35.2679 13.6955L27 21.6987L28.9526 33.0038C29.023 33.4118 28.5955 33.7238 28.2285 33.5322L18 28.1921Z"
          />
        </svg>
        <svg
          id="3"
          className="cursor-pointer"
          width="36"
          height="35"
          viewBox="0 0 36 35"
          fill={rating.includes(Number(3)) ? 'var( --primary_color)' : 'none'}
          stroke={rating.includes(Number(3)) ? '' : '#A0A0A0'}
          onClick={() => rating_click(3)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 28.1921L7.77155 33.5322C7.40454 33.7238 6.97698 33.4118 7.04745 33.0038L9 21.6987L0.73206 13.6955C0.433551 13.4065 0.597212 12.9007 1.00841 12.8414L12.4377 11.1921L17.5522 0.900968C17.7361 0.531003 18.2639 0.531003 18.4478 0.900968L23.5623 11.1921L34.9916 12.8414C35.4028 12.9007 35.5664 13.4065 35.2679 13.6955L27 21.6987L28.9526 33.0038C29.023 33.4118 28.5955 33.7238 28.2285 33.5322L18 28.1921Z"
          />
        </svg>
        <svg
          id="4"
          className="cursor-pointer"
          width="36"
          height="35"
          viewBox="0 0 36 35"
          fill={rating.includes(Number(4)) ? 'var( --primary_color)' : 'none'}
          stroke={rating.includes(Number(4)) ? '' : '#A0A0A0'}
          onClick={() => rating_click(4)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 28.1921L7.77155 33.5322C7.40454 33.7238 6.97698 33.4118 7.04745 33.0038L9 21.6987L0.73206 13.6955C0.433551 13.4065 0.597212 12.9007 1.00841 12.8414L12.4377 11.1921L17.5522 0.900968C17.7361 0.531003 18.2639 0.531003 18.4478 0.900968L23.5623 11.1921L34.9916 12.8414C35.4028 12.9007 35.5664 13.4065 35.2679 13.6955L27 21.6987L28.9526 33.0038C29.023 33.4118 28.5955 33.7238 28.2285 33.5322L18 28.1921Z"
          />
        </svg>
        <svg
          id="5"
          className="cursor-pointer"
          width="36"
          height="35"
          viewBox="0 0 36 35"
          fill={rating.includes(Number(5)) ? 'var( --primary_color)' : 'none'}
          stroke={rating.includes(Number(5)) ? '' : '#A0A0A0'}
          onClick={() => rating_click(5)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 28.1921L7.77155 33.5322C7.40454 33.7238 6.97698 33.4118 7.04745 33.0038L9 21.6987L0.73206 13.6955C0.433551 13.4065 0.597212 12.9007 1.00841 12.8414L12.4377 11.1921L17.5522 0.900968C17.7361 0.531003 18.2639 0.531003 18.4478 0.900968L23.5623 11.1921L34.9916 12.8414C35.4028 12.9007 35.5664 13.4065 35.2679 13.6955L27 21.6987L28.9526 33.0038C29.023 33.4118 28.5955 33.7238 28.2285 33.5322L18 28.1921Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Rating;
