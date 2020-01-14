import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private authService : CommunicationService) { }

  ngOnInit() {
  }

}
