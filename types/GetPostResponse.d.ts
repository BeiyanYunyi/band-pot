import Author from './Author';
import Photo from './Photo';

export default interface GetPostResponse {
  content: string;
  author: Author;
  post_key: string;
  comment_count: number;
  created_at: string;
  photo: Photo;
  emotion_count: number;
  band_key: string;
  post_read_count: string;
}
