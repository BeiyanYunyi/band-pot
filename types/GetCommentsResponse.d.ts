import Author from './Author';
import Photo from './Photo';

export default interface GetCommentsResponse {
  result_code: number;
  result_data: {
    paging: { previous_params: Record<string, unknown>; next_params: Record<string, unknown> };
    items: {
      band_key: string;
      post_key: string;
      comment_key: string;
      content: string;
      emotion_count: number;
      is_audio_included: boolean;
      created_at: string;
      author: Author;
      photo: Photo;
    }[];
  };
}
