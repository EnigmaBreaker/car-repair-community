import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})

// It contains the list of posts. When called, it loads all the posts from the backend and save it in post service. 
// It then calls the post component on loop which shows the post on the frontend.

export class PostlistComponent implements OnInit {
  numposts = 0;
  showPosts = false;
  constructor(private postService: PostService, private communicationService : CommunicationService) { }

  ngOnInit() {
    this.communicationService.getAllPost()
      .subscribe(data => {
        this.postService.posts = data
        // console.log(this.postService.posts);
        this.numposts = this.postService.posts.length;
        this.showPosts = true; 
      });
    }

}
