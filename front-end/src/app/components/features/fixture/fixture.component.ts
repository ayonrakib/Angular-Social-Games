import { Component, OnInit } from '@angular/core';
import { PollComponent } from '../poll/poll.component';
import { PollService } from '../../../services/poll.service';
import { VoteService } from '../../../services/vote.service';

interface CurrentPollVotes {
  yesVoters: number;
  noVoters: number;
  maybeVoters: number;
}

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
  currentPollVotes!: CurrentPollVotes;
  modalBody!: string;
  modalTitle!: string;
  yesVoters!: number;
  noVoters!: number;
  maybeVoters!: number;

  async ngOnInit(): Promise<void> {
    this.votes = await this.voteService.getVotes();
    console.log('votes in ngonint of fixture: ', this.votes);

    let pollsPromise = this.pollService.getPolls();
    pollsPromise.then((polls) => {
      console.log('polls in ngOnInit in fixture component is: ', polls);
      this.polls = polls;
    });
  }

  getCurrentVotes(poll: any) {
    this.currentPollVotes = {
      yesVoters: 0,
      noVoters: 0,
      maybeVoters: 0,
    };
    this.votes.forEach((vote) => {
      if (vote['pollId'] === poll.id) {
        if (vote['voteType'] === 'yes') {
          this.currentPollVotes['yesVoters']++;
        } else if (vote['voteType'] === 'no') {
          this.currentPollVotes['noVoters']++;
        } else {
          this.currentPollVotes['maybeVoters']++;
        }
      }
    });
    return this.currentPollVotes;
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
