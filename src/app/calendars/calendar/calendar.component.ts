import { Component, OnInit } from '@angular/core';
import {Calendar} from "../../models/calendar.model";
import {CalendarService} from "../../services/calendar.service";
import {catchError, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendars!: Observable<any[]>;
  public cal!: Calendar[];
  live: any;

  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private calendarService: CalendarService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.listeCalendar();
  }

  deleteCalendarFromTab(prod: Calendar) {
    this.cal.forEach((cur, index) => {
      const r = prod.id.localeCompare(cur.id);
      if (r === 0) {
        this.cal.splice(index, 1);
      }
    });
  }
  deleteCalendar(c: Calendar): void{
    const conf = confirm('Etes-vous sûr de vouloir supprimer?');
    if (conf){
      const resp = this.calendarService.deleteCalendar(c.id).subscribe(() => {
        console.log('Agenda supprimé!');
        this.deleteCalendarFromTab(c);
      });
    }

  }

  listeCalendar(){
    this.calendars =this.calendarService.listeCalendar();
  }

  handleSearchCalendars(){
    let kw=this.searchFormGroup?.value.keyword;
    this.calendars =this.calendarService.getAllCalendarById(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
  handleDeleteCalendar(c: Calendar) {
    this.deleteCalendar(c);
  }

  handleCustomerAccounts(calendar: Calendar) {
    this.router.navigateByUrl("/customer-accounts/");
  }


}
