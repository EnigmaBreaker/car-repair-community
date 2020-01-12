import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {

  constructor(private postService : PostService, private communicationService : CommunicationService) { }

  ngOnInit() {
    this.communicationService.getAllPost().subscribe(data => this.postService.posts = data);
    console.log(this.postService.posts);
  }

}
