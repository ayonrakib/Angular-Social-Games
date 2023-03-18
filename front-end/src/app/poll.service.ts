import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  async getPolls() {
    const polls = await axios.get("http://localhost:3000/get-polls");
    // console.log(polls);
    return polls.data;
  }
}
