import { Observable } from 'rxjs';
import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  post: Post;
  posts: Post[];
  selectedPost: Post = {
    id: null,
    title: '',
    body: ''
  };
  isEdit: boolean = false;


  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  editPost(post: Post) {
    this.selectedPost = post;
    this.isEdit = true;
  }

  onNewPost(post: Post) {
    this.posts.unshift(post);
    this.isEdit = false;
  }

  onUpdatePost(post: Post) {
    this.posts.forEach((cur, index) => {
      if(cur.id === post.id) {
        this.posts.splice(index, 1);
        this.posts.unshift(post)
      } else {
        console.log('This post cannot be updated, please try again later');
      }
    });
  }

  deletePost(post: Post) {
    if(confirm('Are you sure?')) {
      this.postService.deletePost(post.id).subscribe(res => {
        this.posts.forEach((cur, index) => {
          if(cur.id === post.id) {
            this.posts.splice(index, 1);
          } else {
            console.log('This post cannot be updated, please try again later');
          }
        })
      })
    }
  }

}
