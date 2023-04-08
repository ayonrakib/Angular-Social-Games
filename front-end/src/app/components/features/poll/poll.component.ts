import { Component, Input, OnInit } from '@angular/core';
import { PollService } from '../../../services/poll.service';
import { VoteService } from '../../../services/vote.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  constructor(private pollService: PollService, private voteService: VoteService) { }

  ngOnInit(): void {
    console.log("poll in PollComponent is: ",this.poll);
    let date = new Date(this.poll.pollDate);
    console.log("date in poll component: ",date)
    this.pollDate = date.getDate();
    this.pollMonth = this.months[date.getMonth()];
    this.pollYear = date.getFullYear();
    this.pollLocation = this.locations[this.poll.pollLocation];
    this.pollMap = this.maps[this.poll.pollLocation];
    this.pollImage = this.images[this.poll.pollLocation];
    this.pollId = (this.poll.id).toString();
    this.timeStamp = this.poll.pollTime.split(":");
    console.log("pollId: ",this.pollId);
    this.pollTime = Number(this.timeStamp[0])  > Number("12") ? (24 - Number(this.timeStamp[0])).toString() + ":" + this.timeStamp[1] + " PM"
                                                              : (Number(this.timeStamp[0])).toString() + ":" + this.timeStamp[1] + " AM";
    this.firstButtonId = this.pollId + "-" + "yes";
    this.secondButtonId = this.pollId + "-" + "no";
    this.thirdButtonId = this.pollId + "-" + "maybe";
    this.currentPollName = (this.pollName).toString();

    const votes = this.voteService.getVotes();
    console.log("votes in poll component: ",votes);
    votes.then(response => {
      console.log("resolved votes in poll component: ",response.data.data.data)
      this.yesVoters = response.data.data.data.yesVoters;
      this.noVoters = response.data.data.data.noVoters;
      this.maybeVoters = response.data.data.data.maybeVoters;
    })
  }
  pollDate!: number;
  pollDay!: string;
  pollMonth!: string;
  pollYear!: number;
  pollLocation!: string;
  pollMap!: string;
  pollImage!: string;
  pollId!: number;
  hour!: string;
  minute!: string;
  second!: string;
  pollTime!: string;
  timeStamp!: any[];
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  locations = [
                "Cedar Park Recreation Center",
                "Round Rock Sports Center",
                "Austin Sports Center (Toro Grande)",
                "Austin Sports Center (South)",
                "Brushy Creek Commuity Center"
              ]

  maps = [
            "https://goo.gl/maps/65A74jCm98VULb2e7", "https://goo.gl/maps/QViSm1afSRbzFKr76", "https://goo.gl/maps/epzYMPcwvq53z5mH7",
            "https://goo.gl/maps/8k6Y7HM2151Kpy6t7", "https://goo.gl/maps/EaqtJYqn7fCnyQ3WA"
         ];

  images = [
              "https://www.cedarparktexas.gov/ImageRepository/Document?documentID=607",
              "https://rrsportscenter.com/wp-content/uploads/2017/03/gallery_5.jpg",
              "https://www.austinsportscenter.com/wp-content/uploads/2020/09/IMG_6878-1024x768.jpg",
              "https://www.austinsportscenter.com/wp-content/uploads/2019/09/2016-10-Landers-Court-Woodward-31-1024x683.jpg",
              "https://www.bcmud.org/images/Community%20Center/community%20center%20braun%20%20butler%20dusk.jpg"
          ];

  @Input()
  poll: any;
  firstButtonId!: string;
  secondButtonId!: string;  
  thirdButtonId!: string;
  @Input()
  pollName!: number;
  currentPollName!: string;

  async handleClick(this:any, currentEvent:any):Promise<void>{
    console.log("the component that was clicked: ",this);
    console.log("the poll that was clicked: ",this.pollId);
    console.log("currentEvent: ",currentEvent);
    console.log("currentEvent.target: ",currentEvent.target);
    console.log("currentEvent.target.type: ",currentEvent.target.type);
    console.log("currentEvent.target.value: ",currentEvent.target.value);
    let isVoteCast = await this.pollService.castVote(this.pollId, currentEvent.target.value);
    console.log("is vote cast: ",isVoteCast);
  }

  getButtonStyle():string{
    return "background: #f4f4f4; border: 1px solid #dcdcdc"
  }

  yesVoters!: number;
  noVoters!: number;
  maybeVoters!: number;
}
