import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<any> {
    let formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    console.log('formdata is: ', formData);
    const isPlayerCreated = await axios.post(
      'http://localhost:3000/user/create-user',
      formData
    );
    console.log('isplayer created response: ', isPlayerCreated);
    return isPlayerCreated.data;
  }

  async amIAdmin(): Promise<boolean> {
    const session = this.authenticationService.getSession();
    const isAdminResponse = await axios.post(
      'http://localhost:3000/user/is-admin',
      {
        session: session,
      }
    );
    return isAdminResponse.data.data;
  }

  async authorizeIfAdmin(): Promise<void> {
    const isAdmin = await this.amIAdmin();
    if (!isAdmin) {
      this.router.navigateByUrl('');
    }
  }

  async isLoggedIn(): Promise<boolean> {
    const sessionValidated = await this.authenticationService.validateSession();
    return sessionValidated.data === null ? false : true;
  }

  async getProfileData(): Promise<any> {
    const session = this.authenticationService.getSession();
    const profileData = await axios.post(
      'http://localhost:3000/user/get-profile-data',
      {
        session: session,
      }
    );
    return profileData;
  }

  async getSignedURLForUploadingProfilePicture(session: string): Promise<any> {
    const signedURLForUploadingProfilePicture = await axios.post(
      'http://localhost:3000/image/get-signed-url',
      {
        session: session,
      }
    );
    return signedURLForUploadingProfilePicture.data;
  }

  async uploadProfilePicture(
    signedURL: string,
    profilePicture: any
  ): Promise<string> {
    var options = {
      headers: {
        'Content-Type': 'image/png',
      },
    };

    const upload = await axios.put(signedURL, profilePicture);
    console.log('upload repsonse is: ', upload.request.responseURL);
    const imageURL = upload.request.responseURL.split('?')[0];
    console.log('image url: ', imageURL);
    return imageURL;
  }

  async assignProfilePicture(imageURL: string): Promise<any> {
    const session = this.authenticationService.getSession();
    const assignProfilePicture = await axios.post(
      'http://localhost:3000/image/assign-profile-picture-url',
      {
        session: session,
        imageURL: imageURL,
      }
    );
    console.log('assign profile picture response: ', assignProfilePicture);
    return assignProfilePicture;
  }
}
