export interface MyUserInfo {
  user_id: number;
  profile_image_url: string;
  nickname: string;
  email: string | null | undefined;
  follower_count: number;
  following_count: number;
}

export interface UserInfo {
  user_id: number;
  profile_image_url: string;
  nickname: string;
  follower_count: number;
  following_count: number;
}

interface UserInfoPatch {
  email: string;
  profile_image_url: string;
  nickname: string;
}
