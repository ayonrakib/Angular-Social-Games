import { Component, OnInit, Input } from '@angular/core';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  constructor(private pollService: PollService) { }


  ngOnInit(): void {
    // let pollsPromise = this.pollService.getPolls();
    // pollsPromise.then(polls => {
    //   console.log("polls in ngOnInit in PollComponent is: ",polls)
    //   this.pollDate = polls[3].pollDate;
    //   this.pollTime = polls[3].pollTime;
    //   this.pollLocation = polls[3].pollLocation;
    // })
  }

  @Input()
  pollDate!: string;
  @Input()
  pollTime!: string;
  @Input()
  pollLocation!: string;
  @Input()
  poll: any;

  // pollDate = "";
  // pollTime = "";
  // pollLocation = "";


}
