import { Injectable } from '@angular/core';
import {User} from "../../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {Usermodel} from "../../models/usermodel.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = 'http://localhost:8081/users';

  constructor(private authService: AuthService, private http: HttpClient) { }

  jwtSecurity(): HttpHeaders{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return httpHeaders;
  }

  listUser(): Observable<Usermodel[]>{
    const httpHeaders = this.jwtSecurity();
    return this.http.get<Usermodel[]>(this.apiURL+'/all', {headers: httpHeaders});
  }

  findUserByUsername(username: string): Observable<Usermodel[]>{
    const httpHeaders = this.jwtSecurity();
    return this.http.get<Usermodel[]>(this.apiURL+'/find/'+username, {headers: httpHeaders});
  }
  ajouterUser( user: Usermodel): Observable<User>{
    const httpHeaders = this.jwtSecurity();
    return this.http.post<User>(this.apiURL+'/add', user, {headers: httpHeaders});
  }
  deleteUser(id: number) {
    const httpHeaders = this.jwtSecurity();
    return this.http.delete(this.apiURL+'/delete/'+ id, {headers: httpHeaders});
  }

  consulterUser(id: string): Observable<User> {
    const httpHeaders = this.jwtSecurity();
    return this.http.get<User>(this.apiURL+'/get' + id, {headers: httpHeaders});
  }
  updateUser(user: User): Observable<User> {
    const httpHeaders = this.jwtSecurity();
    return this.http.put<User>(this.apiURL+'/update', user, {headers: httpHeaders});
  }

}
