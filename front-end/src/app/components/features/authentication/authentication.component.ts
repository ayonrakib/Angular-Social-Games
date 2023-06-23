import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import validate from 'validate.js';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) // private callModal: CallModal
  {}

  ngOnInit(): void {
    const validateSession = this.authenticationService.validateSession();
    console.log('validate session in ngonit of login: ', validateSession);
    validateSession.then((response) => {
      console.log(
        'response in resolved validate session in ngonint of login: ',
        response
      );
      if (response.data !== null) {
        this.router.navigateByUrl('home');
      }
    });
  }

  email: string = '';
  password: string = '';
  modalBody!: string;
  modalTitle!: string;

  async login(): Promise<void> {
    console.log(`email is: ${this.email} and pass is: ${this.password}`);
    if (this.email === '' || this.password === '') {
      if (this.email === '' && this.password == '') {
        this.modalBody = 'Please insert valid email and password!';
        this.modalTitle = 'Failed!';
        // this.callModal.callModal(this.modalBody, this.modalTitle, '');
      } else if (this.password === '') {
        this.modalBody = 'Please insert valid password!';
        this.modalTitle = 'Failed!';
        // this.callModal.callModal(this.modalBody, this.modalTitle, '');
      } else {
        this.modalBody = 'Please insert valid email!';
        this.modalTitle = 'Failed!';
        // this.callModal.callModal(this.modalBody, this.modalTitle, '');
      }
    } else {
      const loginResponse = await this.authenticationService.login(
        this.email,
        this.password
      );
      if (loginResponse.data.data === null) {
        console.log('came inside authentication failure in login component!');
        this.modalBody = loginResponse.data.error.errorMessage;
        this.modalTitle = loginResponse.data.error.errorCode + ' error!';
        // this.callModal.callModal(this.modalBody, this.modalTitle, '');
      } else {
        this.authenticationService.setSession(loginResponse.data.data);
        this.router.navigateByUrl('home');
      }
    }
  }
}
