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
  likes = 0;
  liked = false;
  comment = false;
  postId = "";
  comments = [];
  constructor(
    private sanitizer: DomSanitizer, 
    private postService : PostService, 
    private communicationService : CommunicationService
  ) { }

  expandComment(){
    this.comment = ! this.comment;
    console.log(this.comment);
  }
  doLike(){
    // console.log(this.communicationService.signedin);
    if(!this.communicationService.signedin){
      return;
    }
    this.liked = true;
    this.likes = this.likes + 1;
    this.communicationService.like(this.communicationService.username, this.postId).subscribe(data => console.log(data));
  }
  doDislike(){
    if(!this.communicationService.signedin){
      return;
    }
    this.liked = false;
    this.likes = this.likes - 1;
    this.communicationService.dislike(this.communicationService.username, this.postId).subscribe(data => console.log(data));
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    if(f.value.content === ""){
      console.log("Please enter comment");
    }
    else{
      this.communicationService.postComment(this.communicationService.username, this.postId, f.value.content).subscribe(data => console.log(data));
      this.comments.push({username : this.communicationService.username, comment : f.value.content});
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
      this.likes = data.likes.length;
      if (data.likes.includes(this.communicationService.username)){
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
