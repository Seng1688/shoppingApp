import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../shared/post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})

export class ApiComponent implements OnInit, OnDestroy{
  loadedPosts: Post[] = [];
  isFetching = false;
  error: any = null;
  private errorSub! : Subscription;

  constructor(private postService: PostService) { }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  ngOnInit() {

    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.isFetching = false;
      this.error = errorMessage;
    });

    this.isFetching = true;

    this.postService.fetchPost()
    .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error = error.message;
      });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);

  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPost()
    .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.error = error.message;
      });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError(){
    this.error = null;
  }


}


