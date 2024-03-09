export interface Review {
  id: number;
  image_url: string;
  review_rating: number;
  writer: {
    id: number;
    nickname: string;
  };
  created_date: string; // 현재는 문자열로 가정
}

export interface PageInfo {
  page: number;
  size: number;
  total_elements: number;
  sort: string;
}

export interface ReviewList {
  reviews: Review[];
  page_info: PageInfo;
}

export interface WriterDTO {
  id: number;
  nickname: string;
}

export interface Situation {
  adult: boolean;
  alone: boolean;
  business: boolean;
  friend: boolean;
  partner: boolean;
  // [key: 'adult' | 'alone' | 'business' | 'friend' | 'partner']: boolean;
}

export interface Taste {
  sweet: number;
  sour: number;
  bitter: number;
  body: number;
  refresh: number;
}

export interface DrinkDetailReview {
  content: string;
  image_url: string;
  rating: number;
  created_date: string;
  writer_dto: WriterDTO;
  situation: Situation;
  taste: Taste;
  flavors: string[];
  foods: string[];
}
