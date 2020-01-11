import { Component, OnInit } from '@angular/core';
import { UserService } from  '../user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private userService : UserService) { }
  signUp(){
    console.log("Signing Up");
  }
  signIn(){
    this.userService.signedIn = true;
  }
  signOut(){
    this.userService.signedIn = false;
  }

  ngOnInit() {
  }

}
