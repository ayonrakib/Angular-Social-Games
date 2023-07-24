import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    // const isLoggedIn = await this.userService.isLoggedIn();
    // isLoggedIn === true
    //   ? this.router.navigateByUrl('home')
    //   : this.router.navigateByUrl('');
  }
}
