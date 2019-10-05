import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostComponent } from './components/post/post.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsComponent } from './components/logs/logs.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'logs', component: LogsComponent},
  {path: 'post/:id', component: PostComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
