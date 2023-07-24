import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/services/modal.services';
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
    private modalService: ModalService,
    private userService: UserService
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
        this.modalService.callModal();
      }
    } else {
      const createdUserResponse = await this.userService.create(
        this.firstName,
        this.lastName,
        this.email,
        this.password
      );
      console.log('createdUserResponse in register: ', createdUserResponse);
      console.log(
        'createdUserResponse.data in register: ',
        createdUserResponse.data
      );
      if (createdUserResponse.data === null) {
        this.modalBody = 'Account exists! Please use another email!';
        this.modalTitle = 'Error!';
        this.modalService.callModal();
      } else {
        this.modalBody = 'Success!';
        this.modalTitle =
          'Successfully registered! Going back to Login screen!';
        this.modalService.callModal();
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 2000);
      }
    }
  }
}
