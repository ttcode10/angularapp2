import { PostService } from './../../services/post.service';
import { FormsModule } from '@angular/forms';
import { Post } from './../../models/post';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})

export class PostFormComponent implements OnInit {
  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  @Input() selectedPost: Post;
  @Input() isEdit: boolean;
  @ViewChild('postForm', {static: false}) form: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.postService.savePost(this.form.value).subscribe(post => {
      this.newPost.emit(post);
      this.clearForm();
    });
  }

  clearForm() {
    this.form.reset();
    this.isEdit = false;
  }

  editPost() {
    this.postService.updatePost(this.form.value).subscribe(post => {
      this.updatedPost.emit(post);
      this.clearForm();
    })
  }

}
