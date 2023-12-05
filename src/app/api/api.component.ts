import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from '../shared/post.model';
import {map} from 'rxjs/operators';
import { PostService } from './post.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})

export class ApiComponent {
  loadedPosts :Post[] = [];
  isFetching = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.fetchPost();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost( postData.title, postData.content);
  
  }

  onFetchPosts() {
    this.postService.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  
}


