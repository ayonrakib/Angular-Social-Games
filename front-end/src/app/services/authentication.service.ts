import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
let randomstring = require('randomstring');
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private cookieService: CookieService) {}

  async login(email: string, password: string): Promise<any> {
    console.log('came to authentication service login!');
    const loginResponse = await axios.post('http://localhost:3000/login', {
      email: email,
      password: password,
    });
    console.log('response from login from back end: ', loginResponse);
    return loginResponse;
  }

  getSession(): string {
    return this.cookieService.get('session');
  }

  setSession(session: string): boolean {
    this.cookieService.set('session', session);
    return this.getSession() === '' ? false : true;
  }

  deleteSession(): boolean {
    this.cookieService.delete('session');
    return this.getSession() === '' ? true : false;
  }
}
