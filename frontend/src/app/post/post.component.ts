import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postIndex: number;
  isImage = false;
  isPost = false;
  imageUrl = "";
  post =  {};
  constructor(private postService : PostService, private communicationService : CommunicationService) { }

  ngOnInit() {
    this.communicationService.getPostInfo(this.postService.posts[this.postIndex]._id).subscribe(data => {
      if(data.picture !== ""){
        this.communicationService.getImage(data.picture).subscribe(blob => {
          var url= window.URL.createObjectURL(blob);
          console.log(url);
          console.log(blob);
          this.imageUrl = url;
          this.isImage = true;
        })
      }
      this.post = data;
      this.isPost = true;
      console.log(this.post);
    });
  }

}
