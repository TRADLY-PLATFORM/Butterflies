import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import { configsSelector } from '../../store/feature/configsSlice';
import {
  AllPromoBanners,
  homeCollections,
  homeSelector,
} from '../../store/feature/homeSlice';
import Banner from '../../components/home/Banner/Banner';
import Banner3 from '../../components/home/Banner/Banner3';
import Banner2 from '../../components/home/Banner/Bannner2';
import Categories from '../../components/home/Categories/Categories';
import LatestEvent from '../../components/home/LatestEvents/LatestEvent';
import StoresForFollow from '../../components/home/Stores/StoresForFollow';
import CustomListings from '../../components/home/CustomListings/Listings';

const HomePageLayout = () => {
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
        bodyParam: { placement: 'footer' },
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

  const { general_configs, MARKETPLACE_MODULES, MARKETPLACE_FLAVOURS } =
    useSelector(configsSelector);
   return (
    <div className="">
      <div>
        <Banner2 banners={promo_banners} />
      </div>

      {general_configs?.home_categories_enabled && (
        <div>
          <Categories categories={categories} />
        </div>
      )}
      {collections?.map((collection) => {
        const scope_type = collection.scope_type;
        if (scope_type === 2) {
          return (
            <div key={collection.id || Math.random()}>
              <CustomListings products={collection} />
            </div>
          );
        }
        if (scope_type === 1 && Number(MARKETPLACE_FLAVOURS) === 1) {
          return (
            <div key={collection.id || Math.random()}>
              <StoresForFollow stores={collection} />
            </div>
          );
        }
        if (scope_type === 4) {
          return (
            <div key={collection.id || Math.random()}>
              <LatestEvent products={collection} />
            </div>
          );
        }
      })}
      <div className="mt-9">
        <Banner3 />
      </div>
    </div>
  );
};

export default HomePageLayout;
