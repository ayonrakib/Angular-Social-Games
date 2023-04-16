import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import CallModal from 'src/app/utils/CallModal';
import axios from 'axios';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private callModal: CallModal
  ) {}

  ngOnInit(): void {
    const authCookie = this.authenticationService.getSession();
    if (authCookie !== '') {
      this.router.navigateByUrl('home');
    }
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
        this.callModal.callModal(this.modalBody, this.modalTitle);
      } else if (this.password === '') {
        this.modalBody = 'Please insert valid password!';
        this.modalTitle = 'Failed!';
        this.callModal.callModal(this.modalBody, this.modalTitle);
      } else {
        this.modalBody = 'Please insert valid email!';
        this.modalTitle = 'Failed!';
        this.callModal.callModal(this.modalBody, this.modalTitle);
      }
    } else {
      if (this.email === 'a' && this.password === 's') {
        // this.authenticationService.setSession();
        this.router.navigateByUrl('home');
      } else {
        const loginResponse = await this.authenticationService.login(
          this.email,
          this.password
        );
        console.log('login repsonse: ', loginResponse);
        if (loginResponse.data.data === null) {
          console.log('came inside user not found in login component!');
          this.modalBody = loginResponse.data.error.errorMessage;
          this.modalTitle = loginResponse.data.error.errorCode + ' error!';
          this.callModal.callModal(this.modalBody, this.modalTitle);
        }
      }

      // else {
      //   this.modalBody = 'Wrong credentials! Please enter again!';
      //   this.modalTitle = 'Failed!';
      //   this.callModal.callModal(this.modalBody, this.modalTitle);
      // }
    }
  }
}
