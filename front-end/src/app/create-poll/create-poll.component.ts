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

  location:string = "";
  pollDetails = [];

  async createPoll(){
    console.log("came to create poll and value of event is:");
    // this.router.navigateByUrl('fixture');
    // console.log("getDate: ",this.date.getDate());
    // console.log("getDay: ",this.date.getDay());
    // console.log("getMonth: ",this.date.getMonth());
    // console.log("getUTCDay: ",this.date.getUTCDay());
    // console.log("getFullYear: ",this.date.getFullYear());
    const polls = await this.pollService.getPolls();
    console.log("polls in createPoll: ",polls);
  }

  pollTime = "";
  date = "";

  assignTime(pollTime:any):void{
    this.pollTime = pollTime;
  }

  events: string[] = [];

  time = "";
}
