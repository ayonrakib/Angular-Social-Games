import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
let randomstring = require("randomstring");

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private cookieService: CookieService) { }

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
