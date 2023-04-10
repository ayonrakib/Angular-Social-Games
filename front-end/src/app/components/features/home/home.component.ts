import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import dateController from 'src/app/controller/DateController';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.getSession() === '') {
      this.router.navigateByUrl('');
    }
    console.log(
      '5 years ago date in home component: ',
      dateController.getOldDateByYearDifference(5) + ' and type of date: ',
      typeof dateController.getOldDateByYearDifference(5)
    );
  }
}
