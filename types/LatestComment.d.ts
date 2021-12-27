import Author from './Author';

export default interface LatestComment {
  body: string;
  created_at: number;
  author: Author;
}
