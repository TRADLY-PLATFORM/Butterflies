/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
  import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import {
	changeDateFormat,
	getThumbnailImage,
} from "../../Shared/Constant/Constant";
import {configsSelector}from "../../../store/feature/configsSlice"
import { authSelector } from "../../../store/feature/authSlice";
import { listingLike } from "../../../store/feature/listingSlice";
import { homeCollections } from "../../../store/feature/homeSlice";

import favorite from "../../../assets/Images/Home/favourite@3x.png";
import heartIcon from "../../../assets/Images/Home/heartIcon@3x.png";
// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const LatestEvent = ({ products }) => {
	const { login, auth_key } = useSelector(authSelector);
  const { marketplace_type , marketplace_module } = useSelector(configsSelector);
	// const { isSuccess } = useSelector(listingSelector);
	const dispatch = useDispatch();
	const router = useRouter();

	const like = (id, isLiked) => {
		if (login) {
			dispatch(
				listingLike({
					id,
					isLiked,
					authKey: auth_key,
				})
			).then((res) => {
				if (!res.payload.code) {
					dispatch(
						homeCollections({ authKey: auth_key })
					);
				}
			});
		} else {
			router.push("/sign-in");
		}
	};

	return (
    <div className="mt-10">
      <div className="flex justify-between items-center  ">
        <h2 className=" text-2xl text-black font-semibold">{products.title}</h2>
        <Link
          href={{
            pathname: '/l',
            query: { page: 1 },
          }}
          passHref
        >
          <a className=" block text-base text-primary font-semibold cursor-pointer">
            View All
          </a>
        </Link>
      </div>
      <div className=" mt-4 flex  justify-start ">
        <Swiper
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={16}
          loop={false}
          navigation={false}
          style={{ paddingBottom: '20px' }}
        >
          {products?.listings?.map((item) => (
            <SwiperSlide
              className=" w-[190px] h-[302px]    rounded mr-4 overflow-hidden"
              key={Math.random() * 3000000}
              style={{
                width: '190px',
                minHeight: '210px',
                paddingBottom: '10px',
              }}
            >
              <div className=" relative">
                <Link href={`/l/${item.id}-${item.title.replace(/\W/g, '-')}`}>
                  <a
                    className=" block w-[190px] min-h-[210px] bg-[#FEFEFE]   rounded mr-4 overflow-hidden cursor-pointer shadow-c-xsm relative"
                    // onClick={() =>
                    //   router.push(
                    //     `/l/${item.id}-${item.title.replace(/\W/g, '-')}`
                    //   )
                    // }
                  >
                    <div className="w-[190px]  h-[190px] relative">
                      <Image
                        src={getThumbnailImage(item.images[0])}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {/* {marketplace_type === 2 && (
                    <p className=" mt-2 pl-2 text-[10px] leading-3 text-gray-900  font-medium">
                      {changeDateFormat(item.start_at, 'dddd Do MMM YYYY')}
                    </p>
                  )} */}
                    <div className="mt-2 pl-2">
                      <p className=" text-sm leading-[15px] font-semibold text-primary">
                        {item.title.length > 18
                          ? item.title.substring(0, 18) + '..'
                          : item.title}
                      </p>
                      <p className=" mt-1 flex items-center flex-wrap">
                        <span className="text-[10px] leading-4 font-medium text-gray-500">
                          {item.list_price.currency}
                        </span>
                        <span className="text-[14px] leading-4 font-medium text-gray-600 ml-1">
                          {item.list_price.amount}
                        </span>
                      </p>
                    </div>
                    <div className=" pl-2 mt-4 mb-[14px] flex items-center">
                      {item?.account?.images.length > 0 ? (
                        <div className="h-5 w-5 rounded-full overflow-hidden  relative">
                          <Image
                            src={getThumbnailImage(item?.account.images[0])}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ) : (
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
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}

                      <div className="ml-1">
                        <p className=" text-[10px]   leading-3 text-[#4F4F4F] font-medium mix-blend-normal">
                          {item?.account?.name.length > 20
                            ? item?.account?.name.substring(0, 18) + '..'
                            : item?.account?.name}
                        </p>
                        <p className="text-[10px] leading-3 text-[#4F4F4F] font-medium   opacity-50">
                          {item?.account?.total_followers} Followers
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
                <div
                  className=" h-[40px] w-[40px]   cursor-pointer  [z-100] absolute top-0 right-0"
                  onClick={() => like(item.id, item.liked)}
                >
                  {item.liked ? (
                    <Image
                      src={favorite}
                      alt="follow button"
                      layout="fill"
                      objectFit="cover"
                      require
                    />
                  ) : (
                    <Image
                      src={heartIcon}
                      alt="follow button"
                      layout="fill"
                      objectFit="cover"
                      require
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestEvent;
