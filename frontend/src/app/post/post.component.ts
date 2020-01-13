import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { CommunicationService } from '../communication.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postIndex: number;
  isImage = false;
  isPost = false;
  imageUrl: SafeUrl = "";
  post =  {};
  liked = false;
  comment = false;
  postId = "";
  comments = [];
  constructor(
    private sanitizer: DomSanitizer, 
    private postService : PostService, 
    private communicationService : CommunicationService,
    private authService : AuthService
  ) { }

  expandComment(){
    this.comment = ! this.comment;
    console.log(this.comment);
  }
  doLike(){
    this.liked = true;
    this.communicationService.like(this.authService.username, this.postId).subscribe(data => console.log(data));
  }
  doDislike(){
    this.liked = false;
    this.communicationService.dislike(this.authService.username, this.postId).subscribe(data => console.log(data));
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    if(f.value.content === ""){
      console.log("Please enter comment");
    }
    else{
      this.communicationService.postComment(this.authService.username, this.postId, f.value.content).subscribe(data => console.log(data));
      this.comments.push({username : this.authService.username, comment : f.value.content});
    }
  }
  ngOnInit() {
    this.communicationService.getPostInfo(this.postService.posts[this.postIndex]._id).subscribe(data => {
      if(data.picture !== ""){
        this.communicationService.getImage(data.picture).subscribe(blob => {
          var url= window.URL.createObjectURL(blob);
          console.log(url);
          console.log(blob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(url);
          this.isImage = true;
        })
      }
      this.post = data;
      this.isPost = true;
      if (data.likes.includes(this.authService.username)){
        this.liked = true;
      } 
      for(var i=0; i<data.comments.length; i++){
        console.log(data.comments[i]);
        var curr : string = data.comments[i];
        console.log(curr);
        this.comments.push(JSON.parse(curr));
      }
      console.log(this.comments);
      this.postId = data._id;
      console.log(this.post);
    });
  }

}
