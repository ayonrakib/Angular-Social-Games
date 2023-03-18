import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("poll in PollComponent is: ",this.poll);
    let date = new Date(this.poll.pollDate);
    this.pollDate = date.getDate();
    this.pollMonth = this.months[date.getMonth()];
    this.pollYear = date.getFullYear();
    this.pollLocation = this.locations[this.poll.pollLocation];
    this.pollMap = this.maps[this.poll.pollLocation];
    this.pollImage = this.images[this.poll.pollLocation];
    this.timeStamp = this.poll.pollTime.split(":");
    console.log("timeStamp: ",this.timeStamp);
    this.pollTime = Number(this.timeStamp[0])  > Number("12") ? (24 - Number(this.timeStamp[0])).toString() + ":" + this.timeStamp[1] + " PM"
                                                              : (Number(this.timeStamp[0])).toString() + ":" + this.timeStamp[1] + " AM";
  }

  pollDate!: number;
  pollDay!: string;
  pollMonth!: string;
  pollYear!: number;
  pollLocation!: string;
  pollMap!: string;
  pollImage!: string;
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


}
