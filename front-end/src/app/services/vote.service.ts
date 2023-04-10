import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor() {}

  async getVotes(): Promise<any> {
    const votes = await axios.get('http://localhost:3000/get-votes');
    // console.log("votes in vote service: ",votes.data.data.data);
    return votes;
  }
}
