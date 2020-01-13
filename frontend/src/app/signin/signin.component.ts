import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  error = false;
  onSubmit(f : NgForm){
    console.log(f.value);
    if(f.value.username == "" ){
      this.error = true;
    }
    else{
      this.authService.signin(f.value.email, f.value.password);
    }
  }

  switchToSignup(){
    this.authService.signedup = true;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
