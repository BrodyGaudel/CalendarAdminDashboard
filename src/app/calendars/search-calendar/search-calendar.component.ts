import { Component, OnInit } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Calendar} from "../../models/calendar.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CalendarService} from "../../services/calendar/calendar.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-calendar',
  templateUrl: './search-calendar.component.html',
  styleUrls: ['./search-calendar.component.css']
})
export class SearchCalendarComponent implements OnInit {

  calendars!: Observable<any[]>;
  public cal!: Calendar[];
  live: any;
  nomuser!: string;

  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private calendarService: CalendarService,
              private fb: FormBuilder,
              private router:Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nomuser = this.activatedRoute.snapshot.params['id'];
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
    this.calendars =this.calendarService.searchCalendars(this.nomuser);
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

  handleDetails(calendar: Calendar) {
    this.gotoItem(calendar);
  }

  gotoItem(c: Calendar){
    this.router.navigate(['/details',c.id]);
  }


  handleUpdateCalendar(c: Calendar) {
    this.router.navigate(['/update-calendar',c.id]);
  }

}
