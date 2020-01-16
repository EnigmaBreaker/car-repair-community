import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

// It contain sidebar and postlist. It doesn't do anything other than splitting the frontpage to make room for posts and sidebar. See the html for the split.
export class DashboardComponent implements OnInit {

  constructor(private communicationService : CommunicationService) { 

  }

  ngOnInit() {
  }

}
