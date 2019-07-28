import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ArticlesService {
  constructor(private http: HttpClient) {}

  fetchAllArticles() {
    return this.http.get<{articles: Object[], status: String, totalresults: Number}>('http://localhost:5000');
  }
}
