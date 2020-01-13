import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
// import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  host = "http://localhost:3000";

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
   
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //     console.log('Error has happened');
  //     // TODO: better job of transforming error for user consumption
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  uploadPost(files: any, f: any) : Observable<any>{
    console.log("posting");
    console.log(files);
    console.log(f);
    const formData: FormData = new FormData();
    if(files.length === 1){
      formData.append('image', files[0], files[0].name);
    }
    formData.append('username', this.authService.username);
    formData.append('title', f.title);
    formData.append('text', f.text);
    // console.log(formData.get("title"));
    
    return this.http.post(this.host + '/post', formData);
  }

  getImage(imageId: string): Observable<Blob> {
    return this.http.get(this.host + '/image/' + imageId ,  { responseType: 'blob' });
  }  


  getUserInfo(username:string): Observable<any>{
    return this.http.get(this.host + '/user/' +  username);
  }

  getAllPost(): Observable<any>{
    return this.http.get(this.host + '/posts');
  }

  getPostInfo(postId:string): Observable<any>{
    return this.http.get(this.host + '/post/' + postId);
  }

  like(username: string, postId: string): Observable<any>{
    return this.http.post(this.host + '/post/like/' + postId, {username : username});
  }  
  dislike(username: string, postId: string): Observable<any>{
    return this.http.post(this.host + '/post/dislike/' + postId, {username : username});
  }

  postComment(username: string, postId: string, comment : string): Observable<any>{
    var comm = "{\"username\" : \"" + username + "\", \"comment\" : \"" + comment + "\"}";
    console.log(comm);
    return this.http.post(this.host + '/comment/' + postId, {comment : comm})
  }

  constructor(private http: HttpClient, private authService: AuthService) { }
}
