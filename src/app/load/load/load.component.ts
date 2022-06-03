import { Component, OnInit } from '@angular/core';
import {Push} from "../../models/push.model";
import {CalendarService} from "../../services/calendar/calendar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  push = new Push();
  call!: Push;
  constructor(private calendarService: CalendarService, private router: Router) { }

  ngOnInit(): void {
  }

  loadEvents() {
    this.push.id = 1;
    this.push.ids = '1';
    this.pushLessons();
    this.router.navigate(['calendars']).then(() => {
      window.location.reload();
    });
  }

  loadEventsPFE() {
    this.push.id = 2;
    this.push.ids = '2';
    this.pushPfes();
    this.router.navigate(['calendars']).then(() => {
      window.location.reload();
    });
  }

  pushLessons(){
    this.calendarService.loadAll(this.push).subscribe(cale => {
      console.log(cale);
    });
  }
  pushPfes(){
    this.calendarService.loadPFEs(this.push).subscribe(cale => {
      console.log(cale);
    });
  }


  refreshEvents() {
    this.push.id = 3;
    this.push.ids = '3';
    this.calendarService.refreshAll(this.push).subscribe(cale => {
      console.log(cale);
    });
    this.router.navigate(['calendars']).then(() => {
      window.location.reload();
    });
  }


  refreshPfes(){
    this.push.id = 4;
    this.push.ids = '4';
    this.calendarService.refreshPFE(this.push).subscribe(cale => {
      console.log(cale);
    });
    this.router.navigate(['calendars']).then(() => {
      window.location.reload();
    });
  }


}
