import { Injectable } from '@angular/core';
import axios from 'axios';
import Voters from '../model/Voters';
import PublicUser from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor() {}

  async getVotes(): Promise<any> {
    const votes = await axios.get('http://localhost:3000/vote/get-votes');
    const currentVoters = new Voters(
      votes.data.yesVoters,
      votes.data.noVoters,
      votes.data.maybeVoters
    );
    console.log(
      'currentVoters in get votes method in vote service: ',
      currentVoters
    );
    return votes.data.data.data;
  }

  async getVotersForCurrentPoll(pollId: number): Promise<any> {
    const votersResponse = await axios.post(
      'http://localhost:3000/vote/get-voters',
      {
        pollId: pollId,
      }
    );
    let yesVoters: PublicUser[] = [];
    let noVoters: PublicUser[] = [];
    let maybeVoters: PublicUser[] = [];
    let voters: Voters = new Voters(
      votersResponse.data.data['yesVoters'],
      votersResponse.data.data['noVoters'],
      votersResponse.data.data['maybeVoters']
    );
    console.log(
      'voters in getVotersForCurrentPoll method of vote service: ',
      voters
    );

    console.log(
      'voters.data in getVotersForCurrentPoll method of vote service: ',
      votersResponse.data
    );
    return votersResponse.data;
  }
}
