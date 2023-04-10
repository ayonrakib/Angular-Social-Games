import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import CallModal from '../../../utils/CallModal';
import axios from 'axios';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private callModal: CallModal
  ) {}

  ngOnInit(): void {
    const session = this.authenticationService.getSession();
    if (session !== '') {
      this.router.navigateByUrl('home');
    }
  }

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  modalBody!: string;
  modalTitle!: string;

  async register(): Promise<void> {
    console.log(`this first name is ${this.firstName}`);
    if (
      this.firstName == '' ||
      this.lastName == '' ||
      this.email == '' ||
      this.password == ''
    ) {
      {
        this.modalBody = 'Please insert valid inputs!';
        this.modalTitle = 'Failed!';
        this.callModal.callModal(this.modalBody, this.modalTitle);
      }
    } else {
      const userFoundResponse = await axios.post(
        'http://localhost:3000/get-user',
        {
          email: this.email,
        }
      );
      console.log('user found with email rakib: ', userFoundResponse);
      if (userFoundResponse.data.error === null) {
        this.modalBody = 'Account exists! Please use another email!';
        this.modalTitle = 'Error!';
        this.callModal.callModal(this.modalBody, this.modalTitle);
      } else {
        const createdUserResponse = await axios.post(
          'http://localhost:3000/create-user',
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          }
        );
        if (this.authenticationService.setSession()) {
          this.router.navigateByUrl('home');
        }
      }
    }
  }
}
