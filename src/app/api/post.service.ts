import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Post} from '../shared/post.model';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class PostService {

constructor(private http: HttpClient) {}

createAndStorePost( title: string, content: string ){
    const postData : Post ={title: title, content: content}
    this.http
    .post<{name:string}>('https://shoppingapp-fba35-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData).subscribe(responseData => {
       console.log(responseData);
     });
}

fetchPost(){
    this.http
    .get<{[key:string]:Post}>('https://shoppingapp-fba35-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
    .pipe(
      map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
    ).
    subscribe(posts => {
console.log(posts);
    });
}
}