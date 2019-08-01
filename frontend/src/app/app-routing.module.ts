import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SourcesComponent } from './header/sources/sources.component';
import { ArticlePageComponent } from './articles/article-page/article-page.component';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  { path: '', component: ArticlesComponent, pathMatch: 'full'},
  { path: 'articles/:name', component: ArticlePageComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'sources', component: SourcesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
