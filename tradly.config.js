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
import CollectionListingsPageLayout from './themes/product/CollectionListingsPageLayout';

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
import EventCollectionListingsPageLayout from './themes/event/CollectionListingsPageLayout';

// SAAS
import SaasHomePageLayout from './themes/saas/CustomHomePageLayout';
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
import SaasCollectionListingsPageLayout from './themes/saas/CollectionListingsPageLayout';
import { seo_text } from './constant/static_text';

module.exports = {
  // home Page
  home_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
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
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.listing_categories_page_title}
            pageDescription={seo_text.listing_categories_page_description}
          >
            <ProductCategoriesPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.listing_categories_page_title}
            pageDescription={seo_text.listing_categories_page_description}
          >
            <EventCategoriesPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.listing_categories_page_title}
            pageDescription={seo_text.listing_categories_page_description}
          >
            <SaasCategoriesPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.listing_categories_page_title}
            pageDescription={seo_text.listing_categories_page_description}
          >
            <ProductCategoriesPageLayout />
          </ProductMainLayout>
        );
    }
  },

  //all_listings_page Page:
  all_listings_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
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
    switch (Number(TYPE_CONSTANT.THEME)) {
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

  // Collection Listings Page:
  collection_listings_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <CollectionListingsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <EventCollectionListingsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <SaasCollectionListingsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
          >
            <CollectionListingsPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Category Listings Page:
  category_listings_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
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
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout>
            <ProductDetailsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout>
            <EventDetailsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout>
            <CustomProductDetailsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
              pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
            />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout>
            <ProductDetailsPageLayout
              pageTitle={TYPE_CONSTANT.META_LISTING_TITLE}
              pageDescription={TYPE_CONSTANT.META_LISTING_DESCRIPTION}
            />
          </ProductMainLayout>
        );
    }
  },

  // all_accounts_page:
  all_accounts_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
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
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout>
            <ProductAccountDetailsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout>
            <EventAccountDetailsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout>
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

  // checkout_page:
  checkout_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.checkout_page_title}
            pageDescription={seo_text.checkout_page_description}
          >
            <CheckoutPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.checkout_page_title}
            pageDescription={seo_text.checkout_page_description}
          >
            <EventCheckoutPageLayout />
          </EventMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.checkout_page_title}
            pageDescription={seo_text.checkout_page_description}
          >
            <CheckoutPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // my_store_page
  my_store_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.my_account_page_title}
            pageDescription={seo_text.my_account_page_description}
          >
            <ProductMyStorePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.my_account_page_title}
            pageDescription={seo_text.my_account_page_description}
          >
            <EventMyStorePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.my_account_page_title}
            pageDescription={seo_text.my_account_page_description}
          >
            <CustomMyStorePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.my_account_page_title}
            pageDescription={seo_text.my_account_page_description}
          >
            <ProductMyStorePageLayout />
          </ProductMainLayout>
        );
    }
  },

  // create_store_page
  create_store_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.add_account_page_title}
            pageDescription={seo_text.add_account_page_description}
          >
            <ProductCreateStorePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.add_account_page_title}
            pageDescription={seo_text.add_account_page_description}
          >
            <EventCreateStorePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.add_account_page_title}
            pageDescription={seo_text.add_account_page_description}
          >
            <CustomCreateStorePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.add_account_page_title}
            pageDescription={seo_text.add_account_page_description}
          >
            <ProductCreateStorePageLayout />
          </ProductMainLayout>
        );
    }
  },

  // edit_store_page
  edit_store_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.edit_account_page_title}
            pageDescription={seo_text.edit_account_page_description}
          >
            <ProductEditStorePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.edit_account_page_title}
            pageDescription={seo_text.edit_account_page_description}
          >
            <EventEditStorePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.edit_account_page_title}
            pageDescription={seo_text.edit_account_page_description}
          >
            <CustomEditStorePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.edit_account_page_title}
            pageDescription={seo_text.edit_account_page_description}
          >
            <ProductEditStorePageLayout />
          </ProductMainLayout>
        );
    }
  },

  // add_listing_page
  add_listing_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.add_account_page_title}
            pageDescription={seo_text.add_account_page_description}
          >
            <AddListingPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.add_account_page_title}
            pageDescription={seo_text.add_account_page_description}
          >
            <AddEventPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.add_account_page_title}
            pageDescription={seo_text.add_account_page_description}
          >
            <AddCustomListingPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.add_account_page_title}
            pageDescription={seo_text.add_account_page_description}
          >
            <AddListingPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // edit_listing_page
  edit_listing_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.edit_listing_page_title}
            pageDescription={seo_text.edit_listing_page_description}
          >
            <ProductEditProductPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.edit_listing_page_title}
            pageDescription={seo_text.edit_listing_page_description}
          >
            <EventEditProductPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.edit_listing_page_title}
            pageDescription={seo_text.edit_listing_page_description}
          >
            <CustomEditProductPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.edit_listing_page_title}
            pageDescription={seo_text.edit_listing_page_description}
          >
            <ProductEditProductPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // edit_profile_page
  edit_profile_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.edit_profile_page_title}
            pageDescription={seo_text.edit_profile_page_description}
          >
            <ProductEditProfilePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.edit_profile_page_title}
            pageDescription={seo_text.edit_profile_page_description}
          >
            <EventEditProfilePageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.edit_profile_page_title}
            pageDescription={seo_text.edit_profile_page_description}
          >
            <SaasEditProfilePageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.edit_profile_page_title}
            pageDescription={seo_text.edit_profile_page_description}
          >
            <ProductEditProfilePageLayout />
          </ProductMainLayout>
        );
    }
  },
  // search_page
  search_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.search_page_title}
            pageDescription={seo_text.search_page_description}
          >
            <ProductSearchPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.search_page_title}
            pageDescription={seo_text.search_page_description}
          >
            <EventSearchPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.search_page_title}
            pageDescription={seo_text.search_page_description}
          >
            <SaasSearchPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.search_page_title}
            pageDescription={seo_text.search_page_description}
          >
            <ProductSearchPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // account orders
  account_orders: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.account_orders_page_title}
            pageDescription={seo_text.account_orders_page_description}
          >
            <ProductStoreOrdersPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.account_orders_page_title}
            pageDescription={seo_text.account_orders_page_description}
          >
            <EventStoreOrdersPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.account_orders_page_title}
            pageDescription={seo_text.account_orders_page_description}
          >
            <SaasStoreOrdersPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.account_orders_page_title}
            pageDescription={seo_text.account_orders_page_description}
          >
            <ProductStoreOrdersPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // account order details
  account_order_details: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.account_order_details_page_title}
            pageDescription={seo_text.account_order_details_page_description}
          >
            <ProductStoreOrderDetailsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.account_order_details_page_title}
            pageDescription={seo_text.account_order_details_page_description}
          >
            <EventStoreOrderDetailsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.account_order_details_page_title}
            pageDescription={seo_text.account_order_details_page_description}
          >
            <SaasStoreOrderDetailsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.account_order_details_page_title}
            pageDescription={seo_text.account_order_details_page_description}
          >
            <ProductStoreOrderDetailsPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // orders
  orders: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.orders_page_title}
            pageDescription={seo_text.orders_page_description}
          >
            <ProductOrdersPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.orders_page_title}
            pageDescription={seo_text.orders_page_description}
          >
            <EventOrdersPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.orders_page_title}
            pageDescription={seo_text.orders_page_description}
          >
            <SaasOrdersPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.orders_page_title}
            pageDescription={seo_text.orders_page_description}
          >
            <ProductOrdersPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // order details
  order_details: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.order_details_page_title}
            pageDescription={seo_text.order_details_page_description}
          >
            <ProductOrderDetailsPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.order_details_page_title}
            pageDescription={seo_text.order_details_page_description}
          >
            <EventOrderDetailsPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.order_details_page_title}
            pageDescription={seo_text.order_details_page_description}
          >
            <SaasOrderDetailsPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.order_details_page_title}
            pageDescription={seo_text.order_details_page_description}
          >
            <ProductOrderDetailsPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Add review
  add_review: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.add_review_page_title}
            pageDescription={seo_text.add_review_page_description}
          >
            <ProductAddReviewPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.add_review_page_title}
            pageDescription={seo_text.add_review_page_description}
          >
            <EventAddReviewPageLayout />
          </EventMainLayout>
        );
        break;
      case 3:
        return (
          <SaasMainLayout
            pageTitle={seo_text.add_review_page_title}
            pageDescription={seo_text.add_review_page_description}
          >
            <SaasAddReviewPageLayout />
          </SaasMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.add_review_page_title}
            pageDescription={seo_text.add_review_page_description}
          >
            <ProductAddReviewPageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Invite page
  Invite_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.invite_page_title}
            pageDescription={seo_text.invite_page_description}
          >
            <ProductInvitePageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.invite_page_title}
            pageDescription={seo_text.invite_page_description}
          >
            <EventInvitePageLayout />
          </EventMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.invite_page_title}
            pageDescription={seo_text.invite_page_description}
          >
            <ProductInvitePageLayout />
          </ProductMainLayout>
        );
    }
  },

  // Payout  page
  payout_page: () => {
    switch (Number(TYPE_CONSTANT.THEME)) {
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
    switch (Number(TYPE_CONSTANT.THEME)) {
      case 1:
        return (
          <ProductMainLayout
            pageTitle={seo_text.wishlist_page_title}
            pageDescription={seo_text.wishlist_page_description}
          >
            <ProductWishListPageLayout />
          </ProductMainLayout>
        );
        break;
      case 2:
        return (
          <EventMainLayout
            pageTitle={seo_text.wishlist_page_title}
            pageDescription={seo_text.wishlist_page_description}
          >
            <EventWishListPageLayout />
          </EventMainLayout>
        );
        break;

      default:
        return (
          <ProductMainLayout
            pageTitle={seo_text.wishlist_page_title}
            pageDescription={seo_text.wishlist_page_description}
          >
            <ProductWishListPageLayout />
          </ProductMainLayout>
        );
    }
  },
};
