import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/shared/article.model';


@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() article: Article;
  id: String;

  constructor() { }

  ngOnInit() {
    this.id = this.article.title.split(' ').join('_');
    this.formatTitle();
  }

  formatTitle() {
    let source = this.article.source.name;
    const regex = new RegExp(` - ${source}`, 'i');
    this.article.title = this.article.title.replace(regex, '');
  }
}
