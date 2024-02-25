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
