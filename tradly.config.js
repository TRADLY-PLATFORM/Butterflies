import { TYPE_CONSTANT } from './constant/Web_constant';

// Product
import ProductHomePageLayout from './themes/product/HomePageLayout';
import ProductMainLayout from './themes/product/MainLayout';
import ProductCategoriesPageLayout from './themes/product/CategoriesPageLayout';
import ListingsPageLayout from './themes/product/ListingsPageLayout';
import SimilarListingsPageLayout from './themes/product/SimilarListingsPageLayout';
import CategoryListingsPageLayout from './themes/product/CategoryListingsPageLayout';
import ProductDetailsPageLayout from './themes/product/ProductDetailsPageLayout';
import ProductAllAccountsPageLayout from './themes/product/AllAccountsPageLayout';
import ProductAccountDetailsPageLayout from './themes/product/AccountDetailsPageLayout';
import ProductMyStorePageLayout from './themes/product/MyStorePageLayout';
import ProductCreateStorePageLayout from './themes/product/CreateStorePageLayout';
import ProductEditStorePageLayout from './themes/product/EditStorePageLayout';
import AddListingPageLayout from './themes/product/AddListingPageLayout';
import ProductEditProductPageLayout from './themes/product/EditProductPageLayout';
import ProductEditProfilePageLayout from './themes/product/EditProfilePageLayout';
import ProductSearchPageLayout from './themes/product/SearchPageLayout';
import ProductStoreOrdersPageLayout from './themes/product/StoreOrdersPageLayout';
import ProductStoreOrderDetailsPageLayout from './themes/product/StoreOrderDetailsPageLayout';
import ProductOrdersPageLayout from './themes/product/OrdersPageLayout';
import ProductOrderDetailsPageLayout from './themes/product/OrderDetailsPageLayout';
import ProductAddReviewPageLayout from './themes/product/AddReviewPageLayout';
import CheckoutPageLayout from './themes/product/CheckoutPageLayout';
import ProductInvitePageLayout from './themes/product/InvitePageLayout';
import ProductPayoutPageLayout from './themes/product/PayoutPageLayout';
import ProductWishListPageLayout from './themes/product/WishListPageLayout';

// Event
import EventHomePageLayout from './themes/event/HomePageLayout';
import EventMainLayout from './themes/event/MainLayout';
import EventCategoriesPageLayout from './themes/event/CategoriesPageLayout';
import EventListingsPageLayout from './themes/event/EventListingsPageLayout';
import SimilarEventListingsPageLayout from './themes/event/SimilarEventListingsPageLayout';
import EventCategoryListingsPageLayout from './themes/event/EventCategoryListingsPageLayout';
import EventDetailsPageLayout from './themes/event/EventDetailsPageLayout';
import EventAllAccountsPageLayout from './themes/event/AllAccountsPageLayout';
import EventAccountDetailsPageLayout from './themes/event/AccountDetailsPageLayout';
import EventMyStorePageLayout from './themes/event/MyStorePageLayout';
import EventCreateStorePageLayout from './themes/event/CreateStorePageLayout';
import EventEditStorePageLayout from './themes/product/EditStorePageLayout';
import AddEventPageLayout from './themes/event/AddEventPageLayout';
import EventEditProductPageLayout from './themes/event/EditProductPageLayout';
import EventEditProfilePageLayout from './themes/event/EditProfilePageLayout';
import EventSearchPageLayout from './themes/event/EventSearchPageLayout';
import EventStoreOrdersPageLayout from './themes/event/StoreOrdersPageLayout';
import EventStoreOrderDetailsPageLayout from './themes/event/StoreOrderDetailsPageLayout';
import EventOrdersPageLayout from './themes/event/OrdersPageLayout';
import EventOrderDetailsPageLayout from './themes/event/OrderDetailsPageLayout';
import EventAddReviewPageLayout from './themes/event/AddReviewPageLayout';
import EventCheckoutPageLayout from './themes/event/EventCheckoutPageLayout';
import EventInvitePageLayout from './themes/event/InvitePageLayout';
import EventPayoutPageLayout from './themes/event/PayoutPageLayout';
import EventWishListPageLayout from './themes/event/WishListPageLayout';

// SAAS
import SaasHomePageLayout from './themes/product/CustomHomePageLayout';
import SaasMainLayout from './themes/saas/CustomLayout';
import SaasCategoriesPageLayout from './themes/saas/CategoriesPageLayout';
import CustomListingsPageLayout from './themes/saas/CustomListingPageLayout';
import SimilarCustomListingsPageLayout from './themes/saas/SimilarCustomListingsPageLayout';
import SaasCategoryListingsPageLayout from './themes/saas/CategoryListingsPageLayout';
import CustomProductDetailsPageLayout from './themes/saas/CustomProductDetailsPageLayout';
import SaasAllAccountsPageLayout from './themes/saas/AllAccountsPageLayout';
import CustomAccountDetailsPageLayout from './themes/saas/CustomAccountDetailsPageLayout';
import CustomMyStorePageLayout from './themes/saas/CustomMyStorePageLayout';
import CustomCreateStorePageLayout from './themes/saas/CustomCreateStorePageLayout';
import CustomEditStorePageLayout from './themes/saas/CustomEditStorePageLayout';
import AddCustomListingPageLayout from './themes/saas/AddCUstomListingPageLayout';
import CustomEditProductPageLayout from './themes/saas/CustomEditProductPageLayout';
import SaasEditProfilePageLayout from './themes/saas/EditProfilePageLayout';
import SaasSearchPageLayout from './themes/saas/SearchPageLayout';
import SaasStoreOrdersPageLayout from './themes/saas/StoreOrdersPageLayout';
import SaasStoreOrderDetailsPageLayout from './themes/saas/StoreOrderDetailsPageLayout';
import SaasOrdersPageLayout from './themes/saas/OrdersPageLayout';
import SaasOrderDetailsPageLayout from './themes/saas/OrderDetailsPageLayout';
import SaasAddReviewPageLayout from './themes/saas/AddReviewPageLayout';

