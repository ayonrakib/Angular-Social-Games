import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
let randomstring = require("randomstring");
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private cookieService: CookieService) { }

  async login(email:string, password:string):Promise<string>{
    const loginResponse = await axios.post('http://localhost:3000/login', {
      email: email,
      password: password
    });
    console.log("response from login from back end: ",loginResponse);
    return "";
  }

  getSession():string{
    return this.cookieService.get('session');
  }

  setSession():boolean{
    this.cookieService.set('session', randomstring.generate(), 1000);
    return this.getSession() === "" ? false : true;
  }

  deleteSession():boolean{
    this.cookieService.delete('session');
    return this.getSession() === "" ? true : false;
  }
}
