import { useSelector } from 'react-redux';
import tradly from 'tradly';
import { authSelector } from '../../store/feature/authSlice';
import Image from 'next/image';
import {
  account_follow_notification_text,
  account_order_notification_text,
  listing_like_notification_text,
  order_notification_text,
} from '../Shared/Constant/TextConstant/NotificationsText';
import { changeDateFormat } from '../Shared/Constant/Constant';
import { useRouter } from 'next/dist/client/router';
import { myStore, storeSelector } from '../../store/feature/storeSlice';
import {
  notification_icon_without_hover,
  notification_icon_with_hover,
  order_icon,
} from '../Shared/Constant/Icons/AllIcons';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import axios from 'axios';

const Notifications2 = () => {
  const [notifications, setNotifications] = useState(null);
  const [page, setPage] = useState(1);
  const [total_records, setTotal_records] = useState(0);

  const { auth_key, login, user_details } = useSelector(authSelector);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/activities', { params: { page: page } }).then((res) => {
      setNotifications(res.data.activities);
      setPage(res.data.page);
      setTotal_records(res.data.total_records);
    });

    if (user_details) {
      dispatch(
        myStore({
          prams: {
            page: 1,
            type: 'accounts',
            user_id: user_details?.id,
          },
          authKey: auth_key,
        })
      );
    }
  }, [auth_key, router, dispatch]);

  const { my_stores } = useSelector(storeSelector);

  const account_order_link = (refId, acID) => {
    router.push(`/a/orders/${refId}?store_id=${acID}`);
  };
  const order_link = (refId) => {
    router.push(`/orders/${refId}`);
  };

  const fetch_more = () => {
    axios.get('/api/activities', { params: { page: page } }).then((res) => {
      setNotifications([...notifications, ...res.data.activities]);
      setPage(res.data.page);
      setTotal_records(res.data.total_records);
    });
  };

  //   useEffect(() => {
  //     setHasMore(total_records > notifications?.length ? true : false);
  //   }, [notifications]);

  return (
    <>
      <div className=" text-right   ">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex justify-center items-center w-full text-sm font-medium  p-3 rounded-full  transition duration-400  hover:bg-[#22222213] tooltip  tooltip-bottom "
              data-tip="Notifications"
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <ChevronDownIcon
                className="w-5 h-5   -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={[
                'absolute right-0  w-80 mt-2 origin-top-right bg-white    rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-3 z-50',
                notifications !== null && notifications?.length !== 0
                  ? 'h-96  overflow-y-auto'
                  : 'h-48 ',
              ].join(' ')}
            >
              <div className="w-[15px] h-[15px] bg-[#fff] absolute right-0   transform rotate-45  -top-2   mr-7    border-l border-t border-[rgba(250, 250, 250, 0.93)]  z-[50]" />

              <div className="  py-1">
                {notifications !== null && notifications?.length !== 0 ? (
                  <div className="  max-w-[350px] h-[80vh] overflow-auto scrollbar  scrollbar-thin   scrollbar-track-gray-100  scrollbar-thumb-gray-300  pt-[20px] ">
                    {notifications?.map((nt, index) => {
                      if (nt.type == 1) {
                        return (
                          <Menu.Item>
                            {({ active }) => (
                              <Link href={'a/my-store?page=1'}>
                                <a
                                  key={Math.random()}
                                  className="px-2 py-3 w-full min-h-[60px] my-2  flex gap-3  items-start cursor-pointer"
                                  // onClick={() => router.push('a/my-store?page=1')}
                                >
                                  <div className=" w-[16px] h-[16px]   sm:w-[26px]  sm:h-[26px] relative rounded-full overflow-hidden ">
                                    {nt?.account?.images.length > 0 && (
                                      <Image
                                        src={nt.account.images[0]}
                                        layout="fill"
                                        objectFit="cover"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <h2 className=" text-sm font-semibold text-[#050505]">
                                      {account_follow_notification_text(
                                        nt?.user?.first_name
                                      )}
                                    </h2>
                                    <p className="text-sm font-normal text-primary mt-1">
                                      {changeDateFormat(
                                        nt.created_at,
                                        'DD-MM-YYYY, h:mm:ss a'
                                      )}
                                    </p>
                                  </div>
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        );
                      }
                      if (nt.type == 2) {
                        return (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/l/${
                                  nt?.listing?.id
                                }-${nt?.listing?.title.replace(/\W/g, '+')}`}
                              >
                                <a
                                  key={Math.random()}
                                  className="px-2 py-3 w-full min-h-[60px] my-2  flex gap-3  items-start cursor-pointer"
                                >
                                  <div className=" w-[16px] h-[16px]   sm:w-[26px]  sm:h-[26px] relative rounded-full overflow-hidden ">
                                    {nt?.listing?.images.length > 0 && (
                                      <Image
                                        src={nt.listing.images[0]}
                                        layout="fill"
                                        objectFit="cover"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <h2 className=" text-sm font-semibold text-[#050505]">
                                      {listing_like_notification_text(
                                        nt?.user?.first_name
                                      )}
                                    </h2>
                                    <p className="text-sm font-normal text-primary mt-1">
                                      {changeDateFormat(
                                        nt.created_at,
                                        'DD-MM-YYYY, h:mm:ss a'
                                      )}
                                    </p>
                                  </div>
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        );
                      }

                      // if (nt.type == 3) {
                      //   if (
                      //     my_stores?.length > 0 &&
                      //     nt?.metadata.account_id == my_stores[0]?.id
                      //   ) {
                      //     return (
                      //       <Menu.Item>
                      //         {({ active }) => (
                      //           <Link
                      //             href={`/a/orders/${nt?.reference_id}?store_id=${my_stores[0].id}`}
                      //           >
                      //             <a
                      //               key={Math.random()}
                      //               className="px-2 py-3 w-full min-h-[60px] my-2  flex gap-3  items-start cursor-pointer"
                      //             >
                      //               <div className=" w-[16px] h-[16px]   sm:w-[26px]  sm:h-[26px] relative rounded-full overflow-hidden  flex justify-center  ">
                      //                 <p>{order_icon}</p>
                      //               </div>
                      //               <div>
                      //                 <h2 className=" text-sm font-semibold text-[#050505]">
                      //                   {account_order_notification_text(
                      //                     nt?.metadata?.order_status
                      //                   )}
                      //                 </h2>
                      //                 <p className="text-sm font-normal text-primary mt-1">
                      //                   {changeDateFormat(
                      //                     nt.created_at,
                      //                     'DD-MM-YYYY, h:mm:ss a'
                      //                   )}
                      //                 </p>
                      //               </div>
                      //             </a>
                      //           </Link>
                      //         )}
                      //       </Menu.Item>
                      //     );
                      //   } else if (
                      //     my_stores?.length == 0 ||
                      //     nt?.metadata.account_id != my_stores[0].id
                      //   ) {
                      //     return (
                      //       <Menu.Item>
                      //         {({ active }) => (
                      //           <Link href={`/orders/${nt?.reference_id}`}>
                      //             <a
                      //               key={Math.random()}
                      //               className="  px-2 py-3 w-full min-h-[60px] my-2  flex gap-3  items-start cursor-pointer"
                      //               // onClick={() => order_link(nt?.reference_id)}
                      //             >
                      //               <div className=" w-[16px] h-[16px]   sm:w-[26px]  sm:h-[26px] relative rounded-full overflow-hidden  flex justify-center  ">
                      //                 <p>{order_icon}</p>
                      //               </div>
                      //               <div>
                      //                 <h2 className=" text-sm font-semibold text-[#050505]">
                      //                   {order_notification_text(
                      //                     nt?.metadata?.order_status
                      //                   )}
                      //                 </h2>
                      //                 <p className="text-sm font-normal text-primary mt-1">
                      //                   {changeDateFormat(
                      //                     nt.created_at,
                      //                     'DD-MM-YYYY, h:mm:ss a'
                      //                   )}
                      //                 </p>
                      //               </div>
                      //             </a>
                      //           </Link>
                      //         )}
                      //       </Menu.Item>
                      //     );
                      //   }
                      // }
                    })}
                    {Number(total_records) != notifications?.length && (
                      <div className="py-3 flex justify-center">
                        <p
                          className=" font-semibold text-xs text-primary cursor-pointer"
                          onClick={() => fetch_more()}
                        >
                          Load more
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="  max-w-[350px] h-[100px] overflow-auto scrollbar  scrollbar-thin flex justify-center items-center">
                    <h2 className="px-3 py-4 text-center text-base font-medium text-primary">
                      No notifications are available now.
                    </h2>
                  </div>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default Notifications2;
