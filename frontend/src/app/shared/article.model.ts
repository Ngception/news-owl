export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string | number;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}
