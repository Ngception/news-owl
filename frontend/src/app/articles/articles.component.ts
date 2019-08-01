import { ArticlesService } from './articles.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticlesService],
})
export class ArticlesComponent implements OnInit {
  headlineArticles: Object[];
  articles: Object[];
  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const searchType = Object.keys(params)[0];
      let data;
      if (searchType) {
        switch (searchType) {
          case 'category':
            this.articlesService
              .fetchArticlesByType(params[searchType])
              .subscribe(res => {
                data = res.articles;
                this.headlineArticles = data.slice(0, 3);
        this.articles = data.slice(3);
              });
            break;
          case 'sources':
            this.articlesService
              .fetchArticlesBySource(params[searchType])
              .subscribe(res => {
                data = res.articles;
                this.headlineArticles = data.slice(0, 3);
        this.articles = data.slice(3);
              });
          default:
            break;
        }
      } else {
        this.articlesService.fetchAllArticles().subscribe(res => {
          data = res.articles;
          this.headlineArticles = data.slice(0, 3);
          this.articles = data.slice(3);
        });
      }
    });
  }
}
