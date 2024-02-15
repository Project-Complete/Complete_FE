export interface Manufacturer {
  drink_manufacturer_id: number;
  manufacturer_name: string;
  location: string;
}

export interface Tag {
  tag_id: number;
  tag: string;
}

export interface FoodStatistic {
  food_id: number;
  category: string;
  image_url: string;
  count: number;
}

export interface TasteStatistic {
  sweet_rating: number;
  sour_rating: number;
  bitter_rating: number;
  body_rating: number;
  refresh_rating: number;
}

export interface SituationStatistic {
  adult_sum: number;
  partner_sum: number;
  friend_sum: number;
  business_sum: number;
  alone_sum: number;
}

export interface FlavorStatistic {
  flavor_id: number;
  flavor: string;
  count: number;
}

export interface Package {
  type: string;
  volume: string;
}

export interface Drink {
  drink_id: number;
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
