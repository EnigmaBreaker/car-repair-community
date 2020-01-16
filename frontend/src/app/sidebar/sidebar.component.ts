import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

// It manages the sidebar and decides which component is to be shown on the frontend and when. It checks the signin status and change the 
// form on the frontend to either signin, signup or create post. It then calls the correspoding component to display on the frontend.

export class SidebarComponent implements OnInit {
  constructor(private authService : CommunicationService) { }

  ngOnInit() {
  }

}
