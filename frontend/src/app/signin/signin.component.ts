import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

// It display the signin form and option to switch to signup. When signed in, it calls the function to signin and redirects sidebar to createpost
// when signin is successfully done.
export class SigninComponent implements OnInit {

  error = false;
  onSubmit(f : NgForm){
    if(f.value.username == "" ){
      this.error = true;
    }
    else{
      this.communicationService.signin(f.value.username, f.value.password);
    }
  }

  switchToSignup(){
    this.communicationService.signedup = true;
  }

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
  }

}
