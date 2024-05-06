interface Manufacturer {
  drink_manufacturer_id: number;
  manufacturer_name: string;
  location: string;
}

interface Tag {
  tag_id: number;
  tag: string;
}

interface FoodStatistic {
  food_id: number;
  category: string;
  image_url: string;
  count: number;
}

interface TasteStatistic {
  [key: string]: number;
  // sweet_rating: number;
  // sour_rating: number;
  // bitter_rating: number;
  // body_rating: number;
  // refresh_rating: number;
}

interface SituationStatistic {
  [key: string]: number;
}

interface FlavorStatistic {
  flavor_id: number;
  flavor: string;
  count: number;
}

interface SituationStatistics {
  adult_sum: number;
  partner_sum: number;
  friend_sum: number;
  business_sum: number;
  alone_sum: number;
}

interface Package {
  type: string;
  volume: string;
}

interface Drink {
  drink_id: number;
  drink_like: boolean;
  name: string;
  image_url: string;
  summary: string;
  manufacturer: Manufacturer;
  review_rating: number;
  tags: Tag[];
  review_count: number;
  food_statistics: FoodStatistic[];
  taste_statistic: TasteStatistic;
  situation_statistic: SituationStatistic;
  flavor_statistics: FlavorStatistic[];
  title: string;
  description: string;
  packages: Package[];
  abv: number;
  type: {
    type: string;
    detail_type: string;
  };
}

interface DetailSummarySimpleDrink {
  name: string;
  drink_like: boolean;
  summary: string;
  drink_id: number;
  image_url: string;
  manufacturer: Manufacturer;
  review_rating: number;
  food_statistics: FoodStatistic[];
  situation_statistic: SituationStatistic;
}

interface DetailSimpleDrink {
  sortedDetailDrink: FlavorStatistic[];
  food_statistics: FoodStatistic[];
  taste_statistic: TasteStatistic;
  flavor_statistics: FlavorStatistic[];
}

interface DetailDescriptionDrink {
  title: string;
  description: string;
  packages: Package[];
  abv: number;
  manufacturer: Manufacturer;
  type: {
    type: string;
    detail_type: string;
  };
}

interface DetailRecommendDrink {
  drink_id: number;
  image_url: string;
  manufacturer_name: string;
  drink_like: boolean;
  drink_name: string;
  review_rating: number;
}

interface DetailRecommendDrinkList {
  drinks: DetailRecommendDrink[];
  page_info: {
    page: number;
    size: number;
    total_element: number;
    sort: string;
  };
}

interface DrinkListElement {
  drink_id: number;
  drink_like: boolean;
  image_url: string;
  manufacturer_name: string;
  drink_name: string;
  review_rating: number;
}

interface PageInfo {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  sort: string;
}

interface DrinksResponse {
  search_drinks: {
    drinks: DrinkListElement[];
    page_info: PageInfo;
  };
}

interface DrinkOfBanner {
  drink_id: number;
  name: string;
  image_url: string;
  review_rating: number;
  manufacturer: Manufacturer;
  description: string;
  food_statistics: FoodStatistic[];
  situation_statistics: SituationStatistics;
  abv: number;
}

interface DrinkBannerResponseDto {
  drinks: DrinkOfBanner[];
  page_info: PageInfo;
}
