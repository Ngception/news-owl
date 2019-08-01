import { LocalStorageService } from './../../shared/local-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesService } from './../articles.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePageComponent } from './article-page.component';

describe('ArticlePageComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ ArticlePageComponent ],
      providers: [ ArticlesService, LocalStorageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create article page', () => {
    expect(component).toBeTruthy();
  });
});
