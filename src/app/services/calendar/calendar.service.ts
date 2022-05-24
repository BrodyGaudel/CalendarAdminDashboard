import { Injectable } from '@angular/core';
import {Calendar} from "../../models/calendar.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendars!: Calendar[];
  calendar!: Calendar;
  cale = new Calendar();
  calendarRecherche!: Calendar[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  listeCalendar(): Observable<Calendar[]>{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.get<Calendar[]>('http://localhost:8088/calendarlist/list', {headers: httpHeaders});
  }

  ajouterCalendar( calendar: Calendar): Observable<Calendar>{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.post<Calendar>('http://localhost:8088/calendar/insert', calendar, {headers: httpHeaders});
  }
  deleteCalendar(id: string) {
    // const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.delete('http://localhost:8088/calendar/delete/' + id, {headers: httpHeaders});
  }

  consulterCalendar(id: string): Observable<Calendar> {
    // const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.get<Calendar>('http://localhost:8088/calendar/get/' + id, {headers: httpHeaders});
  }
  updateCalendar(calendar: Calendar): Observable<Calendar> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.put<Calendar>('http://localhost:8088/calendar/update', calendar, {headers: httpHeaders});
  }

  getAllCalendarById(id: string): Observable<Array<Calendar[]>>{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.get<Array<Calendar[]>>('http://localhost:8088/calendar/return/' + id, {headers: httpHeaders});
  }

  loadAllEvents(): Observable<any>{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.get<any>('http://localhost:8088/plan/test' ,{headers: httpHeaders});

  }
}
