/* eslint-disable @typescript-eslint/no-var-requires */
const {
  default: MainLayout,
} = require('../components/layouts/MainLayouts/MainLayout');
const {
  default: EventDetailsPageLayout,
} = require('../components/layouts/PageLayouts/EventDetailsPageLayout');
const {
  default: HomePageLayout,
} = require('../components/layouts/PageLayouts/HomePageLayout');
const {
  default: ListingsPageLayout,
} = require('../components/layouts/PageLayouts/ListingsPageLayout');
const {
  default: ProductDetailsPageLayout,
} = require('../components/layouts/PageLayouts/ProductDetailsPageLayout');
const { TYPE_CONSTANT } = require('../constant/Web_constant');
const DefaultErrorPage = require('next/error');
const { default: Error_Page } = require('../constant/404');
const {
  default: CustomLayout,
} = require('../components/layouts/MainLayouts/CustomLayout');
const {
  default: CustomHomePageLayout,
} = require('../components/layouts/PageLayouts/CustomHomePageLayout');
const {
  default: CustomProductDetailsPageLayout,
} = require('../components/layouts/PageLayouts/CustomProductDetailsPageLayout');
const {
  default: AllAccountsPageLayout,
} = require('../components/layouts/PageLayouts/AllAccountsPageLayout');
const {
  default: CustomMyStorePageLayout,
} = require('../components/layouts/PageLayouts/CustomMyStorePageLayout');
const {
  default: MyStorePageLayout,
} = require('../components/layouts/PageLayouts/MyStorePageLayout');
const {
  default: CustomCreateStorePageLayout,
} = require('../components/layouts/PageLayouts/CustomCreateStorePageLayout');
const {
  default: CreateStorePageLayout,
} = require('../components/layouts/PageLayouts/CreateStorePageLayout');
const {
  default: CustomEditStorePageLayout,
} = require('../components/layouts/PageLayouts/CustomEditStorePageLayout');
const {
  default: EditStorePageLayout,
} = require('../components/layouts/PageLayouts/EditStorePageLayout');
const {
  default: CustomEditProductPageLayout,
} = require('../components/layouts/PageLayouts/CustomEditProductPageLayout');
const {
  default: EditProductPageLayout,
} = require('../components/layouts/PageLayouts/EditProductPageLayout');
const {
  default: AddCustomListingPageLayout,
} = require('../components/layouts/PageLayouts/AddCUstomListingPageLayout');
const {
  default: AddEventPageLayout,
} = require('../components/layouts/PageLayouts/AddEventPageLayout');
const {
  default: AccountDetailsPageLayout,
} = require('../components/layouts/PageLayouts/AccountDetailsPageLayout');
const {
  default: CustomAccountDetailsPageLayout,
} = require('../components/layouts/PageLayouts/CustomAccountDetailsPageLayout');
const {
  default: EditProfilePageLayout,
} = require('../components/layouts/PageLayouts/EditProfilePageLayout');
const {
  default: SearchPageLayout,
} = require('../components/layouts/PageLayouts/SearchPageLayout');
const {
  default: CustomListingsPageLayout,
} = require('../components/layouts/PageLayouts/CustomListingPageLayout');
const {
  default: CategoryListingsPageLayout,
} = require('../components/layouts/PageLayouts/CategoryListingsPageLayout');
const { default: CategoriesPageLayout } = require('../components/layouts/PageLayouts/CategoriesPageLayout');

// Here In all condition first switch case for marketplace type and second switch case for marketplace module;

module.exports = {
  // Home Page
  home_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
      case 1:
        return (
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <HomePageLayout />
          </MainLayout>
        );
        break;
      case 2:
        return (
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <HomePageLayout />
          </MainLayout>
        );
      case 3:
        return (
          <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <CustomHomePageLayout />
          </CustomLayout>
        );

      default:
        return <Error_Page />;
    }
  },
  //Listing Categories Page:
  all_listing_categories_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
      case 1:
      case 2:
        return (
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <CategoriesPageLayout />
          </MainLayout>
        );
        break;

      case 3:
        return (
          <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <CategoriesPageLayout />
          </CustomLayout>
        );
        break;

      default:
        return <Error_Page />;
        break;
    }
  },

  // All Listing Page:
  all_listings_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
      case 1:
        return (
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <ListingsPageLayout />
          </MainLayout>
        );
        break;
      case 2:
        return (
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <ListingsPageLayout />
          </MainLayout>
        );
        break;
      case 3:
        return (
          <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <CustomListingsPageLayout />
          </CustomLayout>
        );
        break;

      default:
        return <Error_Page />;
        break;
    }
  },
  // Category Listing Page:
  category_listings_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
      case 1:
      case 2:
        return (
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <CategoryListingsPageLayout
              pageTitle={pageTitle}
              pageDescription={pageDescription}
            />
          </MainLayout>
        );
        break;

      case 3:
        return (
          <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <CategoryListingsPageLayout
              pageTitle={pageTitle}
              pageDescription={pageDescription}
            />
          </CustomLayout>
        );
        break;

      default:
        return <Error_Page />;
        break;
    }
  },

  // listing details page :

  listing_details_page: (pageTitle, pageDescription, marketplace_type) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
      case 1:
        return (
          <MainLayout>
            <ProductDetailsPageLayout
              pageTitle={pageTitle}
              pageDescription={pageDescription}
            />
          </MainLayout>
        );
        break;
      case 2:
        return (
          <div className=" ">
            <MainLayout>
              <EventDetailsPageLayout
                pageTitle={pageTitle}
                pageDescription={pageDescription}
              />
            </MainLayout>
          </div>
        );
        break;
      case 3:
        return (
          <CustomLayout>
            <CustomProductDetailsPageLayout
              pageTitle={pageTitle}
              pageDescription={pageDescription}
            />
          </CustomLayout>
        );
        break;

      default:
        return <Error_Page />;
        break;
    }
  },
  // All Accounts Page
  all_accounts_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
      case 1:
        return (
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <AllAccountsPageLayout />
          </MainLayout>
        );
        break;
      case 2:
        return (
          <CustomLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <AllAccountsPageLayout />
          </CustomLayout>
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
        return <Error_Page />;
        break;
    }
  },
  //   Account details Page
  accounts_details_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
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
        return <Error_Page />;
        break;
    }
  },
  // My store Page
  my_store_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
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
        return <Error_Page />;
        break;
    }
  },
  // Create store Page
  create_store_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
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
        return <Error_Page />;
        break;
    }
  },
  // Edit store Page
  edit_store_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
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
        return <Error_Page />;
        break;
    }
  },
  //Add listing Page
  add_listing_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
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
        return <Error_Page />;
        break;
    }
  },
  //Edit listing Page
  edit_listing_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
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
        return <Error_Page />;
        break;
    }
  },
  //Edit Profile Page
  edit_profile_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
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
        return <Error_Page />;
        break;
    }
  },
  //Search Page
  search_page: (pageTitle, pageDescription) => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_TYPE)) {
      case 1:
      case 2:
        return (
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            <SearchPageLayout />
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
        return <Error_Page />;
        break;
    }
  },
};
