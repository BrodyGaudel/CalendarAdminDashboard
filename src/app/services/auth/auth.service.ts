import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {User} from "../../models/user.model";
import {Usermodel} from "../../models/usermodel.model";
import {Profile} from "../../models/profile.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUser!: string;
  public isloggedIn = false;
  public roles!: string[];
  apiURL = 'http://localhost:8081/users';
  token!: string;
  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) { }

  isAdmin(): boolean{
    if (!this.roles){
      return false;
    }
    else{
      return this.roles.indexOf('ADMIN') >= 0;
    }
  }

  setLoggedUserFromLocalStorage(login: string): void {
    this.loggedUser = login;
    this.isloggedIn = true;
  }

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user , {observe: 'response'});
  }

  saveToken(jwt: string): void{
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined){
      return;
    }
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  loadToken(){
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
  getToken(): string {
    return this.token;
  }
  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }
  logout(): void {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  send(user: Usermodel) {
    return this.http.post<Usermodel>(this.apiURL + '/send', user , {observe: 'response'});
  }

  updateProfile(profile: Profile) {
    return this.http.post<Usermodel>(this.apiURL + '/sendup', profile , {observe: 'response'});
  }
}
