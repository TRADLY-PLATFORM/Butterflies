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
} from '../Shared/Constant/Icons/AllIcons';
import tradly from 'tradly';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { priceRange } from '../Shared/Constant/Constant';
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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAtValues, setSelectedAtValues] = useState([]);

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

    if (category_id) {
      setSelectedCategories(category_id.split(','));
    }
    if (attribute_value_id) {
      setSelectedAtValues(attribute_value_id.split(','));
    }
  }, [router.query]);

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

  const filter_by_category = (id) => {
    const check = selectedCategories?.find((ct) => ct == id);
    if (check === undefined) {
      setSelectedCategories([...selectedCategories, id]);
      router.push({
        query: {
          ...router.query,
          category_id: [...selectedCategories, id].toString(''),
        },
      });
    } else {
      const filter = selectedCategories?.filter((ct) => ct != id);
      setSelectedCategories(filter);
      if (filter.length > 0) {
        router.push({
          query: {
            ...router.query,
            category_id: [...filter].toString(''),
          },
        });
      } else {
        const queries = { ...router.query };
        delete queries.category_id;
        router.push({
          query: { ...queries },
        });
      }
    }
  };

  const filter_by_attribute_value = (id) => {
    const check = selectedAtValues?.find((at) => at == id);
    if (check === undefined) {
      setSelectedAtValues([...selectedAtValues, id]);
      router.push({
        query: {
          ...router.query,
          attribute_value_id: [...selectedAtValues, id].toString(''),
        },
      });
    } else {
      const filter = selectedAtValues?.filter((at) => at != id);
      setSelectedAtValues(filter);
      if (filter.length > 0) {
        router.push({
          query: {
            ...router.query,
            attribute_value_id: [...filter].toString(''),
          },
        });
      } else {
        const queries = { ...router.query };
        delete queries.attribute_value_id;
        router.push({
          query: { ...queries },
        });
      }
    }
  };

  const filter_by_price_rang = (value) => {
    if (sort == value) {
      const queries = { ...router.query };
      delete queries.sort;
      router.push({
        query: { ...queries },
      });
    } else {
      router.push({
        query: {
          ...router.query,
          sort: value,
        },
      });
    }
  };
  const filter_by_rating = (rating_value) => {
    if (rating == rating_value) {
      const queries = { ...router.query };
      delete queries.rating;
      router.push({
        query: { ...queries },
      });
    } else {
      router.push({
        query: {
          ...router.query,
          rating: rating_value,
        },
      });
    }
  };

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
                        className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center  "
                        key={Math.random()}
                        // onClick={() => filter_by_category(item.id)}
                      >
                        <span className=" ">{item.name}</span>
                        <input
                          className=" form-check-input appearance-none h-3 w-3 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-primary checked:hover:bg-primary  checked:focus:ring-primary checked:focus:bg-primary  transition duration-200   align-top bg-no-repeat bg-center bg-contain   mr-2 cursor-pointer"
                          type="checkbox"
                          checked={
                            selectedCategories?.includes(`${item.id}`)
                              ? true
                              : false
                          }
                          onChange={() => filter_by_category(item.id)}
                        />
                        {/* {selectedCategories?.includes(`${item.id}`) && (
                          
                        )} */}
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
                          className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center  "
                          key={Math.random()}
                          // onClick={() => filter_by_category(item.id)}
                        >
                          <span className=" ">{item.name}</span>
                          <input
                            className=" form-check-input appearance-none h-3 w-3 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-primary checked:hover:bg-primary  checked:focus:ring-primary checked:focus:bg-primary  transition duration-200   align-top bg-no-repeat bg-center bg-contain   mr-2 cursor-pointer"
                            type="checkbox"
                            checked={
                              selectedCategories?.includes(`${item.id}`)
                                ? true
                                : false
                            }
                            onChange={() => filter_by_category(item.id)}
                          />
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
                    className="  text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center cursor-pointer"
                    key={Math.random()}
                    onClick={() => filter_by_price_rang(item.value)}
                  >
                    <span className=" ">{item.label}</span>
                    {sort === item.value && (
                      <span className="mr-2">{check_icon}</span>
                    )}
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
                                ? 'text-[12px] pl-3 text-[#4F4F4F] font-semibold py-[7px]    flex justify-between items-center   transition duration-500  ease-in-out'
                                : 'hidden'
                            }
                            key={Math.random()}
                            // onClick={() =>
                            //   router.push({
                            //     query: {
                            //       ...router.query,
                            //       attribute_value_id: vl.id,
                            //     },
                            //   })
                            // }
                          >
                            <span className=" ">{vl.name}</span>
                            <input
                              className=" form-check-input appearance-none h-3 w-3 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-primary checked:hover:bg-primary  checked:focus:ring-primary checked:focus:bg-primary  transition duration-200   align-top bg-no-repeat bg-center bg-contain   mr-2 cursor-pointer"
                              type="checkbox"
                              checked={
                                selectedAtValues?.includes(`${vl.id}`)
                                  ? true
                                  : false
                              }
                              onChange={() => filter_by_attribute_value(vl.id)}
                            />
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
                  onClick={() => filter_by_rating(5)}
                >
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                </button>

                {rating == 5 && <span className="mr-2">{check_icon}</span>}
              </p>
              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() => filter_by_rating(4)}
                >
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                </button>

                {rating == 4 && <span className="mr-2"> {check_icon}</span>}
              </p>
              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() => filter_by_rating(3)}
                >
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                </button>

                {rating == 3 && <span className="mr-2">{check_icon}</span>}
              </p>
              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() => filter_by_rating(2)}
                >
                  <span>{star_icon}</span>
                  <span>{star_icon}</span>
                </button>

                {rating == 2 && <span className="mr-2">{check_icon}</span>}
              </p>
              <p className=" text-[12px] text-[#4F4F4F] font-semibold py-[7px]  flex justify-between items-center ">
                <button
                  className=" cursor-pointer flex items-center"
                  onClick={() => filter_by_rating(1)}
                >
                  <span>{star_icon}</span>
                </button>

                {rating == 1 && <span className="mr-2">{check_icon}</span>}
              </p>
            </div>
            <button
              className=" text-xm font font-medium text-red-600 cursor-pointer pb-[30%]"
              onClick={() => {
                router.push({
                  query: {
                    page: router.query.page,
                    search_key: router.query.search_key,
                  },
                }),
                  setSelectedAtValues([]),
                  setSelectedCategories([]);
              }}
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
