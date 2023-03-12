import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  location:string = "";

  createPoll():void{
    console.log("came to create poll!");
    this.router.navigateByUrl('fixture');
  }
}
