import React, { useEffect } from 'react';
import { useState } from 'react';
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

const Notifications = () => {
  const [notifications, setNotifications] = useState(null);
  const [page, setPage] = useState(1);
  const [window_width, setWindow_width] = useState(1);
  const [total_records, setTotal_records] = useState(0);
  const [profile_section_width, setprofile_section_width] = useState(0);
  const [header_section_padding, setheader_section_padding] = useState(0);

  const { auth_key, login, user_details } = useSelector(authSelector);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    tradly.app
      .commonFuntion({
        path: `/v1/activities?page=${page}`,
        Method: 'GET',
        authKey: auth_key,
      })
      .then((res) => {
        if (!res.error) {
          setNotifications(res.data.activities);
          setPage(res.data.page);
          setTotal_records(res.data.total_records);
        }
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
    setWindow_width(window?.innerWidth);
    const header_section = document.getElementById('header_section');
    const paddingLeft = window
      .getComputedStyle(header_section, null)
      ?.getPropertyValue('padding-left');
    setprofile_section_width(
      Number(document.getElementById('header_nav_items')?.offsetWidth) -
        Number(document.getElementById('profile_section')?.offsetWidth)
    );

    setheader_section_padding(paddingLeft);
  }, [auth_key, router, dispatch]);

  const { my_stores } = useSelector(storeSelector);

  const fetch_more = () => {
    tradly.app
      .commonFuntion({
        path: `/v1/activities?page=${page + 1}`,
        Method: 'GET',
        authKey: auth_key,
      })
      .then((res) => {
        if (!res.error) {
          setNotifications([...notifications, ...res.data.activities]);
          setPage(res.data.page);
          setTotal_records(res.data.total_records);
        }
      });
  };

  //   useEffect(() => {
  //     setHasMore(total_records > notifications?.length ? true : false);
  //   }, [notifications]);

  return (
    <div className="group   relative">
      <div className=" block group-hover:hidden cursor-pointer">
        {notification_icon_without_hover}
      </div>
      <div className=" hidden group-hover:block cursor-pointer">
        {notification_icon_with_hover}
      </div>
      <div>
        <div
          className={
            '  opacity-0  h-0  group-hover:h-auto group-hover:opacity-100  fixed top-0 right-0 z-[60]   mt-[40px]   transition duration-700  ease-in-out'
          }
          style={
            window_width > 768
              ? {
                  marginRight: `calc(${header_section_padding} + 107px)`,
                }
              : {
                  marginRight: `calc(${header_section_padding}  `,
                }
          }
        >
          {login && (
            <div className="bg-[#fff] rounded-lg  hidden group-hover:block  group-hover:mt-[20px]  group-hover:pb-[15px]   min-h-0  group-hover:min-h-[100px]  border border-[rgba(250, 250, 250, 0.93)]  shadow-sm  relative     ">
              {/* <div className="w-[15px] h-[15px] bg-[#fff] absolute   left-0  transform rotate-45  -top-2  ml-[25%]    border-l border-t border-[rgba(250, 250, 250, 0.93)]  z-[50]" /> */}

              {notifications !== null && notifications?.length !== 0 ? (
                <div className="  max-w-[350px]  h-0 group-hover:h-[70vh] overflow-auto scrollbar  scrollbar-thin   scrollbar-track-gray-100  scrollbar-thumb-gray-300  pt-[20px] ">
                  {notifications?.map((nt, index) => {
                    if (nt.type == 1) {
                      return (
                        <Link href={'a/my-store?page=1'}>
                          <a
                            key={Math.random()}
                            className="px-4 py-3 w-full min-h-[60px] my-2  flex gap-3  items-start cursor-pointer"
                            // onClick={() => router.push('a/my-store?page=1')}
                          >
                            <div className=" w-[36px] h-[36px]   sm:w-[56px]  sm:h-[56px] relative rounded-full overflow-hidden ">
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
                              <p className="text-sm font-medium text-primary mt-1">
                                {changeDateFormat(
                                  nt.created_at,
                                  'DD-MM-YYYY, h:mm:ss a'
                                )}
                              </p>
                            </div>
                          </a>
                        </Link>
                      );
                    }
                    if (nt.type == 2) {
                      return (
                        <Link
                          href={`/l/${
                            nt?.listing?.id
                          }-${nt?.listing?.title.replace(/\W/g, '+')}`}
                        >
                          <a
                            key={Math.random()}
                            className="px-4 py-3 w-full min-h-[60px] my-2  flex gap-3  items-start cursor-pointer"
                            // onClick={() =>
                            //   router.push(
                            //     `/l/${
                            //       nt?.listing?.id
                            //     }-${nt?.listing?.title.replace(/\W/g, '+')}`
                            //   )
                            // }
                          >
                            <div className=" w-[36px] h-[36px]   sm:w-[56px]  sm:h-[56px] relative rounded-full overflow-hidden ">
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
                              <p className="text-sm font-medium text-primary mt-1">
                                {changeDateFormat(
                                  nt.created_at,
                                  'DD-MM-YYYY, h:mm:ss a'
                                )}
                              </p>
                            </div>
                          </a>
                        </Link>
                      );
                    }

                    if (nt.type == 3) {
                      if (
                        my_stores?.length > 0 &&
                        nt?.metadata.account_id == my_stores[0].id
                      ) {
                        return (
                          <Link
                            href={`/a/orders/${nt?.reference_id}?store_id=${my_stores[0].id}`}
                          >
                            <a
                              key={Math.random()}
                              className="px-4 py-3 w-full min-h-[60px] my-2  flex gap-3  items-start cursor-pointer"
                              // onClick={() =>
                              //   account_order_link(
                              //     nt?.reference_id,
                              //     my_stores[0].id
                              //   )
                              // }
                            >
                              <div className=" w-[36px] h-[36px]   sm:w-[56px]  sm:h-[56px] relative rounded-full overflow-hidden  flex justify-center  ">
                                <p>{order_icon}</p>
                              </div>
                              <div>
                                <h2 className=" text-sm font-semibold text-[#050505]">
                                  {account_order_notification_text(
                                    nt?.metadata?.order_status
                                  )}
                                </h2>
                                <p className="text-sm font-medium text-primary mt-1">
                                  {changeDateFormat(
                                    nt.created_at,
                                    'DD-MM-YYYY, h:mm:ss a'
                                  )}
                                </p>
                              </div>
                            </a>
                          </Link>
                        );
                      } else if (
                        my_stores?.length == 0 ||
                        nt?.metadata.account_id != my_stores[0].id
                      ) {
                        return (
                          <Link href={`/orders/${nt?.reference_id}`}>
                            <a
                              key={Math.random()}
                              className="  px-4 py-3 w-full min-h-[60px] my-2  flex gap-3  items-start cursor-pointer"
                              // onClick={() => order_link(nt?.reference_id)}
                            >
                              <div className=" w-[36px] h-[36px]   sm:w-[56px]  sm:h-[56px] relative rounded-full overflow-hidden  flex justify-center  ">
                                <p>{order_icon}</p>
                              </div>
                              <div>
                                <h2 className=" text-sm font-semibold text-[#050505]">
                                  {order_notification_text(
                                    nt?.metadata?.order_status
                                  )}
                                </h2>
                                <p className="text-sm font-medium text-primary mt-1">
                                  {changeDateFormat(
                                    nt.created_at,
                                    'DD-MM-YYYY, h:mm:ss a'
                                  )}
                                </p>
                              </div>
                            </a>
                          </Link>
                        );
                      }
                    }
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
                  <h2 className="px-3 py-4 text-center text-sm font-medium text-primary">
                    No notifications are available now.
                  </h2>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
