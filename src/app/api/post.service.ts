import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from '../shared/post.model';
import { catchError, map , tap} from 'rxjs/operators';
import { Subject, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content }
    this.http
      .post<{ name: string }>('https://shoppingapp-fba35-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', 
      postData,
      {
        observe: 'response' 
      }
      ).subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://shoppingapp-fba35-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({
            'Custom-Header': 'Hello'
          }),
          params: searchParams
        }
      )
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      )
  }

  deletePost() {
    return this.http
      .delete('https://shoppingapp-fba35-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      {
        observe: 'events' 
      }).pipe(tap(event =>{
        if(event.type === HttpEventType.Sent){
          console.log(event);
        }

        if(event.type === HttpEventType.Response){
          console.log(event.body);
        }
      }));
  }
}