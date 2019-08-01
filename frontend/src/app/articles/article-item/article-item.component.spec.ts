import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleItemComponent } from './article-item.component';

describe('ArticleItemComponent', () => {
  let component: ArticleItemComponent;
  let fixture: ComponentFixture<ArticleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleItemComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleItemComponent);
    component = fixture.componentInstance;
    const article = {
      author: 'John Smith',
      content: 'Test content',
      description: 'Test description',
      publishedAt: 'Test date',
      source: {
        id: 1,
        name: 'Test source name'
      },
      title: 'Test title',
      url: 'http://localhost:5000',
      urlToImage: 'http://image.png'
    };
    component.article = article;
    fixture.detectChanges();
  });

  it('should create single article item', () => {
    expect(component).toBeTruthy();
  });
});
