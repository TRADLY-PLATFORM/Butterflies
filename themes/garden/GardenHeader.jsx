/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import SearchBox from '../../components/SearchBox/SearchBox';
import HeaderProfile2 from '../../components/HeaderProfileBox/HeaderProfile2';
import WishListButton from '../../components/WishListButton/WishListButton';
import StoreButton from '../../components/StoreButton/StoreButton';
import SideMenubar from '../../components/SideMenubar/SideMenubar';
import ProductSideMenubar from '../../components/SideMenubar/ProductSideMenubar';
import { TYPE_CONSTANT } from '../../constant/Web_constant';

// Garden header: cream bar, capped logo, green accents, category row.
// Reuses the shared interactive pieces (search, profile, wishlist, store,
// drawer); only markup and styling are garden-specific.
const GardenHeader = () => {
  const [logo, setLogo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showUserMenus, setShowUserMenus] = useState(false);
  // Default matches SSR (SideMenubar); upgraded after mount if needed so
  // hydration never diverges on primed localStorage.
  const [useProductMenu, setUseProductMenu] = useState(false);
  const router = useRouter();

  const drawerOpen = () => {
    const drawer = document.getElementById('sideDrawer');
    drawer?.classList.remove('-translate-x-full');
    setIsDrawerOpen(true);
  };

  const selectmenubar = () => {
    if (useProductMenu) {
      return <ProductSideMenubar />;
    }
    return <SideMenubar />;
  };

  useEffect(() => {
    setUseProductMenu(
      Number(localStorage.getItem('MARKETPLACE_MODULES')) === 1
    );
  }, []);

  useEffect(() => {
    setLogo(localStorage.getItem('logo'));
  }, []);

  useEffect(() => {
    axios
      .get('/api/categories', { params: { parent: 0, type: 'listings' } })
      .then((res) => {
        const list = res?.data?.categories;
        if (Array.isArray(list)) setCategories(list.slice(0, 9));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {showUserMenus ? (
        <div className="w-[100vw] h-[100vh] top-0 z-[60] fixed bg-transparent opacity-100" />
      ) : (
        ''
      )}
      <div className="bg-garden-cream/95 backdrop-blur border-b border-garden-moss/20">
        <div className="max-w-[1224px] mx-auto px-4 md:px-[50px]">
          <div className="flex items-center justify-between py-3 gap-3">
            <button
              className="outline-none md:hidden"
              onClick={drawerOpen}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-garden-pine cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {logo && (
              <Link
                href="/"
                className="flex items-center relative cursor-pointer max-w-[200px] max-h-[52px] overflow-hidden shrink-0"
              >
                <img
                  src={logo}
                  alt="logo"
                  className="object-contain max-h-[52px] max-w-[200px]"
                />
              </Link>
            )}
            <div className="hidden md:block flex-grow max-w-xl mx-6">
              <SearchBox />
            </div>
            <div className="flex items-center gap-1">
              {TYPE_CONSTANT.MARKETPLACE_FLAVOURS === 1 && (
                <div className="mr-1 hidden sm:block">
                  <StoreButton />
                </div>
              )}
              <div className="mr-1">
                <WishListButton />
              </div>
              <HeaderProfile2
                showUserMenus={showUserMenus}
                setShowUserMenus={setShowUserMenus}
              />
            </div>
          </div>
          <div className="md:hidden pb-3">
            <SearchBox />
          </div>
          {categories.length > 0 && (
            <nav className="hidden md:flex items-center gap-6 pb-3 overflow-x-auto">
              {categories.map((cat) => {
                const href = `/lc/${cat.slug || cat.name}?category_id=${cat.id}&page=1`;
                const active = router?.asPath?.includes(`category_id=${cat.id}`);
                return (
                  <Link
                    key={cat.id}
                    href={href}
                    className={`whitespace-nowrap text-sm transition-colors hover:text-garden-leaf ${
                      active
                        ? 'text-garden-leaf font-semibold underline underline-offset-8 decoration-garden-sun decoration-2'
                        : 'text-garden-pine'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
      {isDrawerOpen && (
        <div
          className="top-0 z-40 fixed h-full w-full bg-black opacity-30"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      <div
        id="sideDrawer"
        className={
          isDrawerOpen
            ? 'z-40 bg-garden-cream w-[245px] fixed inset-y-0 left-0 transform transition ease-in-out duration-500'
            : 'z-40 bg-garden-cream w-[245px] fixed inset-y-0 left-0 transform transition -translate-x-full ease-in-out duration-500'
        }
      >
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="absolute top-0 right-0 mt-[19px] mr-[19px] z-50"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-garden-pine"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="">{selectmenubar()}</div>
      </div>
    </>
  );
};

export default GardenHeader;
