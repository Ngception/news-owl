import { LocalStorageService } from './../../shared/local-storage.service';
import { Article } from './../../shared/article.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  article: Article = history.state.data;
  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
    const localData = this.localStorage.fetchData('article');
    if (localData) {
      this.article = JSON.parse(localData);
    } else {
      this.localStorage.addData('article', JSON.stringify(this.article));
    }
  }

  ngOnDestroy() {

  }
}
