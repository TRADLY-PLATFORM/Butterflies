import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authSelector } from '../../../store/feature/authSlice';
import { configsSelector } from '../../../store/feature/configsSlice';
import {
  AllPromoBanners,
  homeCollections,
  homeSelector,
} from '../../../store/feature/homeSlice';
import Banner from '../../home/Banner/Banner';
import Categories from '../../home/Categories/Categories';
import LatestEvent from '../../home/LatestEvents/LatestEvent';
import StoresForFollow from '../../home/Stores/StoresForFollow';

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

  const { genral_configs, marketplace_type, marketplace_module } =
    useSelector(configsSelector);

  return (
    <div className="">
      {!page_promo_banners?.length > 0 && page_promo_banners?.length !== null && (
        <div>
          <Banner banners={promo_banners} />
        </div>
      )}
      <div>
        <Categories categories={categories} />
      </div>
      {collections?.map((collection) => {
        const scope_type = collection.scope_type;
        if (scope_type === 1 && marketplace_module === 1) {
          return (
            <div key={Math.random()}>
              <StoresForFollow stores={collection} />
            </div>
          );
        }
        if (scope_type === 4) {
          return (
            <div key={Math.random()}>
              <LatestEvent products={collection} />
            </div>
          );
        }
      })}
      <div>
        <Banner banners={page_promo_banners} />
      </div>
    </div>
  );
};

export default HomePageLayout;
