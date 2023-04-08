import { Component, OnInit } from '@angular/core';
import { PollComponent } from '../poll/poll.component';
import { PollService } from '../../../services/poll.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  constructor(private pollService: PollService) { }

  polls: [] = [];

  ngOnInit(): void {
    let pollsPromise = this.pollService.getPolls();
    pollsPromise.then(polls => {
      console.log("polls in ngOnInit in fixture component is: ",polls)
      this.polls = polls;
    })
  }

  firstButtonId = Math.random().toString(36).substring(2,7);
  secondButtonId = Math.random().toString(36).substring(2,7);
  thirdButtonId = Math.random().toString(36).substring(2,7);

  getButtonId():string{
    return Math.random().toString(36).substring(2,7);
  }

  buttonId = this.getButtonId();
}
