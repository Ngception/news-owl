import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ArticlesService {
  constructor(private http: HttpClient) {}

  fetchAllArticles() {
    return this.http.get<{articles: Object[], status: String, totalresults: Number}>('http://localhost:5000');
  }

  fetchArticlesByType(type: String) {
    return this.http.get<{articles: Object[], status: String, totalresults: Number}>(`http://localhost:5000/categories/${type}`);
  }

  fetchArticlesBySource(source: String) {
    return this.http.get<{articles: Object[]}>(`http://localhost:5000/sources/${source}`);
  }

  fetchArticleData(url: String) {
    return this.http.post<{title: String, content: String[]}>('http://localhost:5000/articles/scrape', { url });
  }
}
