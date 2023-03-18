import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  constructor(private router: Router, private pollService: PollService) { }

  ngOnInit(): void {
  }

  pollDetails = [];

  async createPoll(){
    // console.log("came to create poll.");
    if(this.pollDate!= "" && this.pollLocation != "" && this.pollTime != ""){
      const polls = await this.pollService.createPoll(this.pollDate, this.pollTime, this.pollLocation);
      console.log("polls in createPoll: ",polls);
    }
  }

  pollTime = "";
  pollDate = "";
  pollLocation:string = "";

  assignTime(pollTime:any):void{
    this.pollTime = pollTime;
  }

  events: string[] = [];
}
