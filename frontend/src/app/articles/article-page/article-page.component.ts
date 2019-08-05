import { Component, OnInit } from '@angular/core';

import { ArticlesService } from './../articles.service';
import { LocalStorageService } from './../../shared/local-storage.service';
import { Article } from './../../shared/article.model';
import { ScrapedArticle } from './../../shared/scraped-article.model';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  article: Article = history.state.data;
  scrapedArticle: ScrapedArticle;
  url: string;
  constructor(
    private articles: ArticlesService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    const localData = JSON.parse(this.localStorage.fetchData('article'));
    if (!this.article && !this.scrapedArticle) {
      if (localData.type == 'scraped'){
        this.scrapedArticle = localData.data;
      } else {
        this.article = localData.data;
      }
      this.url = localData.data.url;
    } else {
      if (this.article.content) this.article.content = this.article.content.replace(
        /\[\+\d+\s\w{5}\]/,
        ''
      );
      this.url = this.article.url;
      try {
        this.articles
          .fetchArticleData(this.article.url, this.article.source.name)
          .subscribe(res => {
            if (res.data) {
              this.scrapedArticle = {
                ...res.data,
                meta: this.article.source.name,
                title: this.article.title,
                image: this.article.urlToImage,
                url: this.article.url
              };
              this.localStorage.addData(
                'article',
                JSON.stringify({
                  type: 'scraped',
                  data: this.scrapedArticle,
                })
              );
              return;
            }
          });
      } catch (error) {
        console.log(error);
      }
      this.localStorage.addData(
        'article',
        JSON.stringify({
          type: 'native',
          data: this.article,
        })
      );
    }
  }
}
