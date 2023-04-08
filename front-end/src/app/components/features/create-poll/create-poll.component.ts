import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../../../services/poll.service';
import { ModalComponent } from '../../commons/modal/modal.component';

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
      let isPollCreated = await this.pollService.createPoll(this.pollDate, this.pollTime, this.pollLocation);
      console.log("polls in createPoll: ",isPollCreated);
      this.isPollCreated = isPollCreated;
      let modalButton = document.getElementById("modalButton");
      modalButton?.click();
    }
  }
  isPollCreated = false;
  pollTime = "";
  pollDate = "";
  pollLocation:string = "";
  pollSuccessModalBody = "Poll created";
  pollSuccessModalTitle = "Success!";

  assignTime(pollTime:any):void{
    this.pollTime = pollTime;
  }

  events: string[] = [];
}
