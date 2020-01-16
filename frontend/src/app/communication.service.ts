import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})

// It contains all the functions to interact with the APIs in the backend. 

export class CommunicationService {
  host = "http://localhost:3000";
  username: string = "";
  signedin = false;
  signedup = false;

  signin(username, password){
    this.signIn(username, password).subscribe(data => {
      if(data.status){
        this.username = username;
        this.signedin = true;
        this.signedup = false;
        this.getAllPost().subscribe(data => {
          this.postService.posts = data;
          console.log(data);
          console.log(this.postService.posts);
        });
      }
    })
  }

  signup(email, username, password, firstName, lastName){
    this.signUp(email, username, password, firstName, lastName).subscribe(data => {
      console.log(data);
      if(data.status){
        this.username = username;
        this.signedin = true;
        this.signedup = false;

      }
    })
  }

  signout(){
    this.signedin = false;
    this.signedup = false;
  }

  uploadPost(files: any, f: any) : Observable<any>{
    const formData: FormData = new FormData();
    if(files.length === 1){
      formData.append('image', files[0], files[0].name);
    }
    formData.append('username', this.username);
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
    return this.http.post(this.host + '/comment/' + postId, {comment : comm})
  }

  signIn(username: string, password: string): Observable<any>{
    return this.http.post(this.host + '/signin', {username : username, password : password});
  }

  signUp(email: string, username: string, password: string, firstName: string, lastName: string): Observable<any>{
    return this.http.post(this.host + '/signup', {username : username, password : password, firstName : firstName, lastName : lastName, email: email});
  }

  constructor(private http: HttpClient, private postService: PostService) { }
}
