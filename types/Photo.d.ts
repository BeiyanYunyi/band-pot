import Author from './Author';

export default interface Photo {
  height: number;
  width: number;
  created_at: number;
  is_video_thumbnail: boolean;
  comment_count: number;
  url: string;
  emotion_count: number;
  photo_key: string;
  author: Author;
  photo_album_key: string | null;
}
