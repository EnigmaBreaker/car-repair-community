import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommunicationService } from '../communication.service';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  error = false;
  @ViewChild('fileInput', {static : false}) fileInput;
  onSubmit(f: NgForm) {
    if(f.value.title == ""){
      this.error = true;
    }
    else{
      const files: FileList = this.fileInput.nativeElement.files;
      this.communicationService.uploadPost(files, f.value).subscribe(response => {
        console.log('Post done');
        console.log(response._id);
        f.resetForm();
        this.postService.posts.unshift(response);
        console.log(this.postService.posts);
        // this.router.navigateByUrl('/aniket');
      });
    }
  }
  constructor(private communicationService : CommunicationService, private postService : PostService, private router:  Router) { }

  ngOnInit() {
  }

}
