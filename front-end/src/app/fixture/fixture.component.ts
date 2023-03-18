import { Component, OnInit } from '@angular/core';
import { PollComponent } from '../poll/poll.component';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  constructor(private pollService: PollService) { }

  pollTime = "";
  pollDate = "";
  pollLocation:string = "";
  polls: [] = [];

  ngOnInit(): void {
    let pollsPromise = this.pollService.getPolls();
    pollsPromise.then(polls => {
      console.log("polls in ngOnInit in PollComponent is: ",polls)
      this.pollDate = polls[3].pollDate;
      this.pollTime = polls[3].pollTime;
      this.pollLocation = polls[3].pollLocation;
      this.polls = polls;
    })
  }

}
