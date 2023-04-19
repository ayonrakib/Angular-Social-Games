import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../../../services/poll.service';
import { ModalComponent } from '../../commons/modal/modal.component';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
})
export class CreatePollComponent implements OnInit {
  constructor(
    private router: Router,
    private pollService: PollService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  pollDetails = [];

  async createPoll() {
    // console.log("came to create poll.");
    const session = this.cookieService.get('session');
    const user = await axios.post('http://localhost:3000/validate', {
      session: session,
    });
    console.log(
      'user obj in create poll method in create poll component: ',
      user
    );
    console.log(
      'user obj.data.data in create poll method in create poll component: ',
      user.data.data
    );
    let owner_id = user.data !== null ? user.data.data.id : null;
    console.log(
      'create poll details: ',
      this.pollDate,
      this.pollTime,
      this.pollLocation,
      owner_id
    );
    if (this.pollDate != '' && this.pollLocation != '' && this.pollTime != '') {
      let isPollCreated = await this.pollService.createPoll(
        this.pollDate,
        this.pollTime,
        this.pollLocation,
        owner_id
      );
      console.log('polls in createPoll: ', isPollCreated);
      this.isPollCreated = isPollCreated;
      let modalButton = document.getElementById('modalButton');
      modalButton?.click();
    }
  }
  isPollCreated = false;
  pollTime = '';
  pollDate = '';
  pollLocation: string = '';
  modalBody = 'Poll created';
  modalTitle = 'Success!';

  assignTime(pollTime: any): void {
    this.pollTime = pollTime;
  }

  events: string[] = [];
}
