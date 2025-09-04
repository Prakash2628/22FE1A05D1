export type ShortenResponse = {
  ok: boolean;
  result?: {
    code: string;
    full_short_link: string;
    original_link: string;
  };
  error?: string;
};