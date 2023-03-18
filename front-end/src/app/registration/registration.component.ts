import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    const session = this.authenticationService.getSession();
    if(session !== ""){
      this.router.navigateByUrl('home');
    }
  }

  firstName:string = "";
  lastName:string = "";
  email:string = "";
  password:string = "";

  register():void{
    console.log(`this first name is ${this.firstName}`);
    if(this.firstName === 'a' && this.lastName === 's' && this.email === 'd' && this.password == 'f'){
      if(this.authenticationService.setSession()){
        this.router.navigateByUrl('home');
      }

    }
  }

}
