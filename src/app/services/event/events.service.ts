import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Eventmodel} from "../../models/eventmodel.model";
import {EventFormAdd} from "../../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  jwtSecurity(): HttpHeaders{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return httpHeaders;
  }


  getEvents(idCalendar: string){

  }

  getEvent(idCalendar: string, idEvent: string){

  }

  addEvent(event: EventFormAdd ){

  }

  deleteEvent(idCalendar: string, idEvent: string){

  }


}
