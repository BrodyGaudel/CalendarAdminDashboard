import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "./services/auth/auth.service";
import {CalendarService} from "./services/calendar/calendar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CalendarAdminDashboard';

  constructor(public authService: AuthService,
              private router: Router, private calendarService: CalendarService) {}

  ngOnInit() {
    this.authService.loadToken();
    let loggedUser = localStorage.getItem('loggedUser');
    if (this.authService.getToken() == null || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
    else{
      this.authService.setLoggedUserFromLocalStorage(loggedUser || '{}');
    }

  }

  onLogout(): void{
    this.authService.logout();
  }
  onClickOnSearch(): void{

  }

  loadEvents() {

  }
}
