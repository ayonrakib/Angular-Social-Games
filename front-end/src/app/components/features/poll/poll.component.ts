import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PollService } from '../../../services/poll.service';
import { VoteService } from '../../../services/vote.service';
import { ShowVotersComponent } from '../show-voters/show-voters.component';
import logger from 'src/app/utils/Logger';
import { ModalService } from 'src/app/services/modal.services';
// import pino from 'pino';
// // import path from 'path';
// // const scriptName = path.basename(__filename);
// const formatters = {
//   bindings(bindings: any) {
//     return {
//       pid: bindings.pid,
//       hostname: bindings.hostname,
//       methodName: 'ayon',
//       // fileName: scriptName,
//       node_version: process.version,
//     };
//   },
// };
// const logger = pino({
//   formatters: formatters,
//   msgPrefix: 'this is a message prefix!',
// });
logger.info('came to poll component with pino pretty!');

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent implements OnInit {
  constructor(
    private pollService: PollService,
    private voteService: VoteService,
    private modalService: ModalService
  ) {}

  async ngOnInit(): Promise<void> {
    // logger.info('poll in PollComponent is: ', this.poll);
    // logger.info('poll in PollComponent is: ', this.poll);
    let date = new Date(this.poll.pollDate);
    // logger.info('date in poll component: ', date);
    this.pollDate = date.getDate();
    this.pollMonth = this.months[date.getMonth()];
    this.pollYear = date.getFullYear();
    this.pollLocation = this.locations[this.poll.pollLocation];
    this.pollMap = this.maps[this.poll.pollLocation];
    this.pollImage = this.images[this.poll.pollLocation];
    this.pollId = 'poll' + this.poll.id.toString();
    this.modalId = this.poll.id.toString();
    this.timeStamp = this.poll.pollTime.split(':');
    // logger.info('pollId: ', this.pollId);
    // logger.info('pollId: ', this.pollId);
    this.pollTime =
      Number(this.timeStamp[0]) > Number('12')
        ? (24 - Number(this.timeStamp[0])).toString() +
          ':' +
          this.timeStamp[1] +
          ' PM'
        : Number(this.timeStamp[0]).toString() +
          ':' +
          this.timeStamp[1] +
          ' AM';
    this.firstButtonId = this.pollId + '-' + 'yes';
    this.secondButtonId = this.pollId + '-' + 'no';
    this.thirdButtonId = this.pollId + '-' + 'maybe';
    this.currentPollName = this.pollName.toString();
    // logger.info('votes in poll component: ', this.votes);
    this.yesVoters = 0;
    this.noVoters = 0;
    this.maybeVoters = 0;
    // logger.info('this.pollid: ', typeof this.pollId);
    for (let index = 0; index < this.votes.length; index++) {
      // logger.info('current vote obj: ', this.votes[index]);
      // logger.info('current vote: ', this.votes[index]['voteType']);
      // logger.info("this.votes[index]['pollId']: ", this.votes[index]['pollId']);
      if ('poll' + this.votes[index]['pollId'] === this.pollId) {
        switch (this.votes[index]['voteType']) {
          case 'yes':
            this.yesVoters++;
            break;
          case 'no':
            this.noVoters++;
            break;
          case 'maybe':
            this.maybeVoters++;
            break;
        }
      }
    }
    // logger.info('yesvoters: ', this.yesVoters);
  }
  @Input()
  modalBody!: string;
  @Input()
  modalTitle!: string;
  @Output() modalBodyFromPoll = new EventEmitter<string>();
  @Output() modalTitleFromPoll = new EventEmitter<string>();
  @Input()
  modalId!: string;
  pollDate!: number;
  pollDay!: string;
  pollMonth!: string;
  pollYear!: number;
  pollLocation!: string;
  pollMap!: string;
  pollImage!: string;
  pollId!: string;
  hour!: string;
  minute!: string;
  second!: string;
  pollTime!: string;
  timeStamp!: any[];
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  locations = [
    'Cedar Park Recreation Center',
    'Round Rock Sports Center',
    'Austin Sports Center (Toro Grande)',
    'Austin Sports Center (South)',
    'Brushy Creek Commuity Center',
  ];

  maps = [
    'https://goo.gl/maps/65A74jCm98VULb2e7',
    'https://goo.gl/maps/QViSm1afSRbzFKr76',
    'https://goo.gl/maps/epzYMPcwvq53z5mH7',
    'https://goo.gl/maps/8k6Y7HM2151Kpy6t7',
    'https://goo.gl/maps/EaqtJYqn7fCnyQ3WA',
  ];

  images = [
    'https://www.cedarparktexas.gov/ImageRepository/Document?documentID=607',
    'https://rrsportscenter.com/wp-content/uploads/2017/03/gallery_5.jpg',
    'https://www.austinsportscenter.com/wp-content/uploads/2020/09/IMG_6878-1024x768.jpg',
    'https://www.austinsportscenter.com/wp-content/uploads/2019/09/2016-10-Landers-Court-Woodward-31-1024x683.jpg',
    'https://www.bcmud.org/images/Community%20Center/community%20center%20braun%20%20butler%20dusk.jpg',
  ];

  @Input()
  poll: any;
  firstButtonId!: string;
  secondButtonId!: string;
  thirdButtonId!: string;
  @Input()
  pollName!: number;
  currentPollName!: string;
  @Input()
  votes!: [];

  async handleClick(this: any, currentEvent: any): Promise<void> {
    // logger.info('the component that was clicked: ', this);
    // logger.info('the poll that was clicked: ', this.pollId);
    // logger.info('currentEvent: ', currentEvent);
    // logger.info('currentEvent.target: ', currentEvent.target);
    // logger.info('currentEvent.target.type: ', currentEvent.target.type);
    // logger.info('currentEvent.target.value: ', currentEvent.target.value);
    let isVoteCast = await this.pollService.castVote(
      this.pollId,
      currentEvent.target.value
    );
    logger.info('is vote cast: ', isVoteCast);
    if (isVoteCast) {
      this.modalBody = `You successfully voted ${currentEvent.target.value}!`;
      this.modalTitle = 'Success!';
    } else {
      this.modalBody = `Your vote failed! Please try again!`;
      this.modalTitle = 'Failed!';
    }
  }

  showVoters(): void {
    logger.info('came into show voters!');
    this.modalBody = this.pollId.toString();
    this.modalTitle = this.pollLocation;

    logger.info('current modalBody in pollcomponent: ', this.modalBody);
    logger.info('current modalTitle in pollcomponent: ', this.modalTitle);
    this.modalBodyFromPoll.emit(this.modalBody);
    this.modalTitleFromPoll.emit(this.modalTitle);
    this.modalService.callModal();
  }

  getButtonStyle(): string {
    return 'background: #f4f4f4; border: 1px solid #dcdcdc';
  }

  yesVoters!: number;
  noVoters!: number;
  maybeVoters!: number;
}
