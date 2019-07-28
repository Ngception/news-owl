export interface Article {
  author: String;
  content: String;
  description: String;
  publishedAt: String;
  source: {
    id: String | Number;
    name: String;
  };
  title: String;
  url: String;
  urlToImage: String;
}
