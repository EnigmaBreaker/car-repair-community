import { Component, OnInit } from '@angular/core';
import { UserService } from  '../user.service';
import { AuthService } from '../auth.service';
import { CommunicationService } from '../communication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

// It manages the navigation bar. Community name is always on the top. Option to signout comes when signed in.

export class NavbarComponent implements OnInit {
  constructor(private userService : UserService, private authService : CommunicationService) { }
  signUp(){
    console.log("Signing Up");
  }
  signOut(){
    this.authService.signout();
  }

  ngOnInit() {
  }

}
