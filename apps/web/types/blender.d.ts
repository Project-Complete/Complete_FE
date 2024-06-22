interface Blender {
  combination_board_id: number;
  combination_image_url: string;
  title: string;
  nickname: string;
  profile_image_url: string;
  created_date: string; // ISO 8601 형식의 문자열
  description: string;
  combination_like: boolean;
  combination_like_count: number;
  combination_bookmark: boolean;
  combination_bookmark_count: number;
  content: string;
  combinations: {
    drink_id: number;
    image_url: string;
    manufacturer_name: string;
    drink_like: boolean;
    name: string;
    volume: string;
    xcoordinate: number;
    ycoordinate: number;
  }[];
  etc_combinations: BlenderEtcCombinations[];
}

interface BlenderEtcCombinations {
  name: string;
  volume: string;
  ycoordinate: number;
  xcoordinate: number;
}

interface BlenderListElement {
  combination_board_id: number;
  image_url: string;
  title: string;
  nickname: string;
  combination_like: boolean;
  combination_bookmark: boolean;
}

interface PageInfo {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  sort: string;
}

interface BlenderList {
  combinations: BlenderListElement[];
  page_info: PageInfo;
}

interface BlenderComment {
  combination_comment_id: number;
  user_id: number;
  nickname: string;
  content: string;
  reply_count: number;
  created_date: string;
}

interface PageInfo {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  sort: string;
}

interface BlenderCommentResponse {
  combination_comments: CombinationComment[];
  page_info: PageInfo;
}
