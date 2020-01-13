import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error = false;
  switchToSignin(){
    this.authService.signedup = false;
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    if(f.value.confirmPassword !== f.value.password){
      this.error = true;
    }
  }
  

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

}
