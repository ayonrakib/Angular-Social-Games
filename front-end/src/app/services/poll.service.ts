import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(
    private cookieService: CookieService,
    private authenticationService: AuthenticationService
  ) {}

  async getPolls() {
    const polls = await axios.get('http://localhost:3000/get-polls');
    return polls.data;
  }

  async createPoll(
    pollDate: string,
    pollTime: string,
    pollLocation: string,
    owner_id: number
  ) {
    // console.log("parameters are: ",pollDate, pollTime, pollLocation, pollOwnerId);
    const isPollCreated = await axios.post(
      'http://localhost:3000/create-poll',
      {
        pollDate: pollDate,
        pollTime: pollTime,
        pollLocation: pollLocation,
        owner_id: owner_id,
      }
    );
    return isPollCreated.data;
  }

  async castVote(pollId: string, voteType: string): Promise<boolean> {
    const session = this.authenticationService.getSession();
    const isVoteCast = await axios.post('http://localhost:3000/cast-vote', {
      pollId: pollId,
      voteType: voteType,
      session: session,
    });
    console.log('cast vote response from back end: ', isVoteCast.data);
    return true;
  }
}
