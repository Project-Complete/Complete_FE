export interface MyUserInfo {
  user_id: number;
  profile_image_url: string;
  nickname: string;
  email: string | null | undefined;
  followers: number;
  followings: number;
}

export interface UserInfo {
  user_id: number;
  profile_image_url: string;
  nickname: string;
  followers: number;
  followings: number;
}
