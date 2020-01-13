import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string = "something";
  signedin = false;
  signedup = false;

  signin(username, password){
    this.signedin = true;
    this.signedup = false;
  }

  signout(){
    this.signedin = false;
    this.signedup = false;
  }

  signup(){
    this.signedup = false;
    this.signedin = true;
  }

  constructor() { }
}
