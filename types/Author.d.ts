export default interface Author {
  name: string;
  profile_image_url: string;
  description: string;
  role: string;
  member_type: string;
  member_certified: boolean;
  me: boolean;
  is_muted: boolean;
  created_at: number;
  user_key: string;
}
