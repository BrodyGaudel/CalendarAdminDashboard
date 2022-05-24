import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendars/calendar/calendar.component';
import { LoginComponent } from './securities/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateCalendarComponent } from './calendars/update-calendar/update-calendar.component';
import { AddCalendarComponent } from './calendars/add-calendar/add-calendar.component';
import { DetailsComponent } from './details/details/details.component';
import { AddAclComponent } from './details/add-acl/add-acl.component';
import { UpdateAclComponent } from './details/update-acl/update-acl.component';
import { PwdComponent } from './users/pwd/pwd.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { ForbiddenComponent } from './securities/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalendarComponent,
    LoginComponent,
    UpdateCalendarComponent,
    AddCalendarComponent,
    DetailsComponent,
    AddAclComponent,
    UpdateAclComponent,
    PwdComponent,
    UpdateUserComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
