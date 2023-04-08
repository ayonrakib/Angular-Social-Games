import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    const authCookie = this.authenticationService.getSession();
    if(authCookie !== ""){
      this.router.navigateByUrl('home');
    }
  }

  email:string = "";
  password:string = "";

  login():void{
    console.log(`email is: ${this.email} and pass is: ${this.password}`);
    if(this.email === 'a' && this.password === 's'){
      this.authenticationService.setSession();
      this.router.navigateByUrl('home');
    }
  }
}
