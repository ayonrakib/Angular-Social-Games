import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}

  async create(
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: any,
    session: string
  ): Promise<any> {
    let formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('session', session);
    formData.append('profilePicture', profilePicture, profilePicture.name);
    console.log('formdata is: ', formData);
    const isPlayerCreated = await axios.post(
      'http://localhost:3000/create-player',
      formData
    );
    console.log('isplayer created response: ', isPlayerCreated);
    return isPlayerCreated;
  }
}
