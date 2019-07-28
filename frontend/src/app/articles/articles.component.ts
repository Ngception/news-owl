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
  typeParam: String;
  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.typeParam = params.type || history.state.type;
      if (this.typeParam) {
        this.articlesService.fetchArticleType(this.typeParam).subscribe(res => {
          this.headlineArticles = res.articles.slice(0, 3);
          this.articles = res.articles.slice(3);
        });
      } else {
        this.articlesService.fetchAllArticles().subscribe(res => {
          this.headlineArticles = res.articles.slice(0, 3);
          this.articles = res.articles.slice(3);
        });
      }
    });
  }
}
