import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./securities/login/login.component";
import {CalendarComponent} from "./calendars/calendar/calendar.component";
import {AddCalendarComponent} from "./calendars/add-calendar/add-calendar.component";
import {DetailsComponent} from "./details/details/details.component";
import {UpdateAclComponent} from "./details/update-acl/update-acl.component";
import {UpdateCalendarComponent} from "./calendars/update-calendar/update-calendar.component";
import {ForbiddenComponent} from "./securities/forbidden/forbidden.component";
import {PwdComponent} from "./users/pwd/pwd.component";
import {CalendarGuard} from "./calendars/guard/calendar.guard";
import {AddAclComponent} from "./details/add-acl/add-acl.component";
import {UpdateUserComponent} from "./users/update-user/update-user.component";
import {LoadComponent} from "./load/load/load.component";

const routes: Routes = [
  {path: 'calendars', component : CalendarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-calendar', component : AddCalendarComponent, canActivate: [CalendarGuard]},
  {path: 'details/:id', component : DetailsComponent},
  {path: 'update-calendar/:id', component: UpdateCalendarComponent},
  {path: 'update-acl/:id/:id2', component: UpdateAclComponent},
  {path: 'add-acl/:id', component : AddAclComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: 'update-user', component: UpdateUserComponent},
  {path: 'pwd', component: PwdComponent},
  {path: 'push', component: LoadComponent},
  { path: '', redirectTo: 'calendars', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
