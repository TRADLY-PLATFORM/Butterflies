/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import { useRouter } from 'next/dist/client/router';

const WishListButton = () => {
  const router = useRouter();
  const { login } = useSelector(authSelector);

  return (
    <Link
      href={login ? '/wishlist?page=1' : '/sign-in?to=/wishlist?page=1'}
      passHref={true}
    >
      <a className="cursor-pointer w-[34px] h-[44px] px-[6px] flex justify-center items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          fill={
            router.pathname === '/wishlist'
              ? 'var( --primary_color)'
              : '#6e686e'
          }
        >
          <path d="M21.6328 6.64689C21.3187 5.91948 20.8657 5.2603 20.2992 4.70627C19.7323 4.15058 19.064 3.70898 18.3305 3.40549C17.5699 3.08953 16.7541 2.92781 15.9305 2.9297C14.775 2.9297 13.6477 3.24611 12.668 3.84377C12.4336 3.98674 12.2109 4.14377 12 4.31486C11.7891 4.14377 11.5664 3.98674 11.332 3.84377C10.3523 3.24611 9.225 2.9297 8.06953 2.9297C7.2375 2.9297 6.43125 3.08908 5.66953 3.40549C4.93359 3.71017 4.27031 4.14845 3.70078 4.70627C3.13359 5.25968 2.6805 5.91901 2.36719 6.64689C2.04141 7.40392 1.875 8.20783 1.875 9.03517C1.875 9.81564 2.03438 10.6289 2.35078 11.4563C2.61563 12.1477 2.99531 12.8649 3.48047 13.5891C4.24922 14.7352 5.30625 15.9305 6.61875 17.1422C8.79375 19.1508 10.9477 20.5383 11.0391 20.5945L11.5945 20.9508C11.8406 21.1078 12.157 21.1078 12.4031 20.9508L12.9586 20.5945C13.05 20.536 15.2016 19.1508 17.3789 17.1422C18.6914 15.9305 19.7484 14.7352 20.5172 13.5891C21.0023 12.8649 21.3844 12.1477 21.6469 11.4563C21.9633 10.6289 22.1227 9.81564 22.1227 9.03517C22.125 8.20783 21.9586 7.40392 21.6328 6.64689Z" />
        </svg>
      </a>
    </Link>
  );
};

export default WishListButton;
