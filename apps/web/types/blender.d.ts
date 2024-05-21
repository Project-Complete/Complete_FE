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
}
