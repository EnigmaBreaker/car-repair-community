import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  @ViewChild('fileInput', {static : false}) fileInput;
  onSubmit(f: NgForm) {

    const files: FileList = this.fileInput.nativeElement.files;


    // console.log(f.value);  // { first: '', last: '' }
    // console.log(f.valid);  // false
    this.communicationService.uploadPost(files, f.value).subscribe(response => {
      console.log('Post done' + response);
    });
  }
  constructor(private communicationService : CommunicationService) { }

  ngOnInit() {
  }

}
