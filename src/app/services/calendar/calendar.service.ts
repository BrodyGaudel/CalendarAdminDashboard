import { Injectable } from '@angular/core';
import {Calendar} from "../../models/calendar.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {Push} from "../../models/push.model";

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
    const httpHeaders = this.jwtSecurity();
    return this.http.get<Calendar[]>('http://localhost:8088/calendarlist/list', {headers: httpHeaders});
  }

  ajouterCalendar( calendar: Calendar): Observable<Calendar>{
    const httpHeaders = this.jwtSecurity();
    return this.http.post<Calendar>('http://localhost:8088/calendar/insert', calendar, {headers: httpHeaders});
  }
  deleteCalendar(id: string) {
    const httpHeaders = this.jwtSecurity();
    return this.http.delete('http://localhost:8088/calendar/delete/' + id, {headers: httpHeaders});
  }

  consulterCalendar(id: string): Observable<Calendar> {
    const httpHeaders = this.jwtSecurity();
    return this.http.get<Calendar>('http://localhost:8088/calendar/get/' + id, {headers: httpHeaders});
  }
  updateCalendar(calendar: Calendar): Observable<Calendar> {
    const httpHeaders = this.jwtSecurity();
    return this.http.put<Calendar>('http://localhost:8088/calendar/update', calendar, {headers: httpHeaders});
  }

  getAllCalendarById(id: string): Observable<Array<Calendar[]>>{
    const httpHeaders = this.jwtSecurity();
    return this.http.get<Array<Calendar[]>>('http://localhost:8088/calendar/return/' + id, {headers: httpHeaders});
  }

  loadAll(push: Push): Observable<object>{
    const httpHeaders = this.jwtSecurity();
    return this.http.post('http://localhost:8088/plan/load', push, {headers: httpHeaders});

  }

  loadPFEs(push: Push): Observable<object>{
    const httpHeaders = this.jwtSecurity();
    return this.http.post('http://localhost:8088/pfe/load', push, {headers: httpHeaders});

  }

  refreshAll(push: Push): Observable<object>{
    const httpHeaders = this.jwtSecurity();
    return this.http.post('http://localhost:8088/plan/refresh', push, {headers: httpHeaders});

  }

  refreshPFE(push: Push): Observable<object>{
    const httpHeaders = this.jwtSecurity();
    return this.http.post('http://localhost:8088/pfe/refresh', push, {headers: httpHeaders});
  }

  jwtSecurity(): HttpHeaders{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return httpHeaders;
  }

  public searchCalendars(keyword: string): Observable<Array<Calendar>>{
    const httpHeaders = this.jwtSecurity();
    return this.http.get<Array<Calendar>>('http://localhost:8088/calendar/search?keyword=' + keyword, {headers: httpHeaders});
  }

}
