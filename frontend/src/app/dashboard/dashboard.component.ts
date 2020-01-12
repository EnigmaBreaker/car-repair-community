import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private communicationService : CommunicationService) { 

  }

  ngOnInit() {
    // this.communicationService.getUserInfo("something").subscribe(data => console.log(data));
    // this.communicationService.getAllPost().subscribe(data => console.log(data));
    // this.communicationService.getImage("4ca5cb44464d4f0961a8278046f08cdc").subscribe(data => {
    //   var url= window.URL.createObjectURL(data);
    //   console.log(url);
    //   console.log(data);
    //   window.open(url);
    // });

    // this.communicationService.getPostInfo("5e1b5278b247cd784cb64699").subscribe(data => console.log(data));
  }

}
