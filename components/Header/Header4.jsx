import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../Shared/utils/Dropdown';
import Transition from '../Shared/utils/Transition';
import Image from 'next/image';
import { getThumbnailImage } from '../Shared/Constant/Constant';
import tradly from 'tradly';
import HeaderProfile from '../HeaderProfileBox/HeaderProfile3';
import StoreButton from '../StoreButton/StoreButton';
import SearchBox from '../SearchBox/SearchBox';
import CustomSearchBox from '../SearchBox/CustomSearchBox';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

function Header4() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [top, setTop] = useState(true);
  const router = useRouter();
  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  const [logo, setLogo] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setLogo(localStorage.getItem('logo'));
    setLogin(localStorage.getItem('login'));
  }, [0]);

  //
  const [allCategories, setAllCategories] = useState(null);
  useEffect(() => {
    setLogo(localStorage.getItem('logo'));
    axios
      .get('/api/categories', { params: { parent: 0, type: 'listings' } })
      .then((res) => {
        setAllCategories(res.data.categories);
      });
  }, [0]);

  return (
    <header
      className={`sticky top-0 w-full z-40 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && 'bg-white  blur  shadow-lg'
      }`}
    >
      <div className=" relative max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16  ">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link href="/">
              <div className="block" aria-label="Cruip">
                {logo && (
                  <Link href="/" passHref={true}>
                    <a className=" flex items-center   relative cursor-pointer ">
                      <Image
                        src={logo}
                        height={50}
                        width={50}
                        objectFit="contain"
                        alt="logo"
                      />
                    </a>
                  </Link>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:flex-grow">
            {/* Desktop menu links */}
            <ul className="text-base font-semibold flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href={{
                    pathname: '/l',
                    query: { page: 1 },
                  }}
                  passHref
                >
                  <a className="text-gray-800 hover:text-primary px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                    All Listings
                  </a>
                </Link>
              </li>
              <li className="hidden lg:block">
                <Link
                  href={{
                    pathname: '/l',
                    query: { page: 1, sort: 'newest_first' },
                  }}
                  passHref
                >
                  <a className="text-gray-800 hover:text-primary px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                    Newest
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: '/a',
                    query: { page: 1 },
                  }}
                  passHref
                >
                  <a className="text-gray-800 hover:text-primary px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out">
                    All accounts
                  </a>
                </Link>
              </li>

              {/* 1st level: hover */}
              <Dropdown title="Categories">
                {/* 2nd level: hover */}
                {allCategories?.map((item, index, array) => {
                  return (
                    <li key={index}>
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
                        <a className="font-medium text-sm text-gray-800 hover:text-primary flex py-2 px-5 leading-tight">
                          {item.name.length > 20
                            ? item.name.substring(0, 19) + '.'
                            : item.name}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </Dropdown>
            </ul>

            {/* Desktop sign in links */}
            {login ? (
              <ul className="flex flex-grow justify-end flex-wrap items-center gap-3">
                <SearchBox />
                <StoreButton />
                <HeaderProfile />
              </ul>
            ) : (
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <Link href={`/sign-in?to=${router.asPath}`}>
                    <a className="font-medium text-gray-800 hover:text-primary px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Sign in
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up">
                    <a className="btn-sm text-gray-200 bg-primary hover:bg-gray-800 ml-3">
                      <span>Sign up</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden gap-3">
            <ul>
              <CustomSearchBox />
            </ul>
            <ul>
              <HeaderProfile />
            </ul>
            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && 'active'}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-primary"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" />
                <rect y="11" width="24" height="2" />
                <rect y="18" width="24" height="2" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <div ref={mobileNav}>
              <Transition
                show={mobileNavOpen}
                tag="nav"
                id="mobile-nav"
                className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
              >
                <ul className="px-5 py-2">
                  <li>
                    <Link
                      href={{
                        pathname: '/l',
                        query: { page: 1 },
                      }}
                      passHref
                    >
                      <a className="flex text-gray-800 hover:text-primary py-2">
                        All Listings
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: '/l',
                        query: { page: 1, sort: 'newest_first' },
                      }}
                      passHref
                    >
                      <a className="flex text-gray-800 hover:text-primary py-2">
                        Newest
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: '/a',
                        query: { page: 1 },
                      }}
                      passHref
                    >
                      <a className="flex text-gray-800 hover:text-primary py-2">
                        All accounts
                      </a>
                    </Link>
                  </li>

                  <li className="py-2 my-2 border-t border-b border-gray-200">
                    <span className="flex text-gray-800 hover:text-primary py-2">
                      Categories
                    </span>
                    <ul className="pl-4">
                      {allCategories?.map((item, index, array) => {
                        return (
                          <li key={index}>
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
                              <a className="text-sm flex font-medium text-gray-800 hover:text-primary py-2">
                                {item.name.length > 20
                                  ? item.name.substring(0, 19) + '.'
                                  : item.name}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  {!login && (
                    <>
                      <li>
                        <Link href={`/sign-in?to=${router.asPath}`}>
                          <a className="flex font-medium w-full text-gray-800 hover:text-primary py-2 justify-center">
                            Sign in
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/sign-up">
                          <a className="btn-sm text-gray-200 bg-primary hover:bg-gray-800 w-full my-2">
                            <span>Sign up</span>
                            <svg
                              className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                                fill="#999"
                                fillRule="nonzero"
                              />
                            </svg>
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header4;
