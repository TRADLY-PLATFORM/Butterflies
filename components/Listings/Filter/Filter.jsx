/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  angle_down,
  check_icon,
  filter_icon,
  star_icon,
} from '../../Shared/Constant/Icons/AllIcons';
import tradly from 'tradly';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { priceRange } from '../../Shared/Constant/Constant';
import OutsideClickHandler from 'react-outside-click-handler';

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSeeAllCategories, setIsSeeAllCategories] = useState(false);
  const [allCategories, setAllCategories] = useState(null);
  const [allAttributes, setAllAttributes] = useState(null);

  const router = useRouter();
  const category_id = router?.query?.category_id;
  const sort = router?.query?.sort;
  const rating = router?.query?.rating;
  const attribute_value_id = router?.query?.attribute_value_id;
  const [activeParent, setActiveParent] = useState([]);

  useEffect(() => {
    tradly.app
      .getCategory({ bodyParam: { parent: 0, type: 'listings' }, authKey: '' })
      .then((res) => {
        if (!res.error) {
          setAllCategories(res.data.categories);
        }
      });

    tradly.app.getAttribute({ bodyParam: { type: 'listings' } }).then((res) => {
      if (!res.error) {
        setAllAttributes(res.data.attributes);
      }
    });
  }, []);

  const toggleChildren = (e, id, children) => {
    e.stopPropagation();

    const findParent = activeParent?.find((parentId) => parentId === id);
    let filterActive;
    if (findParent !== undefined) {
      filterActive = activeParent?.filter((parentId) => parentId !== id);
    }

    setActiveParent(
      findParent === undefined ? [...activeParent, id] : [...filterActive]
    );
  };

  console.log(activeParent);

  return (
    <div className=" relative   h-[56px]">
      <button
        className={[
          ' bg-[#FEFEFE] rounded-lg  shadow-c-sm  w-[245px] h-[56px]  flex items-center px-4  z-30  cursor-pointer  ',
          isFilterOpen ? 'fixed' : 'relative ',
        ].join(' ')}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <span>{filter_icon}</span>
        <p className=" text-primary font-medium text-base ml-3">Filter</p>
      </button>
      
      <OutsideClickHandler
        onOutsideClick={() => {
          isFilterOpen && setIsFilterOpen(false);
        }}
      >
        <div
          className={[
            'bg-[#FEFEFE] w-[245px] shadow-c-sm rounded-lg fixed  z-20  ',
            isFilterOpen
              ? ' transition duration-1000 h-[78%] mt-[10px] pt-[60px] pb-7 overflow-auto scrollbar  scrollbar-thin   scrollbar-track-gray-100  scrollbar-thumb-gray-300   '
              : 'h-0',
          ].join(' ')}
        >
          <div
            className={
              isFilterOpen ? 'w-full h-full block pl-6 pr-[15px]  ' : ' hidden'
            }
          >
            {/* Categories Part */}
            <div>
              <h4 className=" text-sm text-[#121212] font-bold py-[7px]  flex justify-between items-center  ">
                <span className=" cursor-pointer">All Categories</span>
                {category_id === undefined && <span>{check_icon}</span>}
              </h4>
              {allCategories?.map((item, index, array) => {
                if (array.length > 4) {
                  if (index < 4) {
                    return (
                      <p
                        className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center "
                        key={Math.random()}
                      >
                        <span
                          className=" cursor-pointer"
                          onClick={() =>
                            router.push({
                              query: {
                                ...router.query,
                                category_id: item.id,
                              },
                            })
                          }
                        >
                          {item.name}
                        </span>
                        {category_id == item.id && <span>{check_icon}</span>}
                      </p>
                    );
                  }
                  if (index === 4) {
                    return (
                      <button
                        className=" text-xs text-primary font-semibold py-[7px]  flex justify-between items-center  cursor-pointer w-full"
                        onClick={() =>
                          setIsSeeAllCategories(!isSeeAllCategories)
                        }
                      >
                        <span>See all categories</span>
                        <span
                          className={
                            isSeeAllCategories && 'transform rotate-180'
                          }
                        >
                          {angle_down}
                        </span>
                      </button>
                    );
                  }
                }
              })}

              {isSeeAllCategories &&
                allCategories?.map((item, index, array) => {
                  if (array.length > 4) {
                    if (index > 4) {
                      return (
                        <p
                          className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center "
                          key={Math.random()}
                        >
                          <span
                            className=" cursor-pointer"
                            onClick={() =>
                              router.push({
                                query: {
                                  ...router.query,
                                  category_id: item.id,
                                },
                              })
                            }
                          >
                            {item.name}
                          </span>
                          {category_id == item.id && <span>{check_icon}</span>}
                        </p>
                      );
                    }
                  }
                })}
            </div>

            {/* Price Range */}
            <div className=" mt-3">
              <h4 className=" text-sm text-[#121212] font-bold py-[7px]  flex justify-between items-center  ">
                <span className=" cursor-pointer">Price Range</span>
                {sort === undefined && <span>{check_icon}</span>}
              </h4>
              {priceRange?.map((item) => {
                return (
                  <p
                    className="  text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center "
                    key={Math.random()}
                  >
                    <span
                      className=" cursor-pointer"
                      onClick={() =>
                        router.push({
                          query: {
                            ...router.query,
                            sort: item.value,
                          },
                        })
                      }
                    >
                      {item.label}
                    </span>
                    {sort === item.value && <span>{check_icon}</span>}
                  </p>
                );
              })}
            </div>
            {/* Atttributes  */}
            <div className=" mt-3">
            
              {allAttributes?.map((item) => {
                return (
                  <ul className="" key={Math.random()}>
                    <li
                      className="text-sm text-[#121212] font-bold py-[7px]  flex justify-between items-center  cursor-pointer"
                      onClick={(e) => toggleChildren(e, item.id, item.values)}
                    >
                      <span>{item.name}</span>
                      {
                        <span
                          className={
                            activeParent.includes(item.id)
                              ? 'transform rotate-180'
                              : ''
                          }
                        >
                          {angle_down}
                        </span>
                      }
                    </li>
                    {item?.values?.length > 0 &&
                      item?.values?.map((vl) => {
                        return (
                          <li
                            className={
                              activeParent.includes(item.id)
                                ? 'text-[12px] px-3 text-[#4F4F4F] font-semibold py-[7px]    flex justify-between items-center cursor-pointer transition duration-500  ease-in-out'
                                : 'hidden'
                            }
                            key={Math.random()}
                            onClick={() =>
                              router.push({
                                query: {
                                  ...router.query,
                                  attribute_value_id: vl.id,
                                },
                              })
                            }
                          >
                            <span className=" ">{vl.name}</span>
                            {attribute_value_id == vl.id && (
                              <span>{check_icon}</span>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                );
              })}
            </div>
            {/* Ratings Range */}
            <div className=" mt-3  pb-[30px]">
              <h4 className=" text-sm text-[#121212] font-bold py-[7px]  flex justify-between items-center  ">
                <span className=" cursor-pointer">Ratings</span>
                {rating === undefined && <span>{check_icon}</span>}
              </h4>

              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() =>
                    router.push({
                      query: {
                        ...router.query,
                        rating: 5,
                      },
                    })
                  }
                >
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                </button>

                {rating == 5 && <span>{check_icon}</span>}
              </p>
              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() =>
                    router.push({
                      query: {
                        ...router.query,
                        rating: 4,
                      },
                    })
                  }
                >
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                </button>

                {rating == 4 && <span>{check_icon}</span>}
              </p>
              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() =>
                    router.push({
                      query: {
                        ...router.query,
                        rating: 3,
                      },
                    })
                  }
                >
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                </button>

                {rating == 3 && <span>{check_icon}</span>}
              </p>
              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() =>
                    router.push({
                      query: {
                        ...router.query,
                        rating: 2,
                      },
                    })
                  }
                >
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                </button>

                {rating == 2 && <span>{check_icon}</span>}
              </p>
              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() =>
                    router.push({
                      query: {
                        ...router.query,
                        rating: 1,
                      },
                    })
                  }
                >
                  <span>{star_icon}</span>
                </button>

                {rating == 1 && <span>{check_icon}</span>}
              </p>
            </div>
            <button
              className=" text-xm font font-medium text-red-600 cursor-pointer pb-[30%]"
              onClick={() =>
                router.push({
                  query: {
                    page: router.query.page,
                  },
                })
              }
            >
              Reset Filter
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Filter;
