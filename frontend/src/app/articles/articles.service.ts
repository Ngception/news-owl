import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ScrapedArticle } from './../shared/scraped-article.model';

@Injectable()
export class ArticlesService {
  constructor(private http: HttpClient) {}

  fetchAllArticles() {
    return this.http.get<{articles: object[], status: string, totalresults: number}>('http://localhost:5000');
  }

  fetchArticlesByType(type: string) {
    return this.http.get<{articles: object[], status: string, totalresults: number}>(`http://localhost:5000/categories/${type}`);
  }

  fetchArticlesBySource(source: string) {
    return this.http.get<{articles: object[]}>(`http://localhost:5000/sources/${source}`);
  }

  fetchArticleData(url: string, name: string) {
    return this.http.post<{data: ScrapedArticle}>('http://localhost:5000/articles/scrape', { url, name });
  }
}
