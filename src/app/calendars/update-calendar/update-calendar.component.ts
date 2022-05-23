import { Component, OnInit } from '@angular/core';
import {Calendar} from "../../models/calendar.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarService} from "../../services/calendar/calendar.service";


@Component({
  selector: 'app-update-calendar',
  templateUrl: './update-calendar.component.html',
  styleUrls: ['./update-calendar.component.css']
})
export class UpdateCalendarComponent implements OnInit {

  calendar = new Calendar();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.consulterCalendar(this.activatedRoute.snapshot.params['id'])
      .subscribe( prod => { this.calendar = prod; } ) ;
  }

  updateCalendar() {
    this.calendarService.updateCalendar(this.calendar).subscribe(() => {
        this.router.navigate(['calendars']);
      }, (error) => { alert('Problème lors de la modification !'); }
    );
  }

}
