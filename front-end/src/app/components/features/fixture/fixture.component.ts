import { Component, OnInit } from '@angular/core';
import { PollComponent } from '../poll/poll.component';
import { PollService } from '../../../services/poll.service';
import { VoteService } from '../../../services/vote.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css'],
})
export class FixtureComponent implements OnInit {
  constructor(
    private pollService: PollService,
    private voteService: VoteService
  ) {}

  polls: [] = [];
  votes: [] = [];
  currentPollVotes: [] = [];
  modalBody!: string;
  modalTitle!: string;

  async ngOnInit(): Promise<void> {
    this.votes = await this.voteService.getVotes();
    console.log('votes in ngonint of fixture: ', this.votes);
    let pollsPromise = this.pollService.getPolls();
    pollsPromise.then((polls) => {
      console.log('polls in ngOnInit in fixture component is: ', polls);
      this.polls = polls;
    });
  }

  getModalBodyFromChild(modalBodyFromChild: string): void {
    console.log('modalBodyFromChild value: ', modalBodyFromChild);
    this.modalBody = modalBodyFromChild;
  }
  getModalTitleFromChild(modalTitleFromChild: string): void {
    console.log('modalTitleFromChild value: ', modalTitleFromChild);
    this.modalTitle = modalTitleFromChild;
  }
}
