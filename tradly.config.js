import { TYPE_CONSTANT } from './constant/Web_constant';

// Product
import ProductHomePageLayout from './themes/product/HomePageLayout';
import ProductMainLayout from './themes/product/MainLayout';
import ProductCategoriesPageLayout from './themes/product/CategoriesPageLayout';
import ListingsPageLayout from './themes/product/ListingsPageLayout';
import SimilarListingsPageLayout from './themes/product/SimilarListingsPageLayout';
import CategoryListingsPageLayout from './themes/product/CategoryListingsPageLayout';

// Event
import EventHomePageLayout from './themes/event/HomePageLayout';
import EventMainLayout from './themes/event/MainLayout';
import EventCategoriesPageLayout from './themes/event/CategoriesPageLayout';
import EventListingsPageLayout from './themes/event/EventListingsPageLayout';
import SimilarEventListingsPageLayout from './themes/event/SimilarEventListingsPageLayout';
import EventCategoryListingsPageLayout from './themes/event/EventCategoryListingsPageLayout';

// SAAS
import SaasHomePageLayout from './themes/product/CustomHomePageLayout';
import SaasMainLayout from './themes/saas/CustomLayout';
import SaasCategoriesPageLayout from './themes/saas/CategoriesPageLayout';
import CustomListingsPageLayout from './themes/saas/CustomListingPageLayout';
import SimilarCustomListingsPageLayout from './themes/saas/SimilarCustomListingsPageLayout';
import SaasCategoryListingsPageLayout from './themes/saas/CategoryListingsPageLayout';

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
          <ProductMainLayout
            pageTitle={TYPE_CONSTANT.META_LISTING_CATEGORY_TITLE}
            pageDescription={TYPE_CONSTANT.META_LISTING_CATEGORY_DESCRIPTION}
          >
            <CategoryListingsPageLayout
              pageTitle={pageTitle}
              pageDescription={pageDescription}
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
};
