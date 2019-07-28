import { ArticlePageComponent } from './articles/article-page/article-page.component';
import { ArticlesComponent } from './articles/articles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ArticlesComponent, pathMatch: 'full'},
  { path: 'articles/:name', component: ArticlePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
