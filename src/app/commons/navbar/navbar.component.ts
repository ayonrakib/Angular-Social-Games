import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementsComponent } from 'src/app/announcements/announcements.component';
import { RulesComponent } from 'src/app/rules/rules.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @Input() homepageData:any;

  components = [AnnouncementsComponent, RulesComponent];

  sendDataToAnnouncement(index:number):void{
    console.log("came in sendDataToAnnouncement method!");
    this.homepageData = this.components[index];
  }

  showAnnouncements():void{
    this.router.navigateByUrl('announcements');
  }
  
}
