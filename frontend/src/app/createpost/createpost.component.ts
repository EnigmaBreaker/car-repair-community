import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommunicationService } from '../communication.service';

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
        console.log('Post done' + response);
      });
    }
  }
  constructor(private communicationService : CommunicationService) { }

  ngOnInit() {
  }

}
