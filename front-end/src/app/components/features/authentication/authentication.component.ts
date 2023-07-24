import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import validate from 'validate.js';
import { ModalService } from 'src/app/services/modal.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: ModalService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('came on oninit of auth component');
    (await this.userService.isLoggedIn()) === true
      ? this.router.navigateByUrl('home')
      : this.router.navigateByUrl('');
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
      } else if (this.password === '') {
        this.modalBody = 'Please insert valid password!';
        this.modalTitle = 'Failed!';
      } else {
        this.modalBody = 'Please insert valid email!';
        this.modalTitle = 'Failed!';
      }
      this.modalService.callModal();
    } else {
      const loginResponse = await this.authenticationService.login(
        this.email,
        this.password
      );
      if (loginResponse.data.data === null) {
        console.log('came inside authentication failure in login component!');
        this.modalBody = loginResponse.data.error.errorMessage;
        this.modalTitle = loginResponse.data.error.errorCode + ' error!';
        this.modalService.callModal();
      } else {
        this.authenticationService.setSession(loginResponse.data.data);
        this.router.navigateByUrl('home');
      }
    }
  }
}
