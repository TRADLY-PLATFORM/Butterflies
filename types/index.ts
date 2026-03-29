// Shared TypeScript interfaces for the Butterflies marketplace

export interface AuthKey {
  auth_key: string;
  refresh_key: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic: string | null;
  key?: AuthKey;
}

export interface Category {
  id: number;
  name: string;
  parent?: number;
  image?: string;
  slug?: string;
  description?: string;
}

export interface ListingImage {
  path?: string;
  url?: string;
}

export interface ListingLocation {
  city?: string;
  country?: string;
  formatted_address?: string;
  latitude?: number;
  longitude?: number;
}

export interface Listing {
  id: number;
  title: string;
  description?: string;
  list_price: number;
  offer_price?: number;
  currency?: string;
  images: string[];
  category_id?: number[];
  account_id?: number;
  account?: Account;
  location?: ListingLocation;
  status?: number;
  type?: number;
  sub_type?: number;
  slug?: string;
  stock?: number;
  rating_average?: number;
  rating_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Account {
  id: number;
  name: string;
  description?: string;
  images: string[];
  total_listings?: number;
  total_followers?: number;
  following?: boolean;
  rating_average?: number;
  rating_count?: number;
  user?: {
    first_name?: string;
    last_name?: string;
    profile_pic?: string | null;
  };
  location?: ListingLocation;
  categories?: Category[];
}

export interface Banner {
  id: number;
  title?: string;
  description?: string;
  image: string;
  link?: string;
  placement?: string;
}

export interface Collection {
  id?: number;
  title?: string;
  description?: string;
  scope_type: number;
  listings?: Listing[];
  accounts?: Account[];
  type?: number;
}

export interface HomeData {
  collections: Collection[];
  categories: Category[];
  banners?: Banner[];
}

export interface Order {
  id: number;
  status?: number;
  order_status?: string;
  listing?: Listing;
  account?: Account;
  total?: number;
  currency?: string;
  created_at?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total_records: number;
}

// API response wrappers
export interface ListingsResponse {
  listings: Listing[];
  page: number;
  total_records: number;
}

export interface AccountsResponse {
  accounts: Account[];
  page: number;
  total_records: number;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface GeneralConfig {
  app_name?: string;
  web_font_title?: string;
  theme?: number;
  type?: number;
  sub_type?: number;
  auth_type?: number;
  registration_title?: string;
  web_logo?: string;
  web_icon?: string;
  terms_url?: string;
  privacy_policy_url?: string;
  support_url?: string;
  home_categories_enabled?: boolean;
  logo_height?: number;
  logo_width?: number;
  hide_tradly_footer_note?: boolean;
}

export interface ListingConfig {
  listing_pictures_count?: number;
  enable_slug?: boolean;
  meta_title?: boolean;
  meta_description?: boolean;
  meta_keyword?: boolean;
  listing_address_enabled?: boolean;
  show_shipping_charges?: boolean;
  hide_offer_percent?: boolean;
  enable_stock?: boolean;
}

// Redux state types
export interface AuthState {
  login: boolean;
  auth_key: string;
  refresh_key: string;
  user_email: string;
  first_name: string;
  last_name: string;
  profile_pic: string | null;
  user_details: User | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface HomeState {
  collections: Collection[] | null;
  categories: Category[] | null;
  promo_banners: Banner[] | null;
  page_promo_banners: Banner[] | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

// Next.js page props for SSR pages
export interface HomePageProps {
  initialHomeData?: HomeData | null;
  initialBanners?: Banner[] | null;
}

export interface ListingDetailProps {
  initialListing?: Listing | null;
  initialSimilar?: Listing[] | null;
}

export interface CategoryListingsProps {
  initialListings?: Listing[] | null;
  initialCategories?: Category[] | null;
  initialTotalRecords?: number;
}

export interface AccountDetailProps {
  initialAccount?: Account | null;
  initialListings?: Listing[] | null;
}

export interface SearchPageProps {
  initialListings?: Listing[] | null;
  initialTotalRecords?: number;
  searchKey?: string;
}
