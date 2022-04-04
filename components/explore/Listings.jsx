/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDateFormat,
  getThumbnailImage,
} from '../Shared/Constant/Constant';
import { authSelector } from '../../store/feature/authSlice';
import {
  getAllListings,
  listingLike,
  listingSelector,
} from '../../store/feature/listingSlice';
import favorite from '../../assets/Images/Home/favourite@3x.png';
import heartIcon from '../../assets/Images/Home/heartIcon@3x.png';
import { configsSelector } from '../../store/feature/configsSlice';
import { check_login } from '../../constant/check_auth';

const Listings = ({ Products }) => {
  const { login, auth_key } = useSelector(authSelector);
  const { MARKETPLACE_MODULES, MARKETPLACE_FLAVOURS } =
    useSelector(configsSelector);

  // const { isSuccess } = useSelector(listingSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const { page } = useSelector(listingSelector);

  const like = (id, isLiked) => {
    if (check_login(router)) {
      dispatch(
        listingLike({
          id,
          isLiked,
          authKey: auth_key,
        })
      ).then((res) => {
        if (!res.payload.code) {
          dispatch(
            getAllListings({
              prams: {
                page,
                per_page: 30,
                status: 2,
              },
              authKey: auth_key,
            })
          );
        }
      });
    }
  };
  return (
    <div className="   grid grid-cols-2   gap-4  ms:gap-0  ms:grid-cols-[190px,190px] justify-around   xs:flex  xs:flex-wrap   xs:justify-center md:justify-center">
      {Products?.map((item) => (
        <div key={Math.random()} className="   ms:mb-5  ms:mr-4 relative">
          <div
            className=" ms:w-[190px] min-h-[210px] bg-[#FEFEFE]   rounded overflow-hidden cursor-pointer  shadow-c-sm"
            onClick={() =>
              item.slug
                ? router.push(`/l/${item.slug}`)
                : router.push(`/l/${item.id}-${item.title.replace(/\W/g, '-')}`)
            }
          >
            <div className=" ms:w-[190px]  h-[190px] relative">
              <Image
                src={getThumbnailImage(item?.images[0])}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            {MARKETPLACE_MODULES === 2 && (
              <p className=" mt-2 pl-2 text-[10px] leading-3 text-gray-900  font-medium">
                {changeDateFormat(item.start_at, 'dddd Do MMM YYYY')}
              </p>
            )}
            <div className="mt-2 pl-2">
              <p className=" text-sm leading-[15px] font-semibold text-primary">
                {item.title.length > 18
                  ? item.title.substring(0, 18) + '..'
                  : item.title}
              </p>
              <p className=" text-[10px] leading-4 font-medium text-gray-500 mt-1">
                {item.list_price.formatted}
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
                  {item?.account?.name.length > 10
                    ? item?.account?.name.substring(0, 18) + '..'
                    : item?.account?.name}
                </p>
                <p className="text-[10px] leading-3 text-[#4F4F4F] font-medium   opacity-50">
                  {item?.account?.total_followers} Followers
                </p>
              </div>
            </div>
          </div>
          {/* <div className=" mt-[9px] absolute top-0 left-0  flex   pl-[10px]  ">
						<svg
							className="text-primary"
							width="12"
							height="14"
							viewBox="0 0 12 14"
							fill="bg-primary"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M11.6399 5.42004C11.5463 4.44599 11.2021 3.51276 10.6407 2.71126C10.0793 1.90975 9.31999 1.26726 8.43658 0.846372C7.55318 0.42548 6.57584 0.240523 5.59973 0.309512C4.62362 0.378501 3.68201 0.699083 2.86659 1.24004C2.16605 1.70847 1.57796 2.32624 1.14455 3.04897C0.711143 3.7717 0.443184 4.58145 0.359921 5.42004C0.278242 6.25315 0.383037 7.09399 0.666701 7.88156C0.950365 8.66913 1.40579 9.38368 1.99992 9.97338L5.53325 13.5134C5.59523 13.5759 5.66896 13.6255 5.7502 13.6593C5.83144 13.6932 5.91858 13.7106 6.00659 13.7106C6.09459 13.7106 6.18173 13.6932 6.26297 13.6593C6.34421 13.6255 6.41794 13.5759 6.47992 13.5134L9.99992 9.97338C10.5941 9.38368 11.0495 8.66913 11.3331 7.88156C11.6168 7.09399 11.7216 6.25315 11.6399 5.42004ZM9.06659 9.03338L5.99992 12.1L2.93325 9.03338C2.48131 8.58141 2.13512 8.03493 1.91957 7.43322C1.70401 6.8315 1.62444 6.18951 1.68659 5.55338C1.74913 4.90745 1.95443 4.28348 2.28763 3.7266C2.62084 3.16973 3.07362 2.69385 3.61325 2.33338C4.32055 1.86353 5.15079 1.61291 5.99992 1.61291C6.84905 1.61291 7.67929 1.86353 8.38659 2.33338C8.92458 2.69245 9.37637 3.16623 9.70949 3.72067C10.0426 4.27511 10.2488 4.89644 10.3133 5.54004C10.3774 6.17833 10.2989 6.82289 10.0832 7.42708C9.86763 8.03126 9.52036 8.57993 9.06659 9.03338ZM5.99992 3.00004C5.40658 3.00004 4.82656 3.17599 4.33321 3.50563C3.83986 3.83528 3.45534 4.30381 3.22828 4.85199C3.00122 5.40017 2.94181 6.00337 3.05756 6.58531C3.17332 7.16726 3.45904 7.70181 3.8786 8.12136C4.29816 8.54092 4.83271 8.82664 5.41465 8.9424C5.99659 9.05816 6.59979 8.99874 7.14797 8.77168C7.69615 8.54462 8.16468 8.1601 8.49433 7.66675C8.82397 7.17341 8.99992 6.59339 8.99992 6.00004C8.99816 5.20494 8.68152 4.4429 8.1193 3.88067C7.55707 3.31844 6.79503 3.0018 5.99992 3.00004ZM5.99992 7.66671C5.67028 7.66671 5.34805 7.56896 5.07397 7.38583C4.79989 7.20269 4.58627 6.94239 4.46012 6.63785C4.33398 6.33331 4.30097 5.99819 4.36528 5.67489C4.42959 5.35159 4.58832 5.05462 4.82141 4.82153C5.0545 4.58844 5.35147 4.42971 5.67477 4.3654C5.99807 4.30109 6.33318 4.3341 6.63773 4.46024C6.94227 4.58639 7.20257 4.80001 7.3857 5.07409C7.56884 5.34818 7.66659 5.67041 7.66659 6.00004C7.66659 6.44207 7.49099 6.86599 7.17843 7.17855C6.86587 7.49112 6.44195 7.66671 5.99992 7.66671Z" />
						</svg>
						<p className=" text-black text-[10px] leading-3  font-semibold ml-1 mt-[1px]">
							{item.location.country}
						</p>
					</div> */}
          {/* <Link  href="#" passHref> */}
          <div
            className=" h-[40px] w-[40px]  absolute right-0 top-0 cursor-pointer  [z-100]  "
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
      ))}
    </div>
  );
};

export default Listings;
