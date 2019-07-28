import { ArticlesService } from './articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticlesService]
})
export class ArticlesComponent implements OnInit {
  headlineArticles: Object[];
  articles: Object[];
  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.fetchAllArticles()
      .subscribe(res => {
        this.headlineArticles = res.articles.slice(0,3);
        this.articles = res.articles.slice(3);
      })
  }

}
