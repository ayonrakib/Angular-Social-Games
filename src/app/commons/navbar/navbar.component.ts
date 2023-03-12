import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreatePollComponent } from 'src/app/create-poll/create-poll.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  goToHome():void{
    this.router.navigateByUrl('');
  }

  showAnnouncements():void{
    this.router.navigateByUrl('announcements');
  }

  showRules():void{
    this.router.navigateByUrl('rules');
  }

  showFixture():void{
    this.router.navigateByUrl('fixture');
  }

  createPoll():void{
    this.router.navigateByUrl('create-poll');
  }

  createPlayer():void{

  }

  logout():void{
    console.log("came to logout!");
    if(this.authenticationService.deleteSession()){
      this.router.navigateByUrl('');
    }
  }
}
