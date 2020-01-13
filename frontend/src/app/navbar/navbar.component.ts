import { Component, OnInit } from '@angular/core';
import { UserService } from  '../user.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private userService : UserService, private authService : AuthService) { }
  signUp(){
    console.log("Signing Up");
  }
  signOut(){
    this.authService.signout();
  }

  ngOnInit() {
  }

}