module.exports = {
  // home Page
  home_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductHomePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventHomePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasHomePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductHomePageLayout />
          </ProductMainLayout>
        );
    }
  },

  //Listing Categories Page:
  all_listing_categories_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductCategoriesPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventCategoriesPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasCategoriesPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductCategoriesPageLayout />
          </ProductMainLayout>
        );
    }
  },
  //all_listings_page Page:
  all_listings_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <ListingsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <EventListingsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <CustomListingsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <ProductCategoriesPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Similar All Listing Page:
  similar_all_listings_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <SimilarListingsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <SimilarEventListingsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <SimilarCustomListingsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <SimilarListingsPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Category Listings Page:
  category_listings_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout>
            <CategoryListingsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_CATEGORY_TITLE}
              pageDescription={TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION}
            />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout>
            <EventCategoryListingsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_CATEGORY_TITLE}
              pageDescription={TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION}
            />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout>
            <SaasCategoryListingsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_CATEGORY_TITLE}
              pageDescription={TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION}
            />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout>
            <CategoryListingsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_CATEGORY_TITLE}
              pageDescription={TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION}
            />
          </ProductMainLayout>
        );
    }
  },

  // listing_details_page:
  listing_details_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout>
            <ProductDetailsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
              pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
            />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout>
            <EventDetailsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
              pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
            />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout>
            <CustomProductDetailsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
              pageDescription={pageDescription}
            />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout>
            <ProductMainLayout>
              <ProductDetailsPageLayout
                pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
                pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
              />
            </ProductMainLayout>
          </ProductMainLayout>
        );
    }
  },

  // all_accounts_page:
  all_accounts_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductAllAccountsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <EventAllAccountsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <SaasAllAccountsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductAllAccountsPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // accounts_details_page:
  accounts_details_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductAccountDetailsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <EventAccountDetailsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <CustomAccountDetailsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductAccountDetailsPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // accounts_details_page:
  checkout_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <CheckoutPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <EventCheckoutPageLayout />
          </EventMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <CheckoutPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // my_store_page
  my_store_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductMyStorePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventMyStorePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <CustomMyStorePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductMyStorePageLayout />
          </ProductMainLayout>
        );
    }
  },

  // create_store_page
  create_store_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductCreateStorePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventCreateStorePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <CustomCreateStorePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductCreateStorePageLayout />
          </ProductMainLayout>
        );
    }
  },

  // edit_store_page
  edit_store_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductEditStorePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventEditStorePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <CustomEditStorePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductEditStorePageLayout />
          </ProductMainLayout>
        );
    }
  },

  // add_listing_page
  add_listing_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <AddListingPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <AddEventPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <AddCustomListingPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <AddListingPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // edit_listing_page
  edit_listing_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductEditProductPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventEditProductPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <CustomEditProductPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductEditProductPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // edit_profile_page
  edit_profile_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductEditProfilePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventEditProfilePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasEditProfilePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductEditProfilePageLayout />
          </ProductMainLayout>
        );
    }
  },
  // search_page
  search_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductSearchPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventSearchPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasSearchPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductSearchPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // account orders
  account_orders: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductStoreOrdersPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventStoreOrdersPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasStoreOrdersPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductStoreOrdersPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // account order details
  account_order_details: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductStoreOrderDetailsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventStoreOrderDetailsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasStoreOrderDetailsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductStoreOrderDetailsPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // orders
  orders: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductOrdersPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventOrdersPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasOrdersPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductOrdersPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // order details
  order_details: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductOrderDetailsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventOrderDetailsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasOrderDetailsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductOrderDetailsPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Add review
  add_review: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductAddReviewPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventAddReviewPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <SaasAddReviewPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductAddReviewPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Invite page
  Invite_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_ACCOUNT_TITLE}
            pageDescription={TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS}
          >
            <ProductInvitePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventInvitePageLayout />
          </EventMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductInvitePageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Payout  page
  payout_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout>
            <ProductPayoutPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout>
            <EventPayoutPageLayout />
          </EventMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventPayoutPageLayout />
          </ProductMainLayout>
        );
    }
  },
  // Wishlist  page
  wishlist_page: () => {
    switch (Number(TYPE_CONSTANT.MARKETPLACE_MODULES)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductWishListPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <EventWishListPageLayout />
          </EventMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_TITLE}
            pageDescription={TYPE_CONSTANT.META_DESCRIPTIONS}
          >
            <ProductWishListPageLayout />
          </ProductMainLayout>
        );
    }
  },
};
