import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarService} from "../../services/calendar.service";
import {Router} from "@angular/router";
import {Calendar} from "../../models/calendar.model";

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent implements OnInit {

  newAddCalendarFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private calendarService: CalendarService, private router: Router) { }

  ngOnInit(): void {
    this.newAddCalendarFormGroup = this.fb.group( {
      summary : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      description : this.fb.control( null, [Validators.required, Validators.minLength(4)])
    });
  }

  handleSaveCalendar() {
    let calendar: Calendar = this.newAddCalendarFormGroup.value;
    this.calendarService.ajouterCalendar(calendar).subscribe( {
      next : data => {
        alert("Customer has been successfully saved!");
        this.newAddCalendarFormGroup.reset();
        this.router.navigateByUrl("/calendars").then(() => {
          // Do something
        });
      },
      error : err => {
        console.log(err);
      }
    });
  }


}
