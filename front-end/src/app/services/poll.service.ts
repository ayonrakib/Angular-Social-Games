import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  async getPolls() {
    const polls = await axios.get("http://localhost:3000/get-polls");
    return polls.data;
  }

  async createPoll(pollDate:string, pollTime:string, pollLocation:string) {
    // console.log("parameters are: ",pollDate, pollTime, pollLocation);
    const isPollCreated = await axios.post("http://localhost:3000/create-poll", {
      pollDate: pollDate,
      pollTime: pollTime,
      pollLocation: pollLocation
    })
    return isPollCreated.data;
  }

  async castVote(pollId:string, voteType:string):Promise<boolean>{
    const isVoteCast = await axios.post("http://localhost:3000/cast-vote", {
      pollId: pollId,
      voteType: voteType
    });
    console.log("cast vote response from back end: ",isVoteCast.data);
    return true;
  }
}
