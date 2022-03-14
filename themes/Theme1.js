 import { default as MainLayout } from '../components/layouts/MainLayouts/MainLayout';
import { default as EventDetailsPageLayout } from '../components/layouts/PageLayouts/EventDetailsPageLayout';
import { default as HomePageLayout } from '../components/layouts/PageLayouts/HomePageLayout';
import { default as ListingsPageLayout } from '../components/layouts/PageLayouts/ListingsPageLayout';
import { default as ProductDetailsPageLayout } from '../components/layouts/PageLayouts/ProductDetailsPageLayout';
import { TYPE_CONSTANT } from '../constant/Web_constant';
import DefaultErrorPage from 'next/error';
import { default as Error_Page } from '../constant/404';
import { default as CustomLayout } from '../components/layouts/MainLayouts/CustomLayout';
import { default as CustomHomePageLayout } from '../components/layouts/PageLayouts/CustomHomePageLayout';
import { default as CustomProductDetailsPageLayout } from '../components/layouts/PageLayouts/CustomProductDetailsPageLayout';
import { default as AllAccountsPageLayout } from '../components/layouts/PageLayouts/AllAccountsPageLayout';
import { default as CustomMyStorePageLayout } from '../components/layouts/PageLayouts/CustomMyStorePageLayout';
import { default as MyStorePageLayout } from '../components/layouts/PageLayouts/MyStorePageLayout';
import { default as CustomCreateStorePageLayout } from '../components/layouts/PageLayouts/CustomCreateStorePageLayout';
import { default as CreateStorePageLayout } from '../components/layouts/PageLayouts/CreateStorePageLayout';
import { default as CustomEditStorePageLayout } from '../components/layouts/PageLayouts/CustomEditStorePageLayout';
import { default as EditStorePageLayout } from '../components/layouts/PageLayouts/EditStorePageLayout';
import { default as CustomEditProductPageLayout } from '../components/layouts/PageLayouts/CustomEditProductPageLayout';
import { default as EditProductPageLayout } from '../components/layouts/PageLayouts/EditProductPageLayout';
import { default as AddCustomListingPageLayout } from '../components/layouts/PageLayouts/AddCUstomListingPageLayout';
import { default as AddEventPageLayout } from '../components/layouts/PageLayouts/AddEventPageLayout';
import { default as AccountDetailsPageLayout } from '../components/layouts/PageLayouts/AccountDetailsPageLayout';
import { default as CustomAccountDetailsPageLayout } from '../components/layouts/PageLayouts/CustomAccountDetailsPageLayout';
import { default as EditProfilePageLayout } from '../components/layouts/PageLayouts/EditProfilePageLayout';
import { default as SearchPageLayout } from '../components/layouts/PageLayouts/SearchPageLayout';
import { default as CustomListingsPageLayout } from '../components/layouts/PageLayouts/CustomListingPageLayout';
import { default as CategoriesPageLayout } from '../components/layouts/PageLayouts/CategoriesPageLayout';
import { default as EventListingsPageLayout } from '../components/layouts/PageLayouts/EventListingsPageLayout';
import { default as EventSearchPageLayout } from '../components/layouts/PageLayouts/EventSearchPageLayout';


// Here In all condition first switch case for marketplace type and second switch case for marketplace module;

  
export function listing_details_page(pageTitle, pageDescription, MARKETPLACE_MODULES) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
      return (
        <MainLayout>
          <ProductDetailsPageLayout
            pageTitle={pageTitle}
            pageDescription={pageDescription} />
        </MainLayout>
      );
      break;
    case 2:
      return (
        <div className=" ">
          <MainLayout>
            <EventDetailsPageLayout
              pageTitle={pageTitle}
              pageDescription={pageDescription} />
          </MainLayout>
        </div>
      );
      break;
    case 3:
      return (
        <CustomLayout>
          <CustomProductDetailsPageLayout
            pageTitle={pageTitle}
            pageDescription={pageDescription} />
        </CustomLayout>
      );
      break;

    default:
      return (
        <MainLayout>
          <ProductDetailsPageLayout
            pageTitle={pageTitle}
            pageDescription={pageDescription} />
        </MainLayout>
      );
      break;
  }
}
export function all_accounts_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AllAccountsPageLayout />
        </MainLayout>
      );
      break;
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AllAccountsPageLayout />
        </MainLayout>
      );
      break;
    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AllAccountsPageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AllAccountsPageLayout />
        </MainLayout>
      );
      break;
  }
}
export function accounts_details_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AccountDetailsPageLayout />
        </MainLayout>
      );
      break;

    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <CustomAccountDetailsPageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AccountDetailsPageLayout />
        </MainLayout>
      );
      break;
  }
}
export function my_store_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <MyStorePageLayout />
        </MainLayout>
      );
      break;

    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <CustomMyStorePageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <MyStorePageLayout />
        </MainLayout>
      );
      break;
  }
}
export function create_store_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <CreateStorePageLayout />
        </MainLayout>
      );
      break;

    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <CustomCreateStorePageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <CreateStorePageLayout />
        </MainLayout>
      );
      break;
  }
}
export function edit_store_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <EditStorePageLayout />
        </MainLayout>
      );
      break;

    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <CustomEditStorePageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <EditStorePageLayout />
        </MainLayout>
      );
      break;
  }
}
export function add_listing_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AddEventPageLayout />
        </MainLayout>
      );
      break;

    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AddCustomListingPageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <AddEventPageLayout />
        </MainLayout>
      );
      break;
  }
}
export function edit_listing_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <EditProductPageLayout />
        </MainLayout>
      );
      break;

    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <CustomEditProductPageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <EditProductPageLayout />
        </MainLayout>
      );
      break;
  }
}
export function edit_profile_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <EditProfilePageLayout />
        </MainLayout>
      );
      break;

    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <EditProfilePageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <EditProfilePageLayout />
        </MainLayout>
      );
      break;
  }
}
export function search_page(pageTitle, pageDescription) {
  switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
    case 1:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <SearchPageLayout />
        </MainLayout>
      );
      break;
    case 2:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <EventSearchPageLayout />
        </MainLayout>
      );
      break;

    case 3:
      return (
        <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <SearchPageLayout />
        </CustomLayout>
      );
      break;
    default:
      return (
        <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
          <SearchPageLayout />
        </MainLayout>
      );
      break;
  }
}
