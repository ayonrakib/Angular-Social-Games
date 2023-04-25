import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
// import { DateController } from 'src/app/controller/DateController';

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

  async ngOnInit(): Promise<void> {
    const validateSession = await this.authenticationService.validateSession();
    if (validateSession.data === null) {
      this.authenticationService.deleteSession();
      this.router.navigateByUrl('/');
    }
  }
}
