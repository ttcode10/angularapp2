import { Observable, of } from 'rxjs';
import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class PostService {
  post: Post;
  posts: Post[];

  postUrl: string = 'https://jsonplaceholder.typicode.com/posts'

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postUrl, post, httpOptions)
  }

  addPost(post: Post) {
    this.posts.unshift(post);
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.postUrl}/${post.id}`;
    return this.http.put<Post>(url, post, httpOptions);
  }

  deletePost(id: number): Observable<Post> {
    const url = `${this.postUrl}/${id}`;
    return this.http.delete<Post>(url, httpOptions);
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postUrl}/${id}`;
    return this.http.get<Post>(url);
  }

}
