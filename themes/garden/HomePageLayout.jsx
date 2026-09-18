/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import {
  AllPromoBanners,
  homeCollections,
  homeSelector,
} from '../../store/feature/homeSlice';
import GardenListingCard from './GardenListingCard';

// Garden home: quiet hero, category chips, collection rows.
// Data comes from the same home slice as every other theme.
const HomePageLayout = () => {
  const dispatch = useDispatch();
  const { auth_key } = useSelector(authSelector);

  useEffect(() => {
    dispatch(homeCollections({ authKey: localStorage.getItem('auth_key') }));
    dispatch(
      AllPromoBanners({
        authKey: localStorage.getItem('auth_key'),
        bodyParam: { placement: 'footer' },
      })
    );
  }, [auth_key, dispatch]);

  const { collections, categories } = useSelector(homeSelector);

  return (
    <div className="max-w-[1224px] mx-auto">
      {/* Hero */}
      <div className="text-center pt-10 pb-8 px-4">
        <p className="text-xs tracking-[0.25em] uppercase text-garden-moss font-semibold">
          The hobby greenhouse
        </p>
        <h1 className="font-garden-serif text-4xl md:text-5xl text-garden-pine mt-3 leading-tight">
          Grow something
          <br />
          beautiful today
        </h1>
        <p className="mt-4 text-garden-soil/70 max-w-xl mx-auto">
          Plants, seeds and honest tools from growers who love them as much
          as you do.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/l"
            className="px-6 py-3 rounded-full bg-garden-leaf text-white text-sm font-semibold hover:bg-garden-pine transition-colors"
          >
            Browse plants
          </Link>
          <Link
            href="/lc"
            className="px-6 py-3 rounded-full border border-garden-leaf/30 text-garden-leaf text-sm font-semibold hover:border-garden-leaf transition-colors"
          >
            Categories
          </Link>
        </div>
      </div>

      {/* Category chips */}
      {categories?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 pt-2 px-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/lc/${cat.slug || cat.name}?category_id=${cat.id}&page=1`}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-white border border-garden-moss/25 text-sm text-garden-pine hover:border-garden-leaf transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Collections */}
      {collections?.map((collection) => (
        <div key={collection.id} className="mt-10">
          <div className="flex items-baseline justify-between px-1">
            <h2 className="font-garden-serif text-2xl text-garden-pine">
              {collection.title}
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(collection.listings || []).slice(0, 8).map((item) => (
              <GardenListingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageLayout;
