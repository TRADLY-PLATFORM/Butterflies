import { logout } from '../../store/feature/authSlice';
import {
  invite_friend,
  plus_icon,
  privacy_icon,
  store_icon,
} from '../Shared/Constant/Icons/AllIcons';
import {
  booking,
  order,
} from '../Shared/Constant/TextConstant/MenuTextConstant';

export const customer_menus = (
  Link,
  marketplace_type,
  general_configs,
  router,
  dispatch
) => {
  return (
    <div>
      <h1 className=" text-base  text-primary font-semibold  transition duration-500 px-[10px] sm:px-[25px] mb-1">
        Customer
      </h1>
      <div className="w-[15px] h-[15px] bg-[#fff] absolute   right-0  transform rotate-45  -top-2  mr-4  md:mr-8 border-l border-t border-[rgba(250, 250, 250, 0.93)]  z-[50]" />

      <Link href="/edit-profile" passHref={true}>
        <a className="flex items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3  sm:mr-5 text-[#6e686e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className=" text-sm  text-[#222222]  font-semibold  transition duration-500 hover:text-primary">
            Profile
          </span>
        </a>
      </Link>
      {marketplace_type !== null && (
        <Link href="/orders?page=1" passHref={true}>
          {marketplace_type === 1 ? order : booking}
        </Link>
      )}

      {/* {marketplace_type === 1 && (
        <Link href="/checkout" passHref={true}>
          <div className="   flex items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3  sm:mr-5 text-[#6e686e]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="  text-sm  text-[#222222]  font-semibold  transition duration-500 hover:text-primary">
              My Cart
            </p>
          </div>
        </Link>
      )} */}
      <div className="   flex  sm:items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-3  sm:mr-5 text-[#6e686e]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <p
          onClick={() => window.open(general_configs?.terms_url)}
          className="  text-sm  text-[#222222]  text-left font-semibold  transition duration-500 hover:text-primary"
        >
          Terms & Conditions
        </p>
      </div>
      <div className=" flex items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group">
        {privacy_icon}
        <p
          onClick={() => window.open(general_configs?.privacy_policy_url)}
          className=" text-sm  text-[#222222]  font-semibold  transition duration-500 hover:text-primary ml-3  sm:ml-5"
        >
          Privacy Policy
        </p>
      </div>
      {general_configs?.invite_friends_collection_enabled && (
        <div className="flex items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group ">
          {invite_friend}
          <Link href="/invite" passHref={true}>
            <a className=" block text-sm  text-[#222222]  font-semibold  transition duration-500 hover:text-primary ml-3  sm:ml-5">
              Invite Friend
            </a>
          </Link>
        </div>
      )}
      <div
        className="flex items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group"
        onClick={() => {
          dispatch(logout({ router }));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-1 mr-4 text-[#6e686e]"
          fill="none"
          viewBox="0 0 24 24 "
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span className=" text-sm  text-[#222222]  font-semibold transition duration-500 group-hover:text-primary">
          Log Out
        </span>
      </div>
    </div>
  );
};

export const account_menus = (Link, router, my_stores) => {
  return (
    <div>
      <h1 className=" text-base  text-primary font-semibold  transition duration-500 px-[10px] sm:px-[25px] mb-1">
        Business Account
      </h1>
      <div className="w-[15px] h-[15px] bg-[#fff] absolute   right-0  transform rotate-45  -top-2  mr-4  md:mr-8 border-l border-t border-[rgba(250, 250, 250, 0.93)]  z-[50]" />
      <Link href="/a/my-store?page=1" passHref={true}>
        <a className="flex items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group">
          <div>{store_icon}</div>
          <span className="ml-3  sm:ml-5 text-sm  text-[#222222]  font-semibold  transition duration-500 hover:text-primary">
            Account
          </span>
        </a>
      </Link>
      <div className=" flex sm:items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6  mr-3  sm:mr-5 text-[#6e686e] mt-[2px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <Link
          href={{
            pathname: '/a/orders',
            query: { store_id: my_stores[0].id, page: 1 },
          }}
        >
          <a
            // onClick={() =>
            //   router.push({
            //     pathname: '/a/orders',
            //     query: { store_id: my_stores[0].id, page: 1 },
            //   })
            // }
            className=" block text-sm text-left  text-[#222222]  font-semibold  transition duration-500 hover:text-primary"
          >
            My Account Orders
          </a>
        </Link>
      </div>

      {my_stores?.length > 0 && (
        <div className=" flex items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6  mr-3  sm:mr-5 text-[#6e686e] mt-[2px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <Link href="/payout" passHref={true}>
            <a className=" text-sm  text-[#222222]  font-semibold  transition duration-500 hover:text-primary">
              Payments
            </a>
          </Link>
        </div>
      )}
      {my_stores?.length > 0 && (
        <Link
          href={{
            pathname: '/a/add-product',
            query: { account_id: my_stores[0].id },
          }}
        >
          <a>
            <div className=" flex  sm:items-center cursor-pointer w-auto  px-[10px] sm:px-[25px] py-2  hover:bg-[#f2f4f4] group">
              <div>{plus_icon}</div>
              <p
                // onClick={() =>
                //   router.push({
                //     pathname: '/a/add-product',
                //     query: { account_id: my_stores[0].id },
                //   })
                // }
                className="ml-3  sm:ml-5 text-sm  text-left text-[#222222]  font-semibold  transition duration-500 hover:text-primary"
              >
                Add New Listing
              </p>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
};
