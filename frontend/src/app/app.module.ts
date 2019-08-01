import { ArticlesService } from './articles/articles.service';
import { LocalStorageService } from './shared/local-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticlePageComponent } from './articles/article-page/article-page.component';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './header/category/category.component';
import { SourcesComponent } from './header/sources/sources.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    ArticleItemComponent,
    ArticlePageComponent,
    CategoryComponent,
    SourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [ArticlesService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
