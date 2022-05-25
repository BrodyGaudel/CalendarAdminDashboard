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
    this.push.id = 2;
    this.push.ids = '2';
    this.calendarService.loadAll(this.push).subscribe(cale => {
      console.log(cale);

    });
    this.router.navigate(['calendars']).then(() => {
      window.location.reload();
    });
  }
}
