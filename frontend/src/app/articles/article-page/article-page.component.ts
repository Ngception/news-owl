import { ArticlesService } from './../articles.service';
import { LocalStorageService } from './../../shared/local-storage.service';
import { Article } from './../../shared/article.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  article: Article = history.state.data;
  articleContent;
  constructor(private articles: ArticlesService, private localStorage: LocalStorageService) { }

  ngOnInit() {
    const localData = JSON.parse(this.localStorage.fetchData('article'));
    const dataFromParent = history.state.data;
    if (!dataFromParent || dataFromParent.title == localData.title) {
      this.article = localData;
      this.articleContent = localData.content;
    } else {
      this.articles.fetchArticleData(dataFromParent.url)
        .subscribe(res => {
          this.articleContent = res.content;
          this.localStorage.addData('article', JSON.stringify({
            ...dataFromParent,
            content: this.articleContent
          }));
        })
    }
  }
}
