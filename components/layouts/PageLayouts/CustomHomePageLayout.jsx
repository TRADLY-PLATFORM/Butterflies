import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Add_Head from '../../Shared/Header/Head';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import {
  AllPromoBanners,
  homeCollections,
  homeSelector,
} from '../../../store/feature/homeSlice';
import { configsSelector } from '../../../store/feature/configsSlice';
import Footer from '../../Footer/Footer';
import Header4 from '../../Header/Header4';
import Listings from '../../home/CustomListings/Listings';

const CustomHomePageLayout = ({ pageTitle, pageDescription }) => {
  const dispatch = useDispatch();
  const { auth_key } = useSelector(authSelector);

  useEffect(() => {
    dispatch(
      homeCollections({
        authKey: localStorage.getItem('auth_key'),
      })
    );
    dispatch(
      AllPromoBanners({
        authKey: localStorage.getItem('auth_key'),
        bodyParam:{medium:"web"},
      })
    );
  }, [auth_key, dispatch]);

  const {
    collections,
    isFetching,
    isSuccess,
    errorMessage,
    categories,
    promo_banners,
    page_promo_banners,
  } = useSelector(homeSelector);

  const { general_configs, marketplace_type, marketplace_module } =
    useSelector(configsSelector);
  return (
    <>
      <div className=" ">
        <div className="grid md:grid-cols-2 items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] text-black font-bold pr-4">
              {general_configs?.header_text}
            </h2>
            <p className=" mt-2 text-[16px] text-black font-normal w-5/6">
              {general_configs?.header_descriptions}
            </p>
            {/* <Link href="#">
              <a className=" mt-2 text-[16px]   text-primary font-bold">
                View all Apps
              </a>
            </Link> */}
          </div>
          <div className=" relative   aspect-w-4 aspect-h-2">
            {page_promo_banners?.length > 0 && (
              <Image
                src={page_promo_banners[0]?.image_path}
                layout="fill"
                alt=""
                objectFit="cover"
              />
            )}
          </div>
        </div>
        <div className="grid  md:grid-cols-4  mt-14">
          <div>
            <ul className="pt-5">
              <li className="pb-2">
                <button className="text-2xl block text-left w-full   text-primary">
                  All Categories
                </button>
              </li>
              {categories?.length > 0 &&
                categories.map((item, index) => {
                  return (
                    <li className="py-2" key={index}>
                      <Link
                        href={{
                          pathname: `/lc/[name]`,
                          query: {
                            name: item.name.replace(/\s/g, '-'),
                            category_id: item.id,
                            page: 1,
                          },
                        }}
                      >
                        <a className="text-sm block text-left w-full  ">
                          {item.name.length > 20
                            ? item.name.substring(0, 19) + '.'
                            : item.name}
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-span-3 pt-5">
            {collections?.map((collection) => {
              const scope_type = collection.scope_type;

              if (scope_type === 4) {
                return (
                  <div key={Math.random()}>
                    <Listings products={collection} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomHomePageLayout;
