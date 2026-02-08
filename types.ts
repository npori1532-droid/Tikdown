export interface TikTokAuthor {
  id: string;
  unique_id: string;
  nickname: string;
  avatar: string;
}

export interface TikTokData {
  id: string;
  title: string;
  cover: string;
  duration: number;
  play: string; // No watermark video
  wmplay: string; // Watermarked video
  music: string; // MP3 url
  play_count: number;
  digg_count: number;
  comment_count: number;
  share_count: number;
  author: TikTokAuthor;
}

export interface APIResponse {
  code: number;
  msg: string;
  processed_time?: number;
  data?: TikTokData;
}