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

  ngOnInit(): void {
    const validateSession = this.authenticationService.validateSession();
    console.log('validate session in ngonit of login: ', validateSession);
    validateSession.then((response) => {
      console.log(
        'response in resolved validate session in ngonint of login: ',
        response
      );
      if (response.data === null) {
        this.router.navigateByUrl('/');
      }
    });
  }
}
