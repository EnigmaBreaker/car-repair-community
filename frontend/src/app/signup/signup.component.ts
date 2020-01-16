import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

// It manages the signup form on the sidebar and have option to switch to signin. It redirects side bar to createpost when signup is successfully done.

export class SignupComponent implements OnInit {

  error = false;
  switchToSignin(){
    this.authService.signedup = false;
  }

  onSubmit(f: NgForm){
    if(f.value.confirmPassword !== f.value.password){
      this.error = true;
    }
    else{
      this.authService.signup(f.value.email, f.value.username, f.value.password, f.value.firstName, f.value.lastName);
    }
  }
  

  constructor(private authService : CommunicationService) { }

  ngOnInit() {
  }

}
