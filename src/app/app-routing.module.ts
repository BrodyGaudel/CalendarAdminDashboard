import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./securities/login/login.component";
import {CalendarComponent} from "./calendars/calendar/calendar.component";
import {AddCalendarComponent} from "./calendars/add-calendar/add-calendar.component";

const routes: Routes = [
  {path: 'calendars', component : CalendarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-calendar', component : AddCalendarComponent},
  { path: '', redirectTo: 'calendars', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
